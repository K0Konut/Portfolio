/* Copie le contenu publié de Dashility dans le dépôt (architecture technique §4) : content/<langue>/<type>.json,
   images dans public/medias/<id>/, CV dans public/cv/. Lancé à la main (`npm run contenu`, clé dans .env.local)
   et à chaque mise en ligne (deploiement.yml, clé dans un secret GitHub). */
import { existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { dirname } from 'node:path'
import { loadEnv } from 'vite'
import { LOCALES } from '../src/router/pages.ts'
import { localizeMedia, ORIGIN, TYPES } from './medias.ts'

async function download(url: string, path: string) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`${url} : HTTP ${res.status}`)
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, Buffer.from(await res.arrayBuffer()))
}

async function main() {
  const key = process.env.DASHILITY_KEY || loadEnv('development', process.cwd(), '').DASHILITY_KEY
  if (!key)
    throw new Error('DASHILITY_KEY manquant : la clé de lecture de Dashility, dans .env.local')

  const media = new Map<string, string>()
  for (const locale of LOCALES) {
    mkdirSync(`content/${locale}`, { recursive: true })
    for (const type of TYPES) {
      const res = await fetch(`${ORIGIN}/api/v1/content/${type}?locale=${locale}`, {
        headers: { Authorization: `Bearer ${key}` },
      })
      // 404 : page unique pas encore publiée, ou pas complète en anglais. check-content exige le français
      if (!res.ok && res.status !== 404) throw new Error(`${type} (${locale}) : HTTP ${res.status}`)
      const data = res.ok ? ((await res.json()) as { fields: { fichier?: { url: string } } }) : null
      // Le CV garde son adresse d'aujourd'hui, celle des liens du site (SITE.cv)
      if (type === 'cv' && data?.fields.fichier) {
        await download(data.fields.fichier.url, `public/cv/cv-${locale}.pdf`)
        data.fields.fichier.url = `/cv/cv-${locale}.pdf`
      }
      const { text, files } = localizeMedia(JSON.stringify(data, null, 2))
      for (const [path, url] of files) media.set(path, url)
      writeFileSync(`content/${locale}/${type}.json`, `${text}\n`)
    }
  }

  // Un nouveau fichier a toujours un nouvel id dans Dashility : un fichier déjà là n'a pas changé
  for (const [path, url] of media)
    if (!existsSync(`public${path}`)) await download(url, `public${path}`)
  const used = new Set([...media.keys()].map((path) => path.split('/')[2]))
  for (const id of existsSync('public/medias') ? readdirSync('public/medias') : [])
    if (!used.has(id)) rmSync(`public/medias/${id}`, { recursive: true })

  console.log(`Contenu copié : ${TYPES.length} types, ${media.size} médias.`)
}

if (import.meta.main) await main()

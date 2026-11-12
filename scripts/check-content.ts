/* Refuse une mise en ligne au contenu incomplet (architecture technique §4) : chaque type de Dashility
   copié et non vide en français, la sélection de l'accueil, les deux CV, le domaine du site. Lancé à la release (image Docker).
   L'anglais peut manquer : ce qui n'est pas traduit n'apparaît pas sur le site anglais. */
import { existsSync, readFileSync } from 'node:fs'
import { loadEnv } from 'vite'
import { LOCALES } from '../src/router/pages.ts'
import { TYPES } from './medias.ts'

// Tel quel dans toutes les langues : traduit dans un texte anglais, il ne bloquerait plus la mise en ligne
const MARKER = 'à compléter'
const problems: string[] = []

for (const type of TYPES) {
  const file = `content/fr/${type}.json`
  const text = existsSync(file) ? readFileSync(file, 'utf8') : 'null'
  const data = JSON.parse(text) as unknown
  if (data === null || (Array.isArray(data) && !data.length))
    problems.push(
      `${file} vide ou manquant : publier « ${type} » dans Dashility, puis npm run contenu`,
    )
  for (const locale of LOCALES) {
    const copy = `content/${locale}/${type}.json`
    if (existsSync(copy) && readFileSync(copy, 'utf8').includes(MARKER))
      problems.push(`${copy} : « ${MARKER} » dans le texte`)
  }
}
// Le CV est l'action principale de l'accueil (PRD, parcours P1) : un lien mort ne part pas en ligne
for (const locale of LOCALES)
  if (!existsSync(`public/cv/cv-${locale}.pdf`))
    problems.push(`public/cv/cv-${locale}.pdf manquant : le CV à télécharger`)
// Sans elle, l'accueil n'aurait aucun projet (le build l'accepte, pour un dépôt neuf)
for (const locale of LOCALES)
  if (!existsSync(`content/${locale}/mis-en-avant.json`))
    problems.push(`content/${locale}/mis-en-avant.json manquant : npm run contenu`)
// Lu comme le build le lit (.env, .env.production, .env.production.local…)
if (!loadEnv('production', process.cwd()).VITE_SITE_URL)
  problems.push('VITE_SITE_URL manquant : le domaine du site')

if (problems.length) {
  console.error(`Contenu incomplet, mise en ligne refusée :\n${problems.join('\n')}`)
  process.exit(1)
}
console.log('Contenu complet.')

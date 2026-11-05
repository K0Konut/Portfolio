/* Ajoute à la CSP de docker/nginx.conf l'empreinte SHA-256 de chaque <script> en ligne du site pré-rendu
   (architecture technique §7) : pas de 'unsafe-inline' pour les scripts. Lancé après le build, dans l'image Docker. */
import { createHash } from 'node:crypto'
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const CONF = 'docker/nginx.conf'
const PLACEHOLDER = '__SCRIPT_HASHES__'

const hashes = new Set<string>()
for (const file of readdirSync('dist', { recursive: true, encoding: 'utf8' })) {
  if (!file.endsWith('.html')) continue
  for (const [, body] of readFileSync(join('dist', file), 'utf8').matchAll(
    // Tout script sans src, quels que soient ses attributs : un oubli serait bloqué en production seulement
    /<script(?![^>]*\ssrc=)[^>]*>([\s\S]*?)<\/script>/g,
  ))
    hashes.add(`'sha256-${createHash('sha256').update(body!).digest('base64')}'`)
}

const conf = readFileSync(CONF, 'utf8')
if (!conf.includes(PLACEHOLDER)) throw new Error(`${CONF} : ${PLACEHOLDER} introuvable`)
writeFileSync(CONF, conf.replace(PLACEHOLDER, [...hashes].join(' ')))
console.log(`CSP : ${hashes.size} script(s) en ligne autorisé(s) par empreinte.`)

/* Refuse la mise en ligne tant qu'il reste du contenu provisoire (architecture technique §4).
   Lancé à la release (image Docker), pas sur chaque PR : le contenu est provisoire pendant le développement. */
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { loadEnv } from 'vite'

// Tel quel dans toutes les langues : traduit dans un texte anglais, il ne bloquerait plus la mise en ligne
const MARKER = 'à compléter'
const files = [
  'src/content/site.ts',
  ...readdirSync('content', { recursive: true, encoding: 'utf8' })
    .filter((f) => /\.(md|ts)$/.test(f))
    .map((f) => join('content', f)),
]

const problems = files.flatMap((file) =>
  readFileSync(file, 'utf8')
    .split('\n')
    .flatMap((line, i) => (line.includes(MARKER) ? [`${file}:${i + 1}  ${line.trim()}`] : [])),
)
// Chaque contenu français a sa traduction (même chemin sous content/en/)
for (const file of files.filter((f) => f.startsWith(join('content', 'fr')))) {
  const en = file.replace(join('content', 'fr'), join('content', 'en'))
  if (!existsSync(en)) problems.push(`${en} manquant : traduction de ${file}`)
}
// Lu comme le build le lit (.env, .env.production, .env.production.local…)
if (!loadEnv('production', process.cwd()).VITE_SITE_URL)
  problems.push('VITE_SITE_URL manquant : le domaine du site')

if (problems.length) {
  console.error(`Contenu provisoire, mise en ligne refusée :\n${problems.join('\n')}`)
  process.exit(1)
}
console.log('Contenu complet.')

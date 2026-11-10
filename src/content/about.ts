import { LOCALES, type Locale } from '../router/pages'
import { isObject, isText, MONTH, type Json } from './check'
import type { Period, SkillCategory, TimelineStep } from './types'

/* Parcours et compétences : la copie du contenu de Dashility, content/<langue>/parcours.json et
   competences.json (architecture technique §4). La forme est vérifiée au chargement : un champ manquant ou
   renommé fait échouer le build. */
const files = import.meta.glob<unknown>('/content/*/{parcours,competences}.json', {
  eager: true,
  import: 'default',
})

/** Technos utilisées par ce site, mises en avant (DotList) : elles décrivent son code, pas son contenu */
const SITE_STACK = new Set(
  [
    'Vue.js',
    'TypeScript',
    'JavaScript',
    'HTML',
    'CSS',
    'Vite',
    'Git',
    'GitHub',
    'npm',
    'Docker',
    'Linux',
    'Proxmox',
    'Nginx Proxy Manager',
  ].map((name) => name.toLowerCase()),
)

/** Vérifie les étapes du parcours (type `parcours`) ; du plus ancien au plus récent */
export function parseTimeline(data: unknown, where: string): TimelineStep[] {
  if (!Array.isArray(data)) throw new Error(`${where} : une liste d'étapes est attendue`)
  return data
    .map((entry): TimelineStep => {
      const e = isObject(entry) ? entry : {}
      const f: Json = isObject(e.fields) ? e.fields : {}
      const fail = (field: string): never => {
        throw new Error(
          `${where}, étape « ${String(e.slug)} » : champ « ${field} » manquant ou invalide`,
        )
      }
      const text = (key: string) => (isText(f[key]) ? f[key].trim() : fail(key))
      const kind = f.etiquette
      const p = f.periode
      if (!isObject(kind) || !isText(kind.label)) fail('etiquette')
      if (!isObject(p) || !isText(p.start) || !MONTH.test(p.start)) fail('periode')
      const period = p as unknown as Period
      if (period.end != null && !MONTH.test(period.end)) fail('periode')
      const caseStudy = f.etude_de_cas
      return {
        kind: (kind as Json & { label: string }).label,
        period: {
          start: period.start,
          end: period.end ?? undefined,
          ongoing: period.ongoing === true,
        },
        title: text('titre'),
        place: text('lieu'),
        text: text('texte'),
        caseStudy: isText(caseStudy) ? caseStudy.trim() : undefined,
      }
    })
    .sort((a, b) => a.period.start.localeCompare(b.period.start))
}

/** Vérifie les catégories de compétences (type `competences`, page unique) */
export function parseSkills(data: unknown, where: string): SkillCategory[] {
  const f = isObject(data) && isObject(data.fields) ? data.fields : {}
  const fail = (field: string): never => {
    throw new Error(`${where} : champ « ${field} » manquant ou invalide`)
  }
  const categories = Array.isArray(f.categories) ? f.categories : fail('categories')
  return categories.map((item) => {
    const c = isObject(item) ? item : {}
    const list = c.competences
    if (!isText(c.titre)) fail('categories.titre')
    if (!Array.isArray(list) || !list.length || !list.every(isText)) fail('categories.competences')
    return {
      title: (c.titre as string).trim(),
      skills: (list as string[]).map((name) => ({
        name: name.trim(),
        site: SITE_STACK.has(name.trim().toLowerCase()) || undefined,
      })),
    }
  })
}

const load = <T>(
  locale: Locale,
  type: string,
  parse: (data: unknown, where: string) => T,
  empty: T,
) => {
  const file = `/content/${locale}/${type}.json`
  // Pas encore publié (null), ou pas complet en anglais : rien ; check-content exige le français
  return files[file] == null ? empty : parse(files[file], file)
}
const TIMELINES = Object.fromEntries(
  LOCALES.map((l) => [l, load(l, 'parcours', parseTimeline, [])]),
) as Record<Locale, TimelineStep[]>
const SKILLS = Object.fromEntries(
  LOCALES.map((l) => [l, load(l, 'competences', parseSkills, [])]),
) as Record<Locale, SkillCategory[]>

/** Le parcours, du plus ancien au plus récent */
export const timeline = (locale: Locale): TimelineStep[] => TIMELINES[locale]

/** Les catégories de compétences */
export const skills = (locale: Locale): SkillCategory[] => SKILLS[locale]

import { LOCALES, type Locale } from '../router/pages'
import type { CaseItem, Device, Period, Project, Stat } from './types'

/* Chargeur des études de cas : la copie du contenu de Dashility, content/<langue>/projets.json
   (architecture technique §4). La forme de chaque entrée est vérifiée au chargement : un champ manquant ou
   renommé dans Structure fait échouer le build, avec le projet et le champ en cause. */
const files = import.meta.glob<unknown>('/content/*/projets.json', {
  eager: true,
  import: 'default',
})

type Json = Record<string, unknown>
const isText = (v: unknown): v is string => typeof v === 'string' && v.trim() !== ''
const isObject = (v: unknown): v is Json => typeof v === 'object' && v !== null && !Array.isArray(v)
const MONTH = /^\d{4}-(0[1-9]|1[0-2])$/
const DEVICES: Record<string, Device> = { navigateur: 'browser', telephone: 'phone' }

/** Vérifie une entrée de Dashility (type `projets`) et la met en forme ; `where` nomme le fichier */
export function parseProject(entry: unknown, where: string): Project {
  const e = isObject(entry) ? entry : {}
  const f = isObject(e.fields) ? e.fields : {}
  const slug = isText(e.slug) ? e.slug : '?'
  const fail = (field: string): never => {
    throw new Error(`${where}, projet « ${slug} » : champ « ${field} » manquant ou invalide`)
  }
  const text = (key: string, v: unknown = f[key]) => (isText(v) ? v : fail(key))
  const optional = (key: string, v: unknown = f[key]) =>
    v === null || v === undefined ? undefined : text(key, v)
  const rich = (key: string, v: unknown = f[key]) =>
    isObject(v) && typeof v.html === 'string' ? v.html : fail(key)
  const list = (key: string) => (Array.isArray(f[key]) ? (f[key] as unknown[]) : fail(key))
  const choice = (key: string) => {
    const v = f[key]
    return isObject(v) && isText(v.key) && isText(v.label)
      ? { key: v.key, label: v.label }
      : fail(key)
  }
  const items = (key: string): CaseItem[] =>
    list(key).map((item) => {
      const i = isObject(item) ? item : {}
      return {
        title: text(`${key}.titre`, i.titre),
        html: rich(`${key}.description`, i.description),
        tradeOff: key === 'choix' ? optional('choix.compromis', i.compromis) : undefined,
      }
    })
  const number = (key: string, v: unknown) =>
    v === null || v === undefined ? undefined : typeof v === 'number' ? v : fail(key)

  if (slug === '?') fail('slug')
  const p = f.periode
  if (!isObject(p) || !isText(p.start) || !MONTH.test(p.start)) fail('periode')
  const period = p as unknown as Period
  if (period.end != null && !MONTH.test(period.end)) fail('periode')
  const capture = f.capture
  if (!isObject(capture) || !isText(capture.src) || !isObject(capture.srcset)) fail('capture')
  const c = capture as Json & { srcset: Json }
  const device = DEVICES[choice('cadre').key] ?? fail('cadre')
  const stack = list('stack')
  if (!stack.length || !stack.every(isText)) fail('stack')
  const featured =
    typeof f.a_la_une === 'boolean' ? f.a_la_une : f.a_la_une == null ? false : fail('a_la_une')

  return {
    slug,
    title: text('titre'),
    description: text('accroche'),
    tags: [choice('type').label],
    stack: stack as string[],
    capture: {
      device,
      src: c.src as string,
      srcset: typeof c.srcset.webp === 'string' ? c.srcset.webp : undefined,
      alt: text('capture.alt', c.alt),
    },
    period: { start: period.start, end: period.end ?? undefined, ongoing: period.ongoing === true },
    featured,
    meta: {
      type: choice('type').label,
      role: text('role'),
      team: text('equipe'),
      privateCode: optional('code_prive'),
    },
    links: { code: optional('code'), demo: optional('demo') },
    body: {
      contexte: rich('contexte'),
      besoin: rich('besoin'),
      contraintes: items('contraintes'),
      methodeIntro: optional('methode_intro'),
      methode: items('methode'),
      choix: items('choix'),
      resultats: list('resultats').map((item): Stat => {
        const i = isObject(item) ? item : {}
        return {
          value: text('resultats.valeur', i.valeur),
          label: text('resultats.libelle', i.libelle),
          before: number('resultats.avant', i.avant),
          after: number('resultats.apres', i.apres),
        }
      }),
      conclusion: f.conclusion == null ? undefined : rich('conclusion'),
      enseignements: items('enseignements'),
    },
  }
}

/** Clé de tri : la fin de la période, « en cours » d'abord, puis le début */
const recency = ({ period }: Project) =>
  `${period.ongoing ? '9999-99' : (period.end ?? period.start)} ${period.start}`

/** Les projets d'un fichier copié, du plus récent au plus ancien */
export function parseProjects(data: unknown, where: string): Project[] {
  if (!Array.isArray(data)) throw new Error(`${where} : une liste de projets est attendue`)
  return data
    .map((entry) => parseProject(entry, where))
    .sort((a, b) => recency(b).localeCompare(recency(a)))
}

const PROJECTS = Object.fromEntries(
  LOCALES.map((l) => {
    const file = `/content/${l}/projets.json`
    // Pas de copie dans une langue (dépôt neuf) : aucun projet ; check-content exige le français à la mise en ligne
    return [l, file in files ? parseProjects(files[file], file) : []]
  }),
) as Record<Locale, Project[]>

/** Les projets d'une langue, du plus récent au plus ancien ; un projet sans version anglaise n'est qu'en français */
export const projects = (locale: Locale): Project[] => PROJECTS[locale]

/** Les trois projets mis en avant sur l'accueil */
export const featuredProjects = (locale: Locale): Project[] =>
  projects(locale)
    .filter((p) => p.featured)
    .slice(0, 3)

/** La période dans la langue de la page : « oct. 2026 – en cours », « sept. 2020 – juil. 2022 » */
export function formatPeriod(period: Period, locale: Locale, ongoing: string): string {
  const month = new Intl.DateTimeFormat(locale, {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  })
  const date = (m: string) => month.format(new Date(`${m}-01T00:00:00Z`))
  const end = period.ongoing
    ? ongoing
    : period.end && period.end !== period.start
      ? date(period.end)
      : ''
  return end ? `${date(period.start)} – ${end}` : date(period.start)
}

/** Les sections d'une étude de cas, dans l'ordre du gabarit ; une section vide n'est ni affichée ni au sommaire */
export const CASE_SECTIONS = [
  'contexte',
  'besoin',
  'contraintes',
  'methode',
  'choix',
  'resultats',
  'enseignements',
] as const
export type CaseSection = (typeof CASE_SECTIONS)[number]

export const caseSections = ({ body }: Project): CaseSection[] =>
  CASE_SECTIONS.filter((key) =>
    key === 'resultats' ? body.resultats.length > 0 || !!body.conclusion : body[key].length > 0,
  )

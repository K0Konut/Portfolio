/* Table des pages, sans dépendance : le routeur (routes.ts), le SEO et la config de build (pré-rendu, sitemap)
   la lisent tous. */

export const LOCALES = ['fr', 'en'] as const
export type Locale = (typeof LOCALES)[number]
export const DEFAULT_LOCALE: Locale = 'fr'

interface PageDef {
  name: string
  paths: Record<Locale, string>
  noindex?: boolean
  /** Rubrique de la navigation à laquelle la page appartient, si ce n'est pas elle-même */
  section?: string
}

/* La table des pages : chaque page une fois, avec son chemin dans chaque langue (architecture technique §3).
   Le routeur, le sélecteur de langue, les balises hreflang et le sitemap en dérivent tous. */
export const PAGES = [
  { name: 'accueil', paths: { fr: '/fr', en: '/en' } },
  { name: 'projets', paths: { fr: '/fr/projets', en: '/en/projects' } },
  {
    name: 'etude-de-cas',
    paths: { fr: '/fr/projets/:slug', en: '/en/projects/:slug' },
    section: 'projets',
  },
  { name: 'a-propos', paths: { fr: '/fr/a-propos', en: '/en/about' } },
  { name: 'contact', paths: { fr: '/fr/contact', en: '/en/contact' } },
  {
    name: 'mentions-legales',
    paths: { fr: '/fr/mentions-legales', en: '/en/legal-notice' },
    noindex: true,
  },
  {
    name: 'confidentialite',
    paths: { fr: '/fr/confidentialite', en: '/en/privacy' },
    noindex: true,
  },
  { name: '404', paths: { fr: '/fr/404', en: '/en/404' }, noindex: true },
] as const satisfies readonly PageDef[]

export type PageName = (typeof PAGES)[number]['name']

/** Paramètres des pages à paramètres (`:slug`), un jeu par déclinaison */
export type PageParams = Partial<Record<PageName, readonly Record<string, string>[]>>

export function routeName(page: PageName, locale: Locale): string {
  return `${page}-${locale}`
}

/** Chemin avec ses paramètres remplacés (`:slug`) ; erreur si l'un manque. */
function fillParams(path: string, params: Record<string, string>, page: string): string {
  return path.replace(/:(\w+)/g, (_, key: string) => {
    const value = params[key]
    if (value === undefined) throw new Error(`Paramètre manquant « ${key} » pour ${page}`)
    return encodeURIComponent(value)
  })
}

/** Langue d'une adresse : celle de la route, sinon le préfixe du chemin (page introuvable), sinon le français. */
export function localeFromPath(path: string): Locale {
  return LOCALES.find((l) => path === `/${l}` || path.startsWith(`/${l}/`)) ?? DEFAULT_LOCALE
}

/** Chaque déclinaison d'une page : son chemin dans chaque langue. Une page à paramètres (`:slug`)
    est déclinée pour chaque jeu de paramètres fourni, et n'existe pas sans. */
export function pageInstances(
  page: (typeof PAGES)[number],
  params: PageParams,
): Record<Locale, string>[] {
  const sets = page.paths[DEFAULT_LOCALE].includes(':') ? (params[page.name] ?? []) : [{}]
  return sets.map(
    (set) =>
      Object.fromEntries(
        LOCALES.map((l) => [l, fillParams(page.paths[l], set, page.name)]),
      ) as Record<Locale, string>,
  )
}

/** Chemins à pré-rendre : chaque page dans chaque langue (voir `pageInstances`). Jamais « / » ni /design-system. */
export function prerenderPaths(params: PageParams): string[] {
  return PAGES.flatMap((page) =>
    pageInstances(page, params).flatMap((paths) => Object.values(paths)),
  )
}

import type { RouteRecordRaw } from 'vue-router'

export const LOCALES = ['fr', 'en'] as const
export type Locale = (typeof LOCALES)[number]
export const DEFAULT_LOCALE: Locale = 'fr'

interface PageDef {
  name: string
  paths: Record<Locale, string>
  noindex?: boolean
}

/* La table des pages : chaque page une fois, avec son chemin dans chaque langue (architecture technique §3).
   Le routeur, le sélecteur de langue, les balises hreflang et le sitemap en dérivent tous. */
export const PAGES = [
  { name: 'accueil', paths: { fr: '/fr', en: '/en' } },
  { name: 'projets', paths: { fr: '/fr/projets', en: '/en/projects' } },
  { name: 'etude-de-cas', paths: { fr: '/fr/projets/:slug', en: '/en/projects/:slug' } },
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

declare module 'vue-router' {
  interface RouteMeta {
    page?: PageName
    locale?: Locale
    noindex?: boolean
    /** La page existe dans les autres langues (canonical et hreflang) ; faux pour une adresse inconnue. */
    alternates?: boolean
  }
}

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

const placeholder = () => import('../pages/PlaceholderPage.vue')

export function buildRoutes(dev: boolean): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = PAGES.flatMap((page) =>
    LOCALES.map((locale) => ({
      path: page.paths[locale],
      name: routeName(page.name, locale),
      component: placeholder,
      meta: { page: page.name, locale, noindex: 'noindex' in page, alternates: true },
    })),
  )
  // En production, Nginx redirige « / » selon la langue du navigateur ; ici, le développement et le repli
  routes.push({ path: '/', redirect: `/${DEFAULT_LOCALE}` })
  if (dev) {
    // Vitrine des composants : en développement seulement, jamais pré-rendue ni publiée (architecture technique §5)
    routes.push({ path: '/design-system', name: 'design-system', component: placeholder })
  }
  routes.push({
    path: '/:pathMatch(.*)*',
    name: 'introuvable',
    component: placeholder,
    meta: { page: '404', noindex: true },
  })
  return routes
}

/** Chemins à pré-rendre : chaque page dans chaque langue ; une page à paramètres (`:slug`)
    est déclinée pour chaque jeu de paramètres fourni. Jamais « / » ni /design-system. */
export function prerenderPaths(
  params: Partial<Record<PageName, readonly Record<string, string>[]>>,
): string[] {
  return PAGES.flatMap((page) =>
    LOCALES.flatMap((locale) => {
      const path: string = page.paths[locale]
      if (!path.includes(':')) return [path]
      return (params[page.name] ?? []).map((p) => fillParams(path, p, page.name))
    }),
  )
}

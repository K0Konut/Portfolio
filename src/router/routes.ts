import type { RouteRecordRaw } from 'vue-router'

export const LOCALES = ['fr', 'en'] as const
export type Locale = (typeof LOCALES)[number]
export const DEFAULT_LOCALE: Locale = 'fr'

export type PageName =
  | 'accueil'
  | 'projets'
  | 'etude-de-cas'
  | 'a-propos'
  | 'contact'
  | 'mentions-legales'
  | 'confidentialite'
  | '404'

interface PageDef {
  name: PageName
  paths: Record<Locale, string>
  noindex?: boolean
}

/* La table des pages : chaque page une fois, avec son chemin dans chaque langue (architecture technique §3).
   Le routeur, le sélecteur de langue, les balises hreflang et le sitemap en dérivent tous. */
export const PAGES: readonly PageDef[] = [
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
]

declare module 'vue-router' {
  interface RouteMeta {
    page?: PageName
    locale?: Locale
    noindex?: boolean
  }
}

export function routeName(page: PageName, locale: Locale): string {
  return `${page}-${locale}`
}

/** Chemin d'une page dans une langue, paramètres remplacés (`:slug`). */
export function localizedPath(
  page: PageName,
  locale: Locale,
  params: Record<string, string> = {},
): string {
  const def = PAGES.find((p) => p.name === page)
  if (!def) throw new Error(`Page inconnue : ${page}`)
  return def.paths[locale].replace(/:(\w+)/g, (_, key: string) => {
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
      meta: { page: page.name, locale, noindex: page.noindex ?? false },
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

/** Chemins à pré-rendre : toutes les pages des deux langues, une page par projet. */
export function prerenderPaths(projectSlugs: readonly string[]): string[] {
  return PAGES.flatMap((page) =>
    LOCALES.flatMap((locale) =>
      page.name === 'etude-de-cas'
        ? projectSlugs.map((slug) => localizedPath(page.name, locale, { slug }))
        : [page.paths[locale]],
    ),
  )
}

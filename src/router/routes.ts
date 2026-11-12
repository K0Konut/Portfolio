import type { Component } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { DEFAULT_LOCALE, LOCALES, PAGES, routeName, type Locale, type PageName } from './pages'

export * from './pages'

declare module 'vue-router' {
  interface RouteMeta {
    page?: PageName
    /** Rubrique de la navigation à souligner (l'étude de cas appartient à « Projets ») */
    section?: PageName
    locale?: Locale
    noindex?: boolean
    /** Sans en-tête ni pied de page (démo isolée du catalogue de développement) */
    bare?: boolean
    /** La page existe dans les autres langues (canonical et hreflang) ; faux pour une adresse inconnue. */
    alternates?: boolean
  }
}

const views: Record<PageName, () => Promise<Component>> = {
  accueil: () => import('../pages/AccueilPage.vue'),
  projets: () => import('../pages/ProjetsPage.vue'),
  'etude-de-cas': () => import('../pages/EtudeDeCasPage.vue'),
  'a-propos': () => import('../pages/AProposPage.vue'),
  contact: () => import('../pages/ContactPage.vue'),
  'mentions-legales': () => import('../pages/LegalPage.vue'),
  confidentialite: () => import('../pages/LegalPage.vue'),
  '404': () => import('../pages/IntrouvablePage.vue'),
  apercu: () => import('../pages/ApercuPage.vue'),
}

export function buildRoutes(): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = PAGES.flatMap((page) =>
    LOCALES.map((locale) => ({
      path: page.paths[locale],
      name: routeName(page.name, locale),
      component: views[page.name],
      meta: {
        page: page.name,
        section: 'section' in page ? page.section : page.name,
        locale,
        noindex: 'noindex' in page,
        alternates: true,
      },
    })),
  )
  // En production, Nginx redirige « / » selon la langue du navigateur ; ici, le développement et le repli
  routes.push({ path: '/', redirect: `/${DEFAULT_LOCALE}` })
  routes.push({
    path: '/:pathMatch(.*)*',
    name: 'introuvable',
    component: views['404'],
    meta: { page: '404', noindex: true },
  })
  return routes
}

import { ViteSSG } from 'vite-ssg'
import './styles/tokens.css'
import './styles/base.css'
import App from './App.vue'
import { vReveal } from './directives/reveal'
import { createAppI18n } from './i18n'
import { buildRoutes, localeFromPath } from './router/routes'

const routes = buildRoutes()
// Vitrine des composants : en développement seulement. La condition est remplacée par « false » au build,
// et Vite retire alors la page et son code du site publié (architecture technique §5).
if (import.meta.env.DEV) {
  routes.push(
    {
      path: '/design-system/:entry?',
      name: 'design-system',
      component: () => import('./pages/DesignSystemPage.vue'),
    },
    {
      path: '/design-system/:entry/demo',
      name: 'design-system-demo',
      component: () => import('./pages/design-system/DsDemo.vue'),
      meta: { bare: true },
    },
  )
}

export const createApp = ViteSSG(
  App,
  {
    routes,
    scrollBehavior: (to, _from, saved) => saved ?? (to.hash ? { el: to.hash } : { top: 0 }),
  },
  ({ app, router }) => {
    const i18n = createAppI18n()
    app.use(i18n)
    app.directive('reveal', vReveal)
    router.beforeEach((to) => {
      i18n.global.locale.value = to.meta.locale ?? localeFromPath(to.path)
    })
  },
)

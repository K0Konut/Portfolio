import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import { PROJECT_SLUGS } from './content/projects'
import { createAppI18n } from './i18n'
import { buildRoutes, localeFromPath, prerenderPaths } from './router/routes'

export const createApp = ViteSSG(
  App,
  {
    routes: buildRoutes(import.meta.env.DEV),
    scrollBehavior: (to, _from, saved) => saved ?? (to.hash ? { el: to.hash } : { top: 0 }),
  },
  ({ app, router }) => {
    const i18n = createAppI18n()
    app.use(i18n)
    router.beforeEach((to) => {
      i18n.global.locale.value = to.meta.locale ?? localeFromPath(to.path)
    })
  },
)

/** Pages pré-rendues : les deux langues de chaque page, une page par projet ; jamais « / » ni /design-system. */
export function includedRoutes() {
  return prerenderPaths(PROJECT_SLUGS)
}

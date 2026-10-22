import { createHead, renderSSRHead } from '@unhead/vue/server'
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { describe, expect, it } from 'vitest'
import { createMemoryHistory, createRouter } from 'vue-router'
import HomeHero from '../../src/components/home/HomeHero.vue'
import { createAppI18n } from '../../src/i18n'
import { buildRoutes } from '../../src/router/routes'

describe('HomeHero', () => {
  it('pré-rend la page avec l’entrée en attente, et le nom lisible en clair', async () => {
    const app = createSSRApp(HomeHero)
    const head = createHead()
    const router = createRouter({ history: createMemoryHistory(), routes: buildRoutes() })
    app.use(head).use(createAppI18n()).use(router)
    await router.push('/fr')
    const html = await renderToString(app)
    const { htmlAttrs } = await renderSSRHead(head)
    expect(htmlAttrs).toContain('data-intro="pending"')
    expect(html).toContain('Costa Maskulov')
    expect(html).toContain('data-intro-hide')
  })
})

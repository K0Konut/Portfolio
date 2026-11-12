// @vitest-environment happy-dom
import { createHead } from '@unhead/vue/client'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { createMemoryHistory, createRouter } from 'vue-router'
import projets from '../../content/fr/projets.json'
import { vReveal } from '../../src/directives/reveal'
import { createAppI18n } from '../../src/i18n'
import AccueilPage from '../../src/pages/AccueilPage.vue'
import { parseProject } from '../../src/content/projects'
import { buildRoutes } from '../../src/router/routes'

// Trois projets choisis par Dashility, dans un ordre qui n'est pas celui des dates
const three = ['trois', 'un', 'deux'].map((slug) =>
  parseProject({ ...projets[0], slug, fields: { ...projets[0]!.fields, titre: slug } }, 'test'),
)
vi.mock('../../src/content/projects', async (original) => ({
  ...(await original<typeof import('../../src/content/projects')>()),
  featuredProjects: () => three,
}))

describe('accueil', () => {
  it('affiche les trois projets mis en avant, dans l’ordre de Dashility', async () => {
    const router = createRouter({ history: createMemoryHistory(), routes: buildRoutes() })
    await router.push('/fr')
    const w = mount(AccueilPage, {
      global: {
        plugins: [router, createAppI18n(), createHead()],
        directives: { reveal: vReveal },
        // L'entrée animée (GSAP, canvas) n'a rien à voir ici
        stubs: { AccueilHero: true },
      },
    })
    const links = w.findAll('a[href^="/fr/projets/"]')
    expect([...new Set(links.map((a) => a.attributes('href')))]).toEqual([
      '/fr/projets/trois',
      '/fr/projets/un',
      '/fr/projets/deux',
    ])
  })
})

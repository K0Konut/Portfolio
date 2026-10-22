// @vitest-environment happy-dom
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { createMemoryHistory, createRouter } from 'vue-router'
import LangSwitch from '../../src/components/layout/LangSwitch.vue'
import MobileMenu from '../../src/components/layout/MobileMenu.vue'
import { isCurrentSection } from '../../src/components/layout/navigation'
import { wavePath } from '../../src/components/sections/wave'
import { createAppI18n } from '../../src/i18n'
import { buildRoutes } from '../../src/router/routes'

async function setup(path: string) {
  const router = createRouter({ history: createMemoryHistory(), routes: buildRoutes() })
  await router.push(path)
  const i18n = createAppI18n()
  i18n.global.locale.value = path.startsWith('/en') ? 'en' : 'fr'
  return { plugins: [router, i18n] }
}

describe('SectionWave', () => {
  it('dessine la même vague pour la même graine, une autre pour une autre graine', () => {
    expect(wavePath(3, 1440)).toEqual(wavePath(3, 1440))
    expect(wavePath(3, 1440).d).not.toBe(wavePath(4, 1440).d)
  })

  it('réduit la vague sur les écrans étroits', () => {
    expect(wavePath(3, 390).height).toBeLessThan(wavePath(3, 1440).height)
  })
})

describe('LangSwitch', () => {
  it("mène à la page équivalente dans l'autre langue", async () => {
    const w = mount(LangSwitch, {
      props: { variant: 'header' },
      global: await setup('/fr/projets/ce-portfolio'),
    })
    const links = w.findAll('a')
    expect(links.map((a) => a.attributes('href'))).toEqual([
      '/fr/projets/ce-portfolio',
      '/en/projects/ce-portfolio',
    ])
    expect(links[0]?.attributes('aria-current')).toBe('true')
  })

  it("mène à l'accueil depuis une adresse inconnue", async () => {
    const w = mount(LangSwitch, {
      props: { variant: 'header' },
      global: await setup('/en/inconnue'),
    })
    expect(w.findAll('a').map((a) => a.attributes('href'))).toEqual(['/fr', '/en'])
  })
})

describe('navigation', () => {
  it('garde « Projets » actif sur une étude de cas', () => {
    expect(isCurrentSection('projets', 'etude-de-cas')).toBe(true)
    expect(isCurrentSection('contact', 'etude-de-cas')).toBe(false)
  })
})

describe('MobileMenu', () => {
  it('se ferme avec Échap', async () => {
    const w = mount(MobileMenu, { props: { modelValue: true }, global: await setup('/fr') })
    await w.find('[role="dialog"]').trigger('keydown', { key: 'Escape' })
    expect(w.emitted('update:modelValue')?.[0]).toEqual([false])
  })
})

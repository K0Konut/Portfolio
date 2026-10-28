// @vitest-environment happy-dom
import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { createMemoryHistory, createRouter } from 'vue-router'
import CareerTimeline from '../../src/components/about/CareerTimeline.vue'
import SkillCards from '../../src/components/about/SkillCards.vue'
import BusinessCard from '../../src/components/contact/BusinessCard.vue'
import BrickRepair from '../../src/components/errors/BrickRepair.vue'
import { vReveal } from '../../src/directives/reveal'
import { createAppI18n } from '../../src/i18n'
import { buildRoutes } from '../../src/router/routes'

async function setup() {
  const router = createRouter({ history: createMemoryHistory(), routes: buildRoutes() })
  await router.push('/fr/404')
  return { router, global: { plugins: [createAppI18n(), router], directives: { reveal: vReveal } } }
}

afterEach(() => vi.useRealTimers())

describe('CareerTimeline', () => {
  it('liste les étapes dans l’ordre, avec un lien seulement vers une étude de cas existante', async () => {
    const steps = [
      {
        kind: 'école',
        dates: '2021 – 2026',
        title: 'ESIEA',
        place: 'Paris',
        text: 'Cycle ingénieur.',
      },
      {
        kind: 'stage',
        dates: '2025',
        title: 'CNAM',
        place: 'Paris',
        text: 'Stage.',
        caseStudy: 'stage-cnam',
      },
    ]
    const w = mount(CareerTimeline, { props: { steps }, global: (await setup()).global })
    expect(w.findAll('ol > li b').map((b) => b.text())).toEqual(['ESIEA', 'CNAM'])
    expect(w.findAll('a').map((a) => a.attributes('href'))).toEqual(['/fr/projets/stage-cnam'])
  })
})

describe('SkillCards', () => {
  it('marque les technos de ce site et renvoie à l’étude de cas du portfolio', async () => {
    const categories = [
      { title: 'front', skills: [{ name: 'Vue.js', site: true }, { name: 'Nuxt' }] },
    ]
    const w = mount(SkillCards, { props: { categories }, global: (await setup()).global })
    expect(w.findAll('li.site').map((li) => li.text())).toEqual(['Vue.js'])
    expect(w.find('.legend a').attributes('href')).toBe('/fr/projets/ce-portfolio')
  })
})

describe('BusinessCard', () => {
  it('tient la page Contact : titre, adresse à copier et CV de la langue', async () => {
    const w = mount(BusinessCard, { global: (await setup()).global })
    expect(w.find('h1').text()).toBe('Contact')
    expect(w.find('button').exists()).toBe(true)
    expect(w.find('a[download]').attributes('href')).toBe('/cv/cv-fr.pdf')
  })
})

describe('BrickRepair', () => {
  it('au clavier, la brique se met en place, l’état l’annonce, puis la page mène à l’accueil', async () => {
    const { router, global } = await setup()
    vi.useFakeTimers()
    const w = mount(BrickRepair, { global })
    // Le trou (la cible) n'existe qu'après le premier rendu
    await flushPromises()
    await w.find('.brick').trigger('click')
    expect(w.find('.brick').classes()).toContain('placed')
    expect(w.find('[aria-live]').text()).toBe('Le mur est complet. Retour à l’accueil…')
    vi.advanceTimersByTime(900)
    await flushPromises()
    expect(router.currentRoute.value.path).toBe('/fr')
  })
})

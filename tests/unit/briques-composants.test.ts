// @vitest-environment happy-dom
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { createMemoryHistory, createRouter } from 'vue-router'
import ContactLinks from '../../src/components/site/ContactLinks.vue'
import BaseTimeline from '../../src/components/ui/BaseTimeline.vue'
import CycleSteps from '../../src/components/ui/CycleSteps.vue'
import DefinitionList from '../../src/components/ui/DefinitionList.vue'
import PosterCard from '../../src/components/ui/PosterCard.vue'
import { vReveal } from '../../src/directives/reveal'
import { createAppI18n } from '../../src/i18n'
import { buildRoutes } from '../../src/router/routes'

async function options(locale: 'fr' | 'en' = 'fr') {
  const router = createRouter({ history: createMemoryHistory(), routes: buildRoutes() })
  await router.push(`/${locale}`)
  // Dans l'application, le routeur règle la langue avant chaque page
  const i18n = createAppI18n()
  i18n.global.locale.value = locale
  return { plugins: [i18n, router], directives: { reveal: vReveal } }
}

describe('PosterCard', () => {
  it('pose son inclinaison seulement quand on la donne, et ne se soulève pas sans lift', () => {
    const tilted = mount(PosterCard, { props: { tilt: 1.5, as: 'article' } })
    expect(tilted.element.tagName).toBe('ARTICLE')
    expect(tilted.classes()).toEqual(expect.arrayContaining(['fond-nuit', 'poster', 'tilted']))
    expect(tilted.attributes('style')).toContain('--card-tilt: 1.5')
    const still = mount(PosterCard, { props: { fond: 'creme', lift: false } })
    expect(still.classes()).not.toContain('poster')
    expect(still.classes()).not.toContain('tilted')
    expect(still.attributes('style')).toBeUndefined()
  })
})

describe('DefinitionList', () => {
  it('donne une ligne par information, avec sa précision en dessous', () => {
    const items = [
      { label: 'Type', value: 'Stage' },
      { label: 'Code', value: 'Code privé', note: 'Le code appartient au CNAM.' },
    ]
    const w = mount(DefinitionList, { props: { items } })
    expect(w.findAll('dt').map((dt) => dt.text())).toEqual(['Type', 'Code'])
    expect(w.findAll('.note').map((n) => n.text())).toEqual(['Le code appartient au CNAM.'])
  })
})

describe('BaseTimeline', () => {
  it('liste les étapes dans l’ordre, chaque partie seulement si elle est donnée', async () => {
    const items = [
      { title: 'ESIEA', date: '2021 – 2026' },
      { title: 'CNAM', link: { to: '/fr/projets/stage-cnam', label: 'Voir' } },
    ]
    const w = mount(BaseTimeline, { props: { items, draw: false }, global: await options() })
    expect(w.findAll('ol > li b').map((b) => b.text())).toEqual(['ESIEA', 'CNAM'])
    expect(w.findAll('time')).toHaveLength(1)
    expect(w.findAll('a').map((a) => a.attributes('href'))).toEqual(['/fr/projets/stage-cnam'])
  })

  it('laisse le slot item remplacer le contenu d’une étape', async () => {
    const w = mount(BaseTimeline, {
      props: { items: [{ title: 'A' }], draw: false },
      slots: { item: '<template #item="{ item, index }">{{ index }}:{{ item.title }}</template>' },
      global: await options(),
    })
    expect(w.find('li').text()).toBe('0:A')
  })
})

describe('CycleSteps', () => {
  it('répartit les étapes sur l’anneau, et donne à chaque anneau sa propre flèche', async () => {
    const steps = ['A', 'B', 'C', 'D'].map((title) => ({ title, text: '' }))
    const w = mount(CycleSteps, {
      props: { steps },
      slots: { center: 'Un nouveau tour.' },
      global: await options(),
    })
    expect(w.findAll('.line')).toHaveLength(4)
    expect(w.findAll('.back')).toHaveLength(1)
    const id = w.find('marker').attributes('id')
    expect(w.find('.line').attributes('marker-end')).toBe(`url(#${id})`)
    expect(w.find('.loop').text()).toBe('Un nouveau tour.')
  })
})

describe('ContactLinks', () => {
  it('donne l’adresse, puis le CV de la langue de la page', async () => {
    const w = mount(ContactLinks, {
      props: { addressLabel: 'My address' },
      global: await options('en'),
    })
    expect(w.find('.label').text()).toBe('My address')
    expect(w.find('a[download]').attributes('href')).toBe('/cv/cv-en.pdf')
  })
})

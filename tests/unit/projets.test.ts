// @vitest-environment happy-dom
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { createMemoryHistory, createRouter } from 'vue-router'
import CaseNav from '../../src/components/case/CaseNav.vue'
import MetaList from '../../src/components/case/MetaList.vue'
import StatBlock from '../../src/components/case/StatBlock.vue'
import { vReveal } from '../../src/directives/reveal'
import { createAppI18n } from '../../src/i18n'
import { buildRoutes } from '../../src/router/routes'

const META = {
  type: 'Stage',
  role: 'Développeur',
  duration: '6 mois',
  team: '3',
  stack: ['Vue', 'Java'],
}

async function options() {
  const router = createRouter({ history: createMemoryHistory(), routes: buildRoutes() })
  await router.push('/fr')
  return { plugins: [createAppI18n(), router], directives: { reveal: vReveal } }
}

describe('MetaList', () => {
  it('donne une ligne par information, la stack jointe par des points médians', async () => {
    const w = mount(MetaList, { props: { meta: META }, global: await options() })
    expect(w.findAll('dt').map((dt) => dt.text())).toEqual([
      'Type',
      'Rôle',
      'Durée',
      'Équipe',
      'Stack',
    ])
    expect(w.findAll('dd').at(-1)?.text()).toBe('Vue · Java')
  })

  it('mentionne un code privé avec sa raison, sans bouton', async () => {
    const meta = { ...META, privateCode: 'Le code appartient au CNAM.' }
    const w = mount(MetaList, { props: { meta }, global: await options() })
    expect(w.text()).toContain('Code privé')
    expect(w.text()).toContain('Le code appartient au CNAM.')
    expect(w.find('button').exists()).toBe(false)
  })
})

describe('StatBlock', () => {
  it('dessine des barres proportionnelles, décoratives, et garde les valeurs en texte', async () => {
    const stat = { value: '6', label: 'fonds', compare: { before: 1, after: 6 } }
    const w = mount(StatBlock, { props: { stat }, global: await options() })
    const bars = w.findAll('.bar i')
    expect(bars.map((bar) => Number(bar.attributes('style')?.match(/--w: ([\d.]+)/)?.[1]))).toEqual(
      [1 / 6, 1],
    )
    expect(bars.every((bar) => bar.attributes('aria-hidden') === 'true')).toBe(true)
    expect(w.find('.bars').attributes('aria-hidden')).toBeUndefined()
    expect(w.find('.bars').text()).toBe('avant1après6')
  })

  it('sans comparaison, n’affiche que le chiffre et son libellé', async () => {
    const w = mount(StatBlock, {
      props: { stat: { value: '7', label: 'étapes' } },
      global: await options(),
    })
    expect(w.find('.bars').exists()).toBe(false)
    expect(w.text()).toBe('7étapes')
  })
})

describe('CaseNav', () => {
  it('mène au projet suivant et à la liste, dans la langue de la page', async () => {
    const w = mount(CaseNav, {
      props: { next: { slug: 'stage-cnam', title: 'Stage au CNAM' } },
      global: await options(),
    })
    const hrefs = w.findAll('a').map((a) => a.attributes('href'))
    expect(hrefs).toEqual(['/fr/projets/stage-cnam', '/fr/projets'])
    expect(w.find('section').attributes('aria-label')).toBe('Suite')
  })
})

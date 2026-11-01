// @vitest-environment happy-dom
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { createMemoryHistory, createRouter } from 'vue-router'
import StatBlock from '../../src/components/ui/StatBlock.vue'
import { vReveal } from '../../src/directives/reveal'
import { createAppI18n } from '../../src/i18n'
import { buildRoutes } from '../../src/router/routes'

async function options() {
  const router = createRouter({ history: createMemoryHistory(), routes: buildRoutes() })
  await router.push('/fr')
  return { plugins: [createAppI18n(), router], directives: { reveal: vReveal } }
}

describe('StatBlock', () => {
  it('dessine des barres proportionnelles, décoratives, et garde les valeurs en texte', async () => {
    const props = { value: '6', label: 'fonds', before: 1, after: 6 }
    const w = mount(StatBlock, { props, global: await options() })
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
      props: { value: '7', label: 'étapes' },
      global: await options(),
    })
    expect(w.find('.bars').exists()).toBe(false)
    expect(w.text()).toBe('7étapes')
  })
})

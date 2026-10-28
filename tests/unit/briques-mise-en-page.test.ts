// @vitest-environment happy-dom
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { Comment, h } from 'vue'
import BentoGrid from '../../src/components/mise-en-page/BentoGrid.vue'
import PosterGrid from '../../src/components/mise-en-page/PosterGrid.vue'
import { vReveal } from '../../src/directives/reveal'

const global = { directives: { reveal: vReveal } }
// Des enfants comme une page les écrit : plusieurs éléments, et un v-if faux (commentaire)
const children = () => [...['A', 'B', 'C'].map((t) => h('article', { key: t }, t)), h(Comment)]

describe('PosterGrid', () => {
  it('range chaque enfant dans sa cellule et en fait une affiche', () => {
    const w = mount(PosterGrid, { props: { columns: 5 }, slots: { default: children }, global })
    expect(w.classes()).toContain('cols-5')
    const cells = w.findAll('ul > li')
    expect(cells.map((li) => li.text())).toEqual(['A', 'B', 'C'])
    expect(cells.every((li) => li.find('article.poster').exists())).toBe(true)
  })
})

describe('BentoGrid', () => {
  it('sans glow, n’allume aucune cellule au passage de la souris', async () => {
    const w = mount(BentoGrid, { slots: { default: children }, global })
    expect(w.findAll('li > article.tile')).toHaveLength(3)
    await w.find('ul').trigger('pointermove', { pointerType: 'mouse', clientX: 5, clientY: 5 })
    await new Promise((resolve) => requestAnimationFrame(resolve))
    expect(w.find('li').attributes('style')).toBeUndefined()
  })
})

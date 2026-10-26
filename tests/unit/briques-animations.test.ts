// @vitest-environment happy-dom
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import DragToSnap from '../../src/components/animations/DragToSnap.vue'
import ScrollHint from '../../src/components/animations/ScrollHint.vue'
import LetterReveal from '../../src/components/textes/LetterReveal.vue'

describe('LetterReveal', () => {
  it('garde le texte en clair et découpe les lettres à part, numérotées', () => {
    const w = mount(LetterReveal, { props: { text: 'Costa M', as: 'h1', start: 'manual' } })
    expect(w.element.tagName).toBe('H1')
    expect(w.find('.sr-only').text()).toBe('Costa M')
    const letters = w.findAll('.letter')
    expect(letters.map((l) => l.text()).join('')).toBe('CostaM')
    expect(letters.at(-1)?.attributes('style')).toContain('--i: 5')
  })

  it('en démarrage manuel, attend play()', async () => {
    const w = mount(LetterReveal, { props: { text: 'Costa', start: 'manual' } })
    expect(w.classes()).toContain('pending')
    ;(w.vm as unknown as { play: () => void }).play()
    // play() attend deux images
    await new Promise((resolve) => setTimeout(resolve, 100))
    expect(w.classes()).not.toContain('pending')
  })
})

describe('DragToSnap', () => {
  it('au clavier, se loge dans la cible et le signale', async () => {
    const target = document.createElement('div')
    const w = mount(DragToSnap, { props: { target, label: 'Replacer' } })
    await w.trigger('click')
    expect(w.emitted('snap')).toHaveLength(1)
    expect(w.classes()).toContain('placed')
    expect(w.attributes('aria-label')).toBe('Replacer')
  })

  it('sans cible, ne se loge pas', async () => {
    const w = mount(DragToSnap, { props: { label: 'Replacer' } })
    await w.trigger('click')
    expect(w.emitted('snap')).toBeUndefined()
  })
})

describe('ScrollHint', () => {
  it('reçoit son délai et son nombre d’allers', () => {
    const w = mount(ScrollHint, { props: { delay: 0.5, passes: 3 } })
    expect(w.attributes('style')).toContain('--delay: 0.5s')
    expect(w.attributes('style')).toContain('--passes: 3')
    expect(w.attributes('aria-hidden')).toBe('true')
  })
})

import { describe, expect, it } from 'vitest'
import { codeOf, ENTRIES, initialValues, propsOf } from '../../src/pages/design-system/catalogue'

const button = ENTRIES.find((e) => e.id === 'base-button')!

describe('catalogue du design system', () => {
  it('donne à chaque composant une adresse unique', () => {
    const ids = ENTRIES.map((e) => e.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('passe au composant les réglages non vides, sans le texte du slot', () => {
    const values = { ...initialValues(button), href: '' }
    expect(propsOf(button, values)).toEqual({
      variant: 'primary',
      icon: 'download',
      download: false,
      compact: false,
    })
  })

  it('écrit le code avec les seules options qui changent la valeur par défaut', () => {
    const values = { ...initialValues(button), variant: 'outline', compact: true }
    expect(codeOf(button, values)).toBe(
      '<BaseButton icon="download" compact>Télécharger le CV</BaseButton>',
    )
  })
})

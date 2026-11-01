import { describe, expect, it } from 'vitest'
import favicon from '../../public/favicon.svg?raw'
import component from '../../src/components/site/SiteLogo.vue?raw'
import source from '../../docs/logo/kokonut-symbole.svg?raw'

// Les tracés du symbole, tels qu'écrits dans un fichier
const paths = (text: string) => [...text.matchAll(/ d="([^"]+)"/g)].map((m) => m[1])

describe('logo', () => {
  it('garde le même symbole dans la source, le composant et le favicon', () => {
    expect(paths(source)).toHaveLength(3)
    expect(paths(component)).toEqual(paths(source))
    expect(paths(favicon)).toEqual(paths(source))
  })
})

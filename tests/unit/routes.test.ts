import { describe, expect, it } from 'vitest'
import {
  buildRoutes,
  LOCALES,
  localeFromPath,
  localizedPath,
  PAGES,
  prerenderPaths,
} from '../../src/router/routes'

describe('table des pages', () => {
  it('donne à chaque page un chemin dans chaque langue, préfixé par la langue', () => {
    for (const page of PAGES) {
      for (const locale of LOCALES) {
        expect(page.paths[locale]).toMatch(new RegExp(`^/${locale}(/|$)`))
      }
    }
  })

  it("n'a pas deux pages au même chemin", () => {
    const paths = PAGES.flatMap((page) => LOCALES.map((locale) => page.paths[locale]))
    expect(new Set(paths).size).toBe(paths.length)
  })

  it('marque les pages légales et la 404 en noindex', () => {
    const noindex = PAGES.filter((p) => 'noindex' in p).map((p) => p.name)
    expect(noindex.sort()).toEqual(['404', 'confidentialite', 'mentions-legales'])
  })
})

describe('localizedPath', () => {
  it("mène à la page équivalente dans l'autre langue", () => {
    expect(localizedPath('a-propos', 'fr')).toBe('/fr/a-propos')
    expect(localizedPath('a-propos', 'en')).toBe('/en/about')
  })

  it('remplace le slug des études de cas', () => {
    expect(localizedPath('etude-de-cas', 'en', { slug: 'ce-portfolio' })).toBe(
      '/en/projects/ce-portfolio',
    )
  })

  it('refuse un paramètre manquant', () => {
    expect(() => localizedPath('etude-de-cas', 'fr')).toThrow('slug')
  })
})

describe('localeFromPath', () => {
  it('lit la langue dans le préfixe, le français sinon', () => {
    expect(localeFromPath('/en/inconnue')).toBe('en')
    expect(localeFromPath('/fr')).toBe('fr')
    expect(localeFromPath('/english')).toBe('fr')
    expect(localeFromPath('/')).toBe('fr')
  })
})

describe('pré-rendu', () => {
  const paths = prerenderPaths({ 'etude-de-cas': [{ slug: 'ce-portfolio' }, { slug: 'chrono' }] })

  it('pré-rend chaque page dans les deux langues et une page par projet', () => {
    expect(paths).toContain('/fr')
    expect(paths).toContain('/en/legal-notice')
    expect(paths).toContain('/fr/projets/chrono')
    expect(paths).toContain('/en/projects/ce-portfolio')
    const withParams = PAGES.filter((p) => p.paths.fr.includes(':')).length
    expect(paths).toHaveLength((PAGES.length - withParams + 2 * withParams) * LOCALES.length)
  })

  it('ne pré-rend ni la racine, ni la vitrine des composants, ni de chemin à paramètre', () => {
    expect(paths).not.toContain('/')
    expect(paths.some((p) => p.includes('design-system') || p.includes(':'))).toBe(false)
  })
})

describe('routes', () => {
  const names = (dev: boolean) => buildRoutes(dev).map((r) => r.name)

  it('ajoute la vitrine des composants en développement seulement', () => {
    expect(names(true)).toContain('design-system')
    expect(names(false)).not.toContain('design-system')
  })
})

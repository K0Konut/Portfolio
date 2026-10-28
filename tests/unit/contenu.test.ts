import { describe, expect, it } from 'vitest'
import { slugify } from '../../scripts/markdown'
import { sitemapXml } from '../../src/router/sitemap'
import { skills, timeline } from '../../src/content/about'
import { featuredProjects, parseProject, projectBody, projects } from '../../src/content/projects'

const FILE = '/content/fr/projets/exemple.md'
const META = {
  title: 'Exemple',
  description: 'Un projet',
  date: '2025-03',
  tags: ['projet d’école'],
  type: 'Projet d’école',
  role: 'Développeur',
  duration: '3 mois',
  team: '4 personnes',
  stack: ['Vue 3'],
  capture: { device: 'phone', image: 'capture.png' },
}
const IMAGES = { '/content/images/projets/exemple/capture.png': '/assets/capture.png' }

describe('parseProject', () => {
  it('met l’en-tête en forme, le slug venant du nom de fichier', () => {
    const p = parseProject(FILE, META, IMAGES)
    expect(p).toMatchObject({ slug: 'exemple', featured: false, links: {}, toc: [] })
    expect(p.capture).toEqual({ device: 'phone', src: '/assets/capture.png', label: undefined })
    expect(p.meta).toMatchObject({ type: 'Projet d’école', team: '4 personnes', stack: ['Vue 3'] })
  })

  it.each([
    ['title', { title: undefined }],
    ['stack', { stack: [] }],
    ['date', { date: '2025' }],
    ['featured', { featured: 'oui' }],
    ['capture.device', { capture: { device: 'tablet' } }],
    ['capture.image', { capture: { device: 'phone', image: 'absente.png' } }],
  ])('refuse un champ « %s » manquant ou invalide, avec le nom du fichier', (field, patch) => {
    expect(() => parseProject(FILE, { ...META, ...patch }, IMAGES)).toThrow(
      `${FILE} : champ « ${field} »`,
    )
  })
})

describe('études de cas', () => {
  it('lit les projets, avec leur capture et le sommaire tiré des h2', () => {
    const portfolio = projects('fr').find((p) => p.slug === 'ce-portfolio')
    expect(portfolio?.capture.src).toBeTruthy()
    expect(portfolio?.toc.map((t) => t.id)).toEqual([
      'contexte',
      'besoin',
      'contraintes',
      'methode',
      'choix-techniques',
      'resultats',
      'enseignements',
    ])
    expect(projectBody('fr', 'ce-portfolio')).toBeTypeOf('function')
  })

  it('trie du plus récent au plus ancien et met en avant trois projets au plus', () => {
    const dates = projects('fr').map((p) => p.date)
    expect(dates).toEqual([...dates].sort().reverse())
    const featured = featuredProjects('fr')
    expect(featured.length).toBeLessThanOrEqual(3)
    expect(featured.every((p) => p.featured)).toBe(true)
  })

  it('relie chaque étape du parcours à une étude de cas qui existe', () => {
    const slugs = projects('fr').map((p) => p.slug)
    for (const step of timeline('fr')) if (step.caseStudy) expect(slugs).toContain(step.caseStudy)
    expect(skills('fr').length).toBeGreaterThan(0)
  })
})

describe('slugify', () => {
  it('retire accents et ponctuation', () => {
    expect(slugify('Choix techniques')).toBe('choix-techniques')
    expect(slugify('Méthode : l’essentiel !')).toBe('methode-l-essentiel')
  })
})

describe('sitemap', () => {
  const xml = sitemapXml('https://exemple.fr', { 'etude-de-cas': [{ slug: 'ce-portfolio' }] })

  it('liste chaque page indexable dans les deux langues, liée à ses équivalents', () => {
    expect(xml).toContain('<loc>https://exemple.fr/fr/a-propos</loc>')
    expect(xml).toContain('<loc>https://exemple.fr/en/projects/ce-portfolio</loc>')
    expect(xml).toContain('hreflang="en" href="https://exemple.fr/en/about"')
    expect(xml).toContain('hreflang="x-default" href="https://exemple.fr/fr/a-propos"')
  })

  it('laisse de côté les pages noindex', () => {
    expect(xml).not.toMatch(/404|mentions-legales|legal-notice|confidentialite|privacy/)
  })
})

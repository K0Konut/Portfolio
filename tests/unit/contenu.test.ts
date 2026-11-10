import { describe, expect, it } from 'vitest'
import { sitemapXml } from '../../src/router/sitemap'
import { parseSkills, parseTimeline, skills, timeline } from '../../src/content/about'
import {
  caseSections,
  featuredProjects,
  formatPeriod,
  parseProject,
  parseProjects,
  projects,
} from '../../src/content/projects'
import type { Project } from '../../src/content/types'
import { LOCALES, type Locale } from '../../src/router/pages'

const FILE = '/content/fr/projets.json'
const rich = (text: string) => ({ html: `<p>${text}</p>` })
/** Une entrée telle que Dashility la renvoie (type `projets`) */
const entry = (fields: Record<string, unknown> = {}, slug = 'exemple') => ({
  slug,
  publishedAt: '2026-11-09T00:00:00.000Z',
  fields: {
    type: { key: 'ecole', label: 'projet d’école' },
    titre: 'Exemple',
    accroche: 'Un projet',
    code: null,
    demo: 'https://exemple.fr',
    code_prive: null,
    role: 'Développeur',
    equipe: '4 personnes',
    periode: { start: '2025-03', end: '2025-06' },
    stack: ['Vue 3'],
    a_la_une: false,
    capture: {
      alt: 'L’écran d’accueil',
      width: 390,
      height: 844,
      src: '/medias/1/390.webp',
      srcset: { webp: '/medias/1/390.webp 390w', avif: '/medias/1/390.avif 390w' },
    },
    cadre: { key: 'telephone', label: 'téléphone' },
    contexte: rich('Le contexte'),
    besoin: rich('Le besoin'),
    contraintes: [{ titre: 'Budget.', description: rich('0 €') }],
    methode_intro: null,
    methode: [],
    choix: [{ titre: 'Vue', description: rich('Pourquoi'), compromis: 'un compromis' }],
    resultats: [{ valeur: '6', libelle: 'fonds', avant: 1, apres: 6 }],
    conclusion: null,
    enseignements: [],
    ...fields,
  },
})

describe('parseProject', () => {
  it('met une entrée de Dashility en forme', () => {
    const p = parseProject(entry(), FILE)
    expect(p).toMatchObject({
      slug: 'exemple',
      title: 'Exemple',
      tags: ['projet d’école'],
      featured: false,
      period: { start: '2025-03', end: '2025-06', ongoing: false },
      links: { code: undefined, demo: 'https://exemple.fr' },
      meta: { type: 'projet d’école', team: '4 personnes', privateCode: undefined },
    })
    expect(p.capture).toEqual({
      device: 'phone',
      src: '/medias/1/390.webp',
      srcset: '/medias/1/390.webp 390w',
      alt: 'L’écran d’accueil',
    })
    expect(p.body.choix).toEqual([
      { title: 'Vue', html: '<p>Pourquoi</p>', tradeOff: 'un compromis' },
    ])
    expect(p.body.resultats).toEqual([{ value: '6', label: 'fonds', before: 1, after: 6 }])
  })

  it.each([
    ['titre', { titre: '' }],
    ['stack', { stack: [] }],
    ['periode', { periode: { start: '2025' } }],
    ['periode', { periode: { start: '2025-03', end: '2025-13' } }],
    ['a_la_une', { a_la_une: 'oui' }],
    ['cadre', { cadre: { key: 'tablette', label: 'tablette' } }],
    ['capture', { capture: null }],
    ['contexte', { contexte: 'du texte brut' }],
    ['contraintes.description', { contraintes: [{ titre: 'Budget.' }] }],
    ['resultats.avant', { resultats: [{ valeur: '6', libelle: 'fonds', avant: '1' }] }],
  ])(
    'refuse un champ « %s » manquant ou invalide, avec le fichier et le projet',
    (field, patch) => {
      expect(() => parseProject(entry(patch), FILE)).toThrow(
        `${FILE}, projet « exemple » : champ « ${field} »`,
      )
    },
  )

  it('n’affiche que les sections remplies, dans l’ordre du gabarit', () => {
    expect(caseSections(parseProject(entry(), FILE))).toEqual([
      'contexte',
      'besoin',
      'contraintes',
      'choix',
      'resultats',
    ])
  })
})

describe('parseProjects', () => {
  it('trie par fin de période, « en cours » d’abord', () => {
    const list = parseProjects(
      [
        entry({ periode: { start: '2023-01', end: '2023-06' } }, 'ancien'),
        entry({ periode: { start: '2024-01', ongoing: true } }, 'en-cours'),
        entry({ periode: { start: '2025-01', end: '2025-02' } }, 'recent'),
      ],
      FILE,
    )
    expect(list.map((p) => p.slug)).toEqual(['en-cours', 'recent', 'ancien'])
  })

  it('refuse autre chose qu’une liste', () => {
    expect(() => parseProjects(null, FILE)).toThrow(FILE)
  })
})

describe('parcours et compétences', () => {
  const step = (slug: string, start: string, fields: Record<string, unknown> = {}) => ({
    slug,
    fields: {
      etiquette: { key: 'stage', label: 'stage' },
      periode: { start, end: null },
      titre: ' Un stage ',
      lieu: 'Paris',
      texte: 'Du code.',
      etude_de_cas: null,
      ...fields,
    },
  })

  it('trie le parcours du plus ancien au plus récent, sans espaces en trop', () => {
    const list = parseTimeline([step('b', '2024-04'), step('a', '2020-09')], 'parcours.json')
    expect(list.map((s) => s.period.start)).toEqual(['2020-09', '2024-04'])
    expect(list[0]).toMatchObject({ kind: 'stage', title: 'Un stage', caseStudy: undefined })
  })

  it('refuse une étape incomplète, avec le fichier et l’étape', () => {
    expect(() => parseTimeline([step('a', '2020')], 'parcours.json')).toThrow(
      'parcours.json, étape « a » : champ « periode »',
    )
    expect(() => parseTimeline([step('a', '2020-09', { lieu: '' })], 'parcours.json')).toThrow(
      '« lieu »',
    )
    // Une fin avant le début
    expect(() =>
      parseTimeline([step('a', '2022-09', { periode: { start: '2022-09', end: '2021-07' } })], 'p'),
    ).toThrow('« periode »')
  })

  it('met en avant les technos de ce site, quelle que soit la casse', () => {
    const data = { fields: { categories: [{ titre: ' front', competences: ['vue.js', 'Nuxt'] }] } }
    expect(parseSkills(data, 'competences.json')).toEqual([
      {
        title: 'front',
        skills: [
          { name: 'vue.js', site: true },
          { name: 'Nuxt', site: undefined },
        ],
      },
    ])
    expect(() => parseSkills({ fields: {} }, 'competences.json')).toThrow('« categories »')
  })
})

describe('formatPeriod', () => {
  it('écrit la période dans la langue de la page', () => {
    expect(formatPeriod({ start: '2026-10', ongoing: true }, 'fr', 'en cours')).toBe(
      'oct. 2026 – en cours',
    )
    expect(formatPeriod({ start: '2020-09', end: '2022-07' }, 'fr', 'en cours')).toBe(
      'sept. 2020 – juil. 2022',
    )
    expect(formatPeriod({ start: '2020-09', end: '2022-07' }, 'en', 'ongoing')).toBe(
      'Sep 2020 – Jul 2022',
    )
    expect(formatPeriod({ start: '2025-03', end: '2025-03' }, 'fr', 'en cours')).toBe('mars 2025')
  })
})

describe('études de cas', () => {
  it('lit les projets copiés de Dashility, avec leur capture', () => {
    const portfolio = projects('fr').find((p) => p.slug === 'ce-portfolio')
    expect(portfolio?.capture.src).toMatch(/^\/medias\//)
    expect(portfolio && caseSections(portfolio)).toContain('resultats')
  })

  it('met en avant trois projets au plus', () => {
    const featured = featuredProjects('fr')
    expect(featured.length).toBeLessThanOrEqual(3)
    expect(featured.every((p) => p.featured)).toBe(true)
  })

  it('garde dans chaque traduction les champs qui ne se traduisent pas', () => {
    // Sinon l'ordre des projets et la sélection de l'accueil changent d'une langue à l'autre. Un projet
    // sans version anglaise manque en anglais, sans bloquer (architecture technique §4)
    const shared = ({ slug, period, featured, stack, links, capture }: Project) => ({
      slug,
      period,
      featured,
      stack,
      links,
      src: capture.src,
    })
    const fr = projects('fr').map(shared)
    for (const p of projects('en').map(shared)) expect(fr).toContainEqual(p)
    // Même parcours (étapes, liens vers les études de cas) et mêmes technos mises en avant
    const steps = (l: Locale) => timeline(l).map((step) => step.caseStudy)
    const sites = (l: Locale) => skills(l).map((c) => c.skills.map((s) => s.site))
    expect(steps('en')).toEqual(steps('fr'))
    expect(sites('en')).toEqual(sites('fr'))
  })

  it.each(LOCALES)('relie chaque étape du parcours à une étude de cas qui existe (%s)', (l) => {
    const slugs = projects(l).map((p) => p.slug)
    for (const step of timeline(l)) if (step.caseStudy) expect(slugs).toContain(step.caseStudy)
    expect(skills(l).length).toBeGreaterThan(0)
  })
})

describe('sitemap', () => {
  const xml = sitemapXml('https://exemple.fr', {
    'etude-de-cas': [
      { params: { slug: 'ce-portfolio' }, locales: LOCALES },
      { params: { slug: 'chrono' }, locales: ['fr'] },
    ],
  })

  it('liste chaque page indexable dans les deux langues, liée à ses équivalents', () => {
    expect(xml).toContain('<loc>https://exemple.fr/fr/a-propos</loc>')
    expect(xml).toContain('<loc>https://exemple.fr/en/projects/ce-portfolio</loc>')
    expect(xml).toContain('hreflang="en" href="https://exemple.fr/en/about"')
    expect(xml).toContain('hreflang="x-default" href="https://exemple.fr/fr/a-propos"')
  })

  it('ne lie un projet pas encore traduit qu’à sa page française', () => {
    expect(xml).toContain('<loc>https://exemple.fr/fr/projets/chrono</loc>')
    expect(xml).not.toContain('/en/projects/chrono')
  })

  it('laisse de côté les pages noindex', () => {
    expect(xml).not.toMatch(/404|mentions-legales|legal-notice|confidentialite|privacy/)
  })
})

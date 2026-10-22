import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'
import { existsSync, readdirSync } from 'node:fs'

// Le HTML brut, sans JavaScript : ce que lit un moteur de recherche (architecture technique §5)
const pages = [
  { path: '/fr/', lang: 'fr', title: 'Costa Maskulov · Développeur full-stack' },
  { path: '/en/about/', lang: 'en', title: 'About · Costa Maskulov' },
  { path: '/fr/projets/ce-portfolio/', lang: 'fr', title: 'Étude de cas · Costa Maskulov' },
]

for (const { path, lang, title } of pages) {
  test(`${path} est pré-rendue avec sa langue, son titre et ses hreflang`, async ({ request }) => {
    const res = await request.get(path)
    expect(res.status()).toBe(200)
    const html = await res.text()
    expect(html).toContain(`<html lang="${lang}"`)
    expect(html).toContain(`<title>${title}</title>`)
    expect(html).toContain(`<h1>${title}</h1>`)
    expect(html).toMatch(/hreflang="x-default"/)
  })
}

test('les pages légales sont en noindex', async ({ request }) => {
  const html = await (await request.get('/en/privacy/')).text()
  expect(html).toContain('name="robots" content="noindex"')
})

test("la vitrine des composants n'est pas dans le build, ni sa page ni son code", () => {
  expect(existsSync('dist/design-system')).toBe(false)
  expect(readdirSync('dist/assets').filter((f) => /design-?system/i.test(f))).toEqual([])
})

test("l'accueil n'a pas d'erreur d'accessibilité détectable", async ({ page }) => {
  await page.goto('/fr/')
  const { violations } = await new AxeBuilder({ page }).analyze()
  expect(violations).toEqual([])
})

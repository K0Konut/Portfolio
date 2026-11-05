import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'
import { existsSync, readdirSync } from 'node:fs'

// Le HTML brut, sans JavaScript : ce que lit un moteur de recherche (architecture technique §5)
const pages = [
  {
    path: '/fr/',
    lang: 'fr',
    title: 'Costa Maskulov · Développeur full-stack',
    h1: 'Costa Maskulov',
  },
  { path: '/en/about/', lang: 'en', title: 'About · Costa Maskulov', h1: 'About' },
  { path: '/fr/a-propos/', lang: 'fr', title: 'À propos · Costa Maskulov', h1: 'À propos' },
  {
    path: '/fr/404/',
    lang: 'fr',
    title: 'Page introuvable · Costa Maskulov',
    h1: 'Il manque une brique.',
  },
  { path: '/fr/contact/', lang: 'fr', title: 'Contact · Costa Maskulov', h1: 'Contact' },
  {
    path: '/fr/projets/ce-portfolio/',
    lang: 'fr',
    title: 'Ce portfolio · Costa Maskulov',
    h1: 'Ce portfolio',
  },
]

for (const { path, lang, title, h1 = title } of pages) {
  test(`${path} est pré-rendue avec sa langue, son titre et ses hreflang`, async ({ request }) => {
    const res = await request.get(path)
    expect(res.status()).toBe(200)
    const html = await res.text()
    expect(html).toContain(`<html lang="${lang}"`)
    expect(html).toContain(`<title>${title}</title>`)
    // Le texte du titre, éventuellement dans un span (le nom en LetterReveal)
    expect(html).toMatch(new RegExp(`<h1[^>]*>(<span[^>]*>)?${h1}<`))
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
  // Après l'entrée animée : un texte en plein fondu fausserait le calcul des contrastes
  await expect(page.locator('.actions')).toHaveCSS('opacity', '1')
  await page.waitForFunction('document.getAnimations().length === 0')
  const { violations } = await new AxeBuilder({ page }).analyze()
  expect(violations).toEqual([])
})

test("l'en-tête et le pied de page sont dans le HTML, avec le lien vers l'autre langue", async ({
  request,
}) => {
  const html = await (await request.get('/fr/a-propos/')).text()
  expect(html).toContain('aria-label="Navigation principale"')
  expect(html).toContain('href="/en/about"')
  expect(html).toContain('<footer')
  // Les liens internes du pied de page gardent leur adresse (lien du routeur dans TextLink)
  expect(html).toContain('href="/fr/mentions-legales"')
  expect(html).toContain('href="/fr/confidentialite"')
})

test('le menu mobile se ferme avec Échap et rend le focus au bouton', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/fr/')
  await page.getByRole('button', { name: 'Menu' }).click()
  await expect(page.getByRole('dialog')).toBeVisible()
  await expect(page.getByRole('button', { name: 'Fermer' })).toBeFocused()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog')).toBeHidden()
  await expect(page.getByRole('button', { name: 'Menu' })).toBeFocused()
})

// Au clic, pas seulement au clavier : l'en-tête laisse passer les clics (pointer-events: none) et le menu y est rangé
test('le menu mobile se ferme et mène aux pages au clic', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/fr/')
  const menu = page.getByRole('button', { name: 'Menu' })
  await menu.click()
  await page.getByRole('button', { name: 'Fermer' }).click()
  await expect(page.getByRole('dialog')).toBeHidden()
  await menu.click()
  await page.getByRole('dialog').getByRole('link', { name: 'Contact' }).click()
  await expect(page).toHaveURL(/\/fr\/contact\/?$/)
  await expect(page.getByRole('dialog')).toBeHidden()
})

// La feuille de BaseButton peut se charger après celle de l'en-tête (version construite seulement)
test("le bouton Menu n'apparaît pas sur ordinateur", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 })
  await page.goto('/fr/')
  await expect(page.getByRole('button', { name: 'Menu' })).toBeHidden()
  await expect(page.getByRole('navigation', { name: 'Navigation principale' })).toBeVisible()
})

test('P2 : des projets à une étude de cas, par son sommaire, puis retour à la liste', async ({
  page,
}) => {
  await page.goto('/fr/projets/')
  await page.getByRole('link', { name: 'Ce portfolio' }).click()
  await expect(page.getByRole('heading', { level: 1, name: 'Ce portfolio' })).toBeVisible()
  await page
    .getByRole('navigation', { name: 'Sommaire' })
    .getByRole('link', { name: 'Résultats' })
    .click()
  await expect(page.locator('#resultats')).toBeInViewport()
  await page.getByRole('link', { name: 'Tous les projets' }).click()
  await expect(page).toHaveURL(/\/fr\/projets\/?$/)
})

test("l'à-propos porte l'ancre « methode », cible du bouton « Voir ma méthode » de l'accueil", async ({
  request,
}) => {
  expect(await (await request.get('/fr/a-propos/')).text()).toContain('id="methode"')
})

test("chaque page porte sa description et son aperçu de partage (Open Graph), l'étude de cas sa capture", async ({
  request,
}) => {
  const home = await (await request.get('/fr/')).text()
  expect(home).toMatch(/<meta name="description" content="Portfolio de Costa Maskulov/)
  expect(home).toMatch(/<meta property="og:image" content="[^"]*\/og\.jpg"/)
  const study = await (await request.get('/fr/projets/ce-portfolio/')).text()
  expect(study).toMatch(/<meta property="og:image" content="[^"]*\/assets\/capture-[^"]+\.png"/)
  expect(study.match(/<meta name="description"/g)).toHaveLength(1)
  expect((await request.get('/og.jpg')).status()).toBe(200)
})

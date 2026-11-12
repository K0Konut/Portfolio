// @vitest-environment happy-dom
import { createHead } from '@unhead/vue/client'
import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { createMemoryHistory, createRouter } from 'vue-router'
import projets from '../../content/fr/projets.json'
import { vReveal } from '../../src/directives/reveal'
import { createAppI18n } from '../../src/i18n'
import ApercuPage from '../../src/pages/ApercuPage.vue'
import { buildRoutes } from '../../src/router/routes'

/** La page d'aperçu, Dashility répondant `status` et `body` */
async function apercu(status: number, body: unknown, path = '/fr/apercu?dashility-preview=jeton') {
  const fetch = vi.fn<(url: URL) => Promise<Response>>(
    async () => new Response(JSON.stringify(body), { status }),
  )
  vi.stubGlobal('fetch', fetch)
  const router = createRouter({ history: createMemoryHistory(), routes: buildRoutes() })
  await router.push(path)
  const w = mount(ApercuPage, {
    global: { plugins: [router, createAppI18n(), createHead()], directives: { reveal: vReveal } },
  })
  await flushPromises()
  return { w, fetch }
}

const entry = {
  ...projets[0],
  type: 'projets',
  status: 'draft',
  enComplete: true,
  expiresAt: '2026-11-13T13:02:00Z',
}

afterEach(() => vi.unstubAllGlobals())

describe('page d’aperçu', () => {
  it('lit l’entrée avec le jeton et l’affiche dans son étude de cas', async () => {
    const { w, fetch } = await apercu(200, entry)
    expect(String(fetch.mock.calls[0]![0])).toBe(
      'https://dashility.costamask.dev/api/preview/jeton?locale=fr',
    )
    expect(w.find('h1').text()).toBe(projets[0]!.fields.titre)
    expect(w.find('.banner').text()).toContain('Brouillon, non publié.')
  })

  it.each([
    [410, { error: { code: 'preview_expired' } }, 'Ce lien d’aperçu a expiré.'],
    [404, { error: { code: 'preview_not_found' } }, 'Ce lien d’aperçu a expiré.'],
    [404, { error: { code: 'preview_entry_deleted' } }, 'Cette entrée n’existe plus.'],
    [500, {}, 'Dashility ne répond pas.'],
    [200, { ...entry, type: 'parcours' }, 'du type « parcours »'],
    [200, { ...entry, fields: { ...entry.fields, titre: null } }, 'le champ « titre » est vide'],
  ])('répond %i : « %2$s »', async (status, body, message) => {
    const { w } = await apercu(status, body)
    expect(w.find('main').text()).toContain(message)
  })

  it.each(['/fr/apercu', '/fr/apercu?dashility-preview=..'])(
    'sans jeton valide (%s), n’appelle pas Dashility',
    async (path) => {
      const { w, fetch } = await apercu(200, entry, path)
      expect(fetch).not.toHaveBeenCalled()
      expect(w.find('main').text()).toContain('expiré')
    },
  )

  it('garde le jeton dans le lien vers l’autre langue', async () => {
    const { w } = await apercu(200, entry)
    expect(w.find('a[hreflang="en"]').attributes('href')).toBe(
      '/en/preview?dashility-preview=jeton',
    )
  })
})

// Extension explicite : vite.config.ts importe ce fichier, et sa vérification de types l'exige
import { DEFAULT_LOCALE, LOCALES, PAGES, pageInstances, type PageParams } from './pages.ts'

/** sitemap.xml : chaque page indexable dans chaque langue, liée à ses équivalents (hreflang, x-default
    vers la langue par défaut). Les pages noindex (légales, 404) n'y figurent pas (architecture technique §5). */
export function sitemapXml(siteUrl: string, params: PageParams): string {
  const urls = PAGES.filter((page) => !('noindex' in page)).flatMap((page) =>
    pageInstances(page, params).flatMap((paths) => {
      // Seulement les langues où la page existe (un projet sans version anglaise n'est qu'en français)
      const locales = LOCALES.filter((l) => paths[l])
      const links = [
        ...locales.map((l) => link(l, siteUrl + paths[l])),
        ...(paths[DEFAULT_LOCALE] ? [link('x-default', siteUrl + paths[DEFAULT_LOCALE])] : []),
      ]
      return locales.map((l) => `<url><loc>${siteUrl + paths[l]}</loc>${links.join('')}</url>`)
    }),
  )
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...urls,
    '</urlset>',
    '',
  ].join('\n')
}

function link(hreflang: string, href: string): string {
  return `<xhtml:link rel="alternate" hreflang="${hreflang}" href="${href}"/>`
}

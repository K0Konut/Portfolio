import { LOCALES, PAGES, pageInstances, type PageName } from './routes'

/** sitemap.xml : chaque page indexable dans chaque langue, liée à ses équivalents (hreflang, x-default
    vers le français). Les pages noindex (légales, 404) n'y figurent pas (architecture technique §5). */
export function sitemapXml(
  siteUrl: string,
  params: Partial<Record<PageName, readonly Record<string, string>[]>>,
): string {
  const urls = PAGES.filter((page) => !('noindex' in page)).flatMap((page) =>
    pageInstances(page, params).flatMap((paths) => {
      const links = [
        ...LOCALES.map((l) => link(l, siteUrl + paths[l])),
        link('x-default', siteUrl + paths.fr),
      ]
      return LOCALES.map((l) => `<url><loc>${siteUrl + paths[l]}</loc>${links.join('')}</url>`)
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

import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import vue from '@vitejs/plugin-vue'
import Markdown from 'unplugin-vue-markdown/vite'
import { defineConfig, loadEnv } from 'vite'
import type {} from 'vite-ssg'
import { LOCALES, prerenderPaths, type Locale } from './src/router/pages.ts'
import { sitemapXml } from './src/router/sitemap.ts'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const siteUrl = (loadEnv(mode, process.cwd()).VITE_SITE_URL ?? '').replace(/\/$/, '')
  // Une étude de cas par projet copié, dans les langues où il existe (architecture technique §3) : pages
  // pré-rendues et sitemap partent de la même liste. La forme des fichiers est vérifiée par leur chargeur
  const params = () => {
    const slugs = (l: Locale): string[] => {
      const file = `content/${l}/projets.json`
      if (!existsSync(file)) return []
      // null : type pas encore publié ; le chargeur des projets refuse le reste
      const data = JSON.parse(readFileSync(file, 'utf8')) as { slug: string }[] | null
      return (data ?? []).map((e) => e.slug)
    }
    const byLocale = LOCALES.map((l) => [l, slugs(l)] as const)
    return {
      'etude-de-cas': [...new Set(byLocale.flatMap(([, s]) => s))].map((slug) => ({
        params: { slug },
        locales: byLocale.filter(([, s]) => s.includes(slug)).map(([l]) => l),
      })),
    }
  }
  return {
    plugins: [
      vue({ include: [/\.vue$/, /\.md$/] }),
      // Textes des pages (content/<langue>/pages/*.md), en attendant leur passage dans Dashility
      Markdown({}),
    ],
    build: {
      rolldownOptions: {
        output: {
          // GSAP dans son propre fichier : l'accueil l'importe directement, les autres pages à la demande
          codeSplitting: {
            // Le cœur seulement : ScrollTrigger reste chargé à la demande (rien en mouvement réduit)
            groups: [
              { name: 'gsap', test: /node_modules[\\/]gsap[\\/](index|gsap-core|CSSPlugin)\.js/ },
            ],
          },
        },
      },
    },
    ssgOptions: {
      script: 'async',
      formatting: 'minify',
      // Un dossier par page (fr/projets/index.html) : Nginx sert les adresses sans « .html »
      dirStyle: 'nested',
      beastiesOptions: false,
      includedRoutes: () => prerenderPaths(params()),
      onFinished() {
        // Sans domaine (développement, CI), pas de sitemap : check-content l'exige à la mise en ligne
        const sitemap = siteUrl ? `\nSitemap: ${siteUrl}/sitemap.xml\n` : ''
        if (siteUrl) writeFileSync('dist/sitemap.xml', sitemapXml(siteUrl, params()))
        writeFileSync('dist/robots.txt', `User-agent: *\nAllow: /\n${sitemap}`)
      },
    },
  }
})

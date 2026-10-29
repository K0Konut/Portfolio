import { readdirSync, writeFileSync } from 'node:fs'
import vue from '@vitejs/plugin-vue'
import Markdown from 'unplugin-vue-markdown/vite'
import { defineConfig, loadEnv } from 'vite'
import type {} from 'vite-ssg'
import { tocPlugin } from './scripts/markdown.ts'
import { prerenderPaths } from './src/router/pages.ts'
import { sitemapXml } from './src/router/sitemap.ts'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const siteUrl = (loadEnv(mode, process.cwd()).VITE_SITE_URL ?? '').replace(/\/$/, '')
  // Une étude de cas par fichier de la langue par défaut : pages pré-rendues et sitemap partent de la même liste
  const params = () => ({
    'etude-de-cas': readdirSync('content/fr/projets')
      .filter((file) => file.endsWith('.md'))
      .map((file) => ({ slug: file.slice(0, -'.md'.length) })),
  })
  return {
    plugins: [
      vue({ include: [/\.vue$/, /\.md$/] }),
      Markdown({
        markdownSetup: tocPlugin,
        // Tout l'en-tête sous un seul export, `data`, que lit le chargeur (src/content/projects.ts)
        frontmatterPreprocess: (frontmatter, options, _id, defaults) => ({
          head: defaults(frontmatter, options),
          frontmatter: { data: frontmatter },
        }),
      }),
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

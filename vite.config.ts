import { readdirSync, writeFileSync } from 'node:fs'
import vue from '@vitejs/plugin-vue'
import Markdown from 'unplugin-vue-markdown/vite'
import { defineConfig, loadEnv, runnerImport } from 'vite'
import type {} from 'vite-ssg'
import { tocPlugin } from './scripts/markdown.ts'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const siteUrl = (loadEnv(mode, process.cwd()).VITE_SITE_URL ?? '').replace(/\/$/, '')
  return {
    plugins: [
      vue({ include: [/\.vue$/, /\.md$/] }),
      Markdown({
        markdownSetup: tocPlugin,
        // Tout l'en-tête sous un seul export : le chargeur lit `data` sans embarquer le corps de chaque étude de cas
        frontmatterPreprocess: (frontmatter, options, _id, defaults) => ({
          head: defaults(frontmatter, options),
          frontmatter: { data: frontmatter },
        }),
      }),
    ],
    ssgOptions: {
      script: 'async',
      formatting: 'minify',
      // Un dossier par page (fr/projets/index.html) : Nginx sert les adresses sans « .html »
      dirStyle: 'nested',
      beastiesOptions: false,
      async onFinished() {
        // Sans domaine (développement, CI), pas de sitemap : check-content l'exige à la mise en ligne
        if (!siteUrl) return writeFileSync('dist/robots.txt', 'User-agent: *\nAllow: /\n')
        // Un projet par fichier, comme les pages pré-rendues (src/content/projects.ts)
        const slugs = readdirSync('content/fr/projets').map((file) => ({
          slug: file.replace(/\.md$/, ''),
        }))
        // La table des routes vit dans src/ : Vite la charge comme le code du site
        const { module } = await runnerImport<{
          sitemapXml: (url: string, params: object) => string
        }>('./src/router/sitemap.ts', { configFile: false })
        writeFileSync('dist/sitemap.xml', module.sitemapXml(siteUrl, { 'etude-de-cas': slugs }))
        writeFileSync(
          'dist/robots.txt',
          `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
        )
      },
    },
  }
})

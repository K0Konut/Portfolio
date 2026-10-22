import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import type {} from 'vite-ssg'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    // Un dossier par page (fr/projets/index.html) : Nginx sert les adresses sans « .html »
    dirStyle: 'nested',
    beastiesOptions: false,
  },
})

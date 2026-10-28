/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Adresse publique du site, sans « / » final (balises canonical, hreflang, sitemap). */
  readonly VITE_SITE_URL?: string
}

declare module '*.md' {
  import type { Component } from 'vue'
  const component: Component
  export default component
}

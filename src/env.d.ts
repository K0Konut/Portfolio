/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Adresse publique du site, sans « / » final (balises canonical, hreflang, sitemap). */
  readonly VITE_SITE_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

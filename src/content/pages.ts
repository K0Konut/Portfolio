import type { Component } from 'vue'
import type { Locale } from '../router/pages'

/* Textes longs des pages (« Qui je suis », « Mon histoire »…), en Markdown : content/<langue>/pages/<nom>.md
   (architecture technique §4). Les libellés courts restent dans src/i18n/. */
const texts = import.meta.glob<Component>('/content/*/pages/*.md', {
  eager: true,
  import: 'default',
})

/** Le texte d'une page, en composant Vue ; absent tant que la langue n'est pas traduite */
export const pageText = (locale: Locale, name: string): Component | undefined =>
  texts[`/content/${locale}/pages/${name}.md`]

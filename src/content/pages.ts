import type { Locale } from '../router/pages'
import { isObject } from './check'

/* Textes longs des pages (« Qui je suis », « Mon histoire », mentions légales, confidentialité) : la copie du
   contenu de Dashility, content/<langue>/<nom>.json, un champ `texte` en texte riche (architecture
   technique §4). Les libellés courts restent dans src/i18n/. */
const files = import.meta.glob<unknown>(
  '/content/*/{qui-je-suis,mon-histoire,mentions-legales,confidentialite}.json',
  { eager: true, import: 'default' },
)

export type PageTextName = 'qui-je-suis' | 'mon-histoire' | 'mentions-legales' | 'confidentialite'

/** Le texte d'une page, en HTML déjà filtré par Dashility ; absent tant qu'il n'est pas publié dans la langue */
export function pageText(locale: Locale, name: PageTextName): string | undefined {
  const file = `/content/${locale}/${name}.json`
  const data = files[file]
  if (data == null) return undefined
  const texte = isObject(data) && isObject(data.fields) ? data.fields.texte : undefined
  if (!isObject(texte) || typeof texte.html !== 'string')
    throw new Error(`${file} : champ « texte » manquant ou invalide`)
  return texte.html
}

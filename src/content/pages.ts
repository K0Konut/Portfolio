import { LOCALES, type Locale } from '../router/pages'
import { isObject } from './check'

/* Textes longs des pages (« Qui je suis », « Mon histoire », mentions légales, confidentialité) : la copie du
   contenu de Dashility, content/<langue>/<nom>.json, un champ `texte` en texte riche (architecture
   technique §4). Les libellés courts restent dans src/i18n/. */
const files = import.meta.glob<unknown>(
  '/content/*/{qui-je-suis,mon-histoire,mentions-legales,confidentialite}.json',
  { eager: true, import: 'default' },
)

const NAMES = ['qui-je-suis', 'mon-histoire', 'mentions-legales', 'confidentialite'] as const
export type PageTextName = (typeof NAMES)[number]

function parse(file: string): string | undefined {
  const data = files[file]
  // Pas encore publié (null), ou pas complet en anglais : rien ; check-content exige le français
  if (data == null) return undefined
  const texte = isObject(data) && isObject(data.fields) ? data.fields.texte : undefined
  if (!isObject(texte) || typeof texte.html !== 'string')
    throw new Error(`${file} : champ « texte » manquant ou invalide`)
  return texte.html
}
// Vérifiés au chargement, comme les autres contenus : une copie invalide fait échouer le build
const TEXTS = Object.fromEntries(
  LOCALES.flatMap((l) => NAMES.map((n) => [`${l}/${n}`, parse(`/content/${l}/${n}.json`)])),
)

/** Le texte d'une page, en HTML déjà filtré par Dashility ; absent tant qu'il n'est pas publié dans la langue */
export const pageText = (locale: Locale, name: PageTextName): string | undefined =>
  TEXTS[`${locale}/${name}`]

import { createI18n } from 'vue-i18n'
import { DEFAULT_LOCALE } from '../router/routes'
import en from './en.json'
import fr from './fr.json'

/** Une instance par rendu : le pré-rendu crée l'application une fois par page. */
export function createAppI18n() {
  return createI18n({
    legacy: false,
    locale: DEFAULT_LOCALE,
    fallbackLocale: DEFAULT_LOCALE,
    messages: { fr, en },
  })
}

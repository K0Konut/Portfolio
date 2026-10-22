import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { routeName, type Locale, type PageName } from '../router/routes'

/** Langue courante et liens vers les pages, dans cette langue ou une autre (architecture technique §3).
    La langue est réglée par le routeur avant chaque page ; elle n'est donc jamais autre chose qu'une `Locale`. */
export function useLocale() {
  const route = useRoute()
  const router = useRouter()
  const { locale: i18nLocale } = useI18n()
  const locale = computed(() => i18nLocale.value as Locale)

  /** Lien vers une page du site, dans la langue courante */
  const to = (page: PageName, params?: Record<string, string>) => ({
    name: routeName(page, locale.value),
    params,
  })

  /** Adresse de la page courante dans une langue, ou `undefined` si elle n'y a pas d'équivalent */
  const alternate = (l: Locale) =>
    route.meta.alternates && route.meta.page
      ? router.resolve({ name: routeName(route.meta.page, l), params: route.params }).href
      : undefined

  return { locale, to, alternate }
}

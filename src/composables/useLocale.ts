import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { projects } from '../content/projects'
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

  /** Adresse de la page courante dans une langue, ou `undefined` si elle n'y a pas d'équivalent (adresse
      inconnue, projet sans version dans cette langue) */
  const alternate = (l: Locale) => {
    const page = route.meta.alternates ? route.meta.page : undefined
    if (!page) return undefined
    if (page === 'etude-de-cas' && !projects(l).some((p) => p.slug === route.params.slug))
      return undefined
    // L'aperçu garde son jeton (?dashility-preview=…) d'une langue à l'autre
    const query = page === 'apercu' ? route.query : undefined
    return router.resolve({ name: routeName(page, l), params: route.params, query }).href
  }

  return { locale, to, alternate }
}

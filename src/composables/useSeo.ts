import { useHead } from '@unhead/vue'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import {
  DEFAULT_LOCALE,
  LOCALES,
  localeFromPath,
  localizedPath,
  type Locale,
} from '../router/routes'

const SITE_URL = (import.meta.env.VITE_SITE_URL ?? '').replace(/\/$/, '')

/** Balises `head` de la page courante : langue, titre, canonical, hreflang, noindex (architecture technique §5). */
export function useSeo() {
  const route = useRoute()
  const { t } = useI18n()

  const locale = computed<Locale>(() => route.meta.locale ?? localeFromPath(route.path))
  const page = computed(() => route.meta.page ?? '404')
  const params = computed(() =>
    Object.fromEntries(Object.entries(route.params).map(([key, value]) => [key, String(value)])),
  )
  const url = (l: Locale) => `${SITE_URL}${localizedPath(page.value, l, params.value)}`

  useHead({
    htmlAttrs: { lang: locale },
    title: computed(() => t(`pages.${page.value}.title`)),
    // Une page introuvable n'a pas d'équivalent dans l'autre langue
    link: computed(() =>
      route.meta.locale
        ? [
            { rel: 'canonical', href: url(locale.value) },
            ...LOCALES.map((l) => ({ rel: 'alternate', hreflang: l, href: url(l) })),
            { rel: 'alternate', hreflang: 'x-default', href: url(DEFAULT_LOCALE) },
          ]
        : [],
    ),
    meta: computed(() => (route.meta.noindex ? [{ name: 'robots', content: 'noindex' }] : [])),
  })
}

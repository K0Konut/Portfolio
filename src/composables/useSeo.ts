import { useHead } from '@unhead/vue'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { DEFAULT_LOCALE, LOCALES, routeName, type Locale } from '../router/routes'

const SITE_URL = (import.meta.env.VITE_SITE_URL ?? '').replace(/\/$/, '')

/** Balises `head` de la page courante : langue, titre, canonical, hreflang, noindex (architecture technique §5).
    La langue vient de l'i18n, réglée par le routeur avant chaque page. */
export function useSeo() {
  const route = useRoute()
  const router = useRouter()
  const { t, locale } = useI18n()

  const page = computed(() => route.meta.page ?? '404')
  const url = (l: Locale) =>
    SITE_URL + router.resolve({ name: routeName(page.value, l), params: route.params }).href

  useHead({
    htmlAttrs: { lang: locale },
    title: computed(() => t(`pages.${page.value}.title`)),
    link: computed(() =>
      route.meta.alternates
        ? [
            { rel: 'canonical', href: url(locale.value as Locale) },
            ...LOCALES.map((l) => ({ rel: 'alternate', hreflang: l, href: url(l) })),
            { rel: 'alternate', hreflang: 'x-default', href: url(DEFAULT_LOCALE) },
          ]
        : [],
    ),
    meta: computed(() => (route.meta.noindex ? [{ name: 'robots', content: 'noindex' }] : [])),
  })
}

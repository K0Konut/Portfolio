import { useHead, useSeoMeta } from '@unhead/vue'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { SITE } from '../content/site'
import { DEFAULT_LOCALE, LOCALES, type Locale } from '../router/routes'
import { useLocale } from './useLocale'

const SITE_URL = (import.meta.env.VITE_SITE_URL ?? '').replace(/\/$/, '')

/** Adresse publique d'un chemin du site (balises Open Graph : une adresse complète) */
export const absolute = (path: string) => SITE_URL + path

/** Balises `head` de la page courante : langue, titre, description, Open Graph, canonical, hreflang, noindex
    (architecture technique §5). La langue vient de l'i18n, réglée par le routeur avant chaque page.
    Une étude de cas précise son titre, sa description et son image (EtudeDeCasPage). */
export function useSeo() {
  const route = useRoute()
  const { t, te } = useI18n()
  const { locale, alternate } = useLocale()

  const page = computed(() => route.meta.page ?? '404')
  const url = (l: Locale) => absolute(alternate(l) ?? '')
  const title = computed(() => t(`pages.${page.value}.title`))
  const description = computed(() => {
    const key = `pages.${page.value}.description`
    // Comme le titre : repli sur la langue par défaut si la traduction manque
    return te(key) || te(key, DEFAULT_LOCALE) ? t(key) : undefined
  })

  useHead({
    htmlAttrs: { lang: locale },
    title,
    link: computed(() =>
      route.meta.alternates
        ? [
            { rel: 'canonical', href: url(locale.value) },
            // Seulement les langues où la page existe (un projet pas encore traduit)
            ...LOCALES.filter((l) => alternate(l)).map((l) => ({
              rel: 'alternate',
              hreflang: l,
              href: url(l),
            })),
            ...(alternate(DEFAULT_LOCALE)
              ? [{ rel: 'alternate', hreflang: 'x-default', href: url(DEFAULT_LOCALE) }]
              : []),
          ]
        : [],
    ),
  })
  useSeoMeta({
    description,
    robots: computed(() => (route.meta.noindex ? 'noindex' : undefined)),
    ogType: 'website',
    ogSiteName: SITE.name,
    ogTitle: title,
    ogDescription: description,
    ogUrl: computed(() => (route.meta.alternates ? url(locale.value) : undefined)),
    ogLocale: computed(() => (locale.value === 'fr' ? 'fr_FR' : 'en_US')),
    // Image générique : la section d'accueil (public/og.jpg, 1200 × 630)
    ogImage: absolute('/og.jpg'),
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogImageAlt: computed(() => t('pages.accueil.title')),
    twitterCard: 'summary_large_image',
  })
}

import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { useLocale } from '../../composables/useLocale'

/** Liens de la navigation principale, dans l'ordre (architecture §1), avec la rubrique en cours */
export function useNavLinks() {
  const route = useRoute()
  const { t } = useI18n()
  const { to } = useLocale()
  return computed(() =>
    (['projets', 'a-propos', 'contact'] as const).map((page) => ({
      page,
      to: to(page),
      label: t(`nav.${page}`),
      current: route.meta.section === page,
    })),
  )
}

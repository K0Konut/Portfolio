import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink, type RouteLocationRaw } from 'vue-router'

export interface LinkProps {
  /** Page du site (lien du routeur) */
  to?: RouteLocationRaw
  /** Fichier ou site externe */
  href?: string
  /** Télécharger le fichier de `href` (le CV) */
  download?: boolean
}

/** Élément et attributs d'un lien ou d'un bouton : lien du routeur, `<a>` ou `<button>` ;
    un site externe s'ouvre dans un nouvel onglet, annoncé aux lecteurs d'écran (design system § TextLink). */
export function useLink(props: LinkProps) {
  const { t } = useI18n()
  const external = computed(() => !!props.href && /^https?:\/\//.test(props.href))
  const tag = computed(() => (props.to ? RouterLink : props.href ? 'a' : 'button'))
  const attrs = computed(() =>
    tag.value === 'button'
      ? { type: 'button' }
      : {
          to: props.to,
          href: props.href,
          download: props.download || undefined,
          target: external.value ? '_blank' : undefined,
          rel: external.value ? 'noopener' : undefined,
        },
  )
  const newTab = computed(() => (external.value ? t('ui.newTab') : ''))
  return { tag, attrs, external, newTab }
}

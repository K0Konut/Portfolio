<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { RouteLocationRaw } from 'vue-router'
import BaseIcon from './BaseIcon.vue'
import type { IconName } from './icons'

const props = withDefaults(
  defineProps<{
    variant?: 'inline' | 'standalone'
    to?: RouteLocationRaw
    href?: string
    download?: boolean
    /** Icône du lien (`standalone`) ; un lien externe a toujours `arrow-up-right` */
    icon?: IconName
    iconStart?: boolean
  }>(),
  { variant: 'inline', to: undefined, href: undefined, download: false, icon: undefined },
)

const { t } = useI18n()
const external = computed(() => !!props.href && /^https?:\/\//.test(props.href))
const shownIcon = computed(() => (external.value ? 'arrow-up-right' : props.icon))
</script>

<template>
  <component
    :is="to ? 'RouterLink' : 'a'"
    :class="['link', `link-${variant}`]"
    :to="to"
    :href="href"
    :download="download || undefined"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener' : undefined"
  >
    <BaseIcon v-if="shownIcon && iconStart" :name="shownIcon" />
    <span class="label"><slot /></span>
    <BaseIcon v-if="shownIcon && !iconStart" :name="shownIcon" />
    <span v-if="external" class="sr-only"> {{ t('ui.newTab') }}</span>
  </component>
</template>

<style scoped>
/* Toujours souligné : un lien ne se confond jamais avec une mise en valeur (DA §2, règle 1) */
.link-inline {
  color: var(--color-action);
  text-decoration: underline;
  text-decoration-thickness: var(--border-thin);
  text-underline-offset: 0.2em;
}
.link-inline:hover,
.link-inline:focus-visible {
  text-decoration-thickness: var(--underline);
}
.link-inline .icon {
  display: inline;
  vertical-align: -0.15em;
}
.link-standalone {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  min-height: var(--target-min);
  color: var(--color-text);
  text-decoration: none;
  transition: color var(--duration-fast) var(--ease-out);
}
.link-standalone .label {
  position: relative;
}
.link-standalone .label::before,
.link-standalone .label::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: calc(-1 * var(--space-1));
}
.link-standalone .label::before {
  height: var(--border-thin);
  background: currentColor;
}
/* Le trait épais se trace de gauche à droite ; avec « réduire les animations », il apparaît d'un coup */
.link-standalone .label::after {
  height: var(--underline);
  background: var(--color-action);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform var(--duration-fast) var(--ease-out);
}
.link-standalone:hover,
.link-standalone:focus-visible {
  color: var(--color-action);
}
.link-standalone:hover .label::after,
.link-standalone:focus-visible .label::after {
  transform: scaleX(1);
}
@media (prefers-reduced-motion: reduce) {
  .link-standalone .label::after {
    transition: none;
  }
}
</style>

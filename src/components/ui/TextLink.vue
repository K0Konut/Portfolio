<script setup lang="ts">
import { computed } from 'vue'
import { useLink, type LinkProps } from '../../composables/useLink'
import BaseIcon from './BaseIcon.vue'
import type { IconName } from './icons'

const props = withDefaults(
  defineProps<
    LinkProps & {
      variant?: 'inline' | 'standalone'
      /** Icône du lien (`standalone`) ; un lien externe a toujours `arrow-up-right` */
      icon?: IconName
      iconStart?: boolean
    }
  >(),
  { variant: 'inline', to: undefined, href: undefined, download: false, icon: undefined },
)

const { tag, attrs, external, newTab } = useLink(props)
const shownIcon = computed(() => (external.value ? 'arrow-up-right' : props.icon))
</script>

<template>
  <component :is="tag" :class="['link', `link-${variant}`]" v-bind="attrs">
    <BaseIcon v-if="shownIcon && iconStart" :name="shownIcon" />
    <span class="label"><slot /></span>
    <BaseIcon v-if="shownIcon && !iconStart" :name="shownIcon" />
    <span v-if="newTab" class="sr-only"> {{ newTab }}</span>
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
/* Le trait épais se trace de gauche à droite ; avec « réduire les animations », il apparaît d'un coup (--duration-move) */
.link-standalone .label::after {
  height: var(--underline);
  background: var(--color-action);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform var(--duration-move) var(--ease-out);
}
.link-standalone:hover,
.link-standalone:focus-visible {
  color: var(--color-action);
}
.link-standalone:hover .label::after,
.link-standalone:focus-visible .label::after {
  transform: scaleX(1);
}
</style>

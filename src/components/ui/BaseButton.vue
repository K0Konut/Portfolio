<script setup lang="ts">
import { useLink, type LinkProps } from '../../composables/useLink'
import BaseIcon from './BaseIcon.vue'

type ButtonIcon = 'arrow-right' | 'download' | 'arrow-up-right'

const props = withDefaults(
  defineProps<LinkProps & { variant?: 'primary' | 'outline'; icon?: ButtonIcon }>(),
  { variant: 'outline', to: undefined, href: undefined, download: false, icon: undefined },
)

// Un lien quand il mène quelque part, un bouton quand il agit sur la page ; jamais un div cliquable
const { tag, attrs, newTab } = useLink(props)
</script>

<template>
  <component :is="tag" :class="['btn', `btn-${variant}`, icon && `btn-${icon}`]" v-bind="attrs">
    <slot />
    <BaseIcon v-if="icon" :name="icon" />
    <span v-if="newTab" class="sr-only"> {{ newTab }}</span>
  </component>
</template>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-3);
  min-height: var(--target-min);
  padding: var(--space-4) var(--space-5);
  border: var(--border-strong) solid transparent;
  border-radius: var(--radius-pill);
  font: var(--weight-bold) var(--text-ui) / var(--leading-none) var(--font-body);
  text-decoration: none;
  cursor: pointer;
  transition:
    transform var(--duration-fast) var(--ease-out),
    background-color var(--duration-fast) var(--ease-out),
    color var(--duration-fast) var(--ease-out);
}
.btn .icon {
  transition: transform var(--duration-fast) var(--ease-out);
}
.btn-primary {
  background: var(--color-action);
  color: var(--color-on-action);
}
.btn-outline {
  background: transparent;
  color: var(--color-text);
  border-color: var(--color-text);
}
.btn:hover {
  background: var(--color-text);
  color: var(--color-bg);
  transform: translateY(calc(-1 * var(--hover-lift)));
}
/* L'icône avance dans son sens : à droite, en bas pour le téléchargement, en diagonale vers l'extérieur */
.btn:hover .icon {
  transform: translateX(var(--hover-nudge));
}
.btn-download:hover .icon {
  transform: translateY(var(--hover-nudge));
}
.btn-arrow-up-right:hover .icon {
  transform: translate(var(--hover-nudge), calc(-1 * var(--hover-nudge)));
}
.btn:active {
  transform: scale(var(--press-scale));
  transition-duration: var(--duration-press);
}
</style>

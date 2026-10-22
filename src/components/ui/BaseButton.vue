<script setup lang="ts">
import { computed } from 'vue'
import type { RouteLocationRaw } from 'vue-router'
import BaseIcon from './BaseIcon.vue'

type ButtonIcon = 'arrow-right' | 'download' | 'arrow-up-right'

const props = withDefaults(
  defineProps<{
    variant?: 'primary' | 'outline'
    /** Page du site (lien du routeur) */
    to?: RouteLocationRaw
    /** Fichier ou site externe */
    href?: string
    /** Télécharger le fichier de `href` (le CV) */
    download?: boolean
    icon?: ButtonIcon
  }>(),
  { variant: 'outline', to: undefined, href: undefined, download: false, icon: undefined },
)

// Un lien quand il mène quelque part, un bouton quand il agit sur la page ; jamais un div cliquable
const tag = computed(() => (props.to ? 'RouterLink' : props.href ? 'a' : 'button'))
</script>

<template>
  <component
    :is="tag"
    :class="['btn', `btn-${variant}`, icon && `btn-${icon}`]"
    :to="to"
    :href="href"
    :download="download || undefined"
    :type="tag === 'button' ? 'button' : undefined"
  >
    <slot />
    <BaseIcon v-if="icon" :name="icon" />
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
.btn :deep(.icon) {
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
.btn:hover :deep(.icon) {
  transform: translateX(var(--hover-nudge));
}
.btn-download:hover :deep(.icon) {
  transform: translateY(var(--hover-nudge));
}
.btn-arrow-up-right:hover :deep(.icon) {
  transform: translate(var(--hover-nudge), calc(-1 * var(--hover-nudge)));
}
.btn:active {
  transform: scale(var(--press-scale));
  transition-duration: var(--duration-press);
}
</style>

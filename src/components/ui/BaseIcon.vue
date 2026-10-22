<script setup lang="ts">
import { ICONS, type IconName } from './icons'

withDefaults(defineProps<{ name: IconName; size?: 'sm' | 'md' }>(), { size: 'sm' })
</script>

<template>
  <!-- Décorative : le nom accessible se met sur le bouton ou le lien qui la contient -->
  <svg :class="['icon', `icon-${size}`]" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <component :is="shape.tag" v-for="(shape, i) in ICONS[name]" :key="i" v-bind="shape.attrs" />
  </svg>
</template>

<style scoped>
.icon {
  flex: none;
  fill: none;
  stroke: currentColor;
  stroke-width: var(--icon-stroke);
  stroke-linecap: round;
  stroke-linejoin: round;
}
.icon-sm {
  width: var(--icon-sm);
  height: var(--icon-sm);
}
.icon-md {
  width: var(--icon-md);
  height: var(--icon-md);
}
</style>

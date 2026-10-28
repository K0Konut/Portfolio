<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'
import BaseIcon from './BaseIcon.vue'

/* Grand lien vers la suite (design system § NextLink) : un libellé, le titre en grand et une flèche.
   Au survol et au focus, la flèche avance et le titre se souligne. */
defineProps<{ label: string; title: string; to: RouteLocationRaw }>()
</script>

<template>
  <RouterLink class="next" :to="to">
    <span class="lbl">{{ label }}</span>
    <span class="title display"
      ><span class="text">{{ title }}</span
      ><BaseIcon name="arrow-right" size="md"
    /></span>
  </RouterLink>
</template>

<style scoped>
.next {
  display: grid;
  gap: var(--space-2);
  color: var(--color-text);
  text-decoration: none;
}
.lbl {
  font-size: var(--text-sm);
  font-weight: var(--weight-bold);
}
.title {
  display: inline-flex;
  align-items: center;
  gap: var(--space-3);
  font-size: var(--text-h2);
}
.text {
  background: linear-gradient(currentColor, currentColor) left bottom / 0 var(--underline) no-repeat;
  transition: background-size var(--duration-move) var(--ease-out);
}
.title .icon {
  transition: transform var(--duration-fast) var(--ease-out);
}
.next:hover .text,
.next:focus-visible .text {
  background-size: 100% var(--underline);
}
.next:hover .icon,
.next:focus-visible .icon {
  transform: translateX(var(--hover-nudge));
}
</style>

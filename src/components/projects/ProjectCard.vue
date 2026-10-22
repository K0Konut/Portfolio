<script setup lang="ts">
import { useLocale } from '../../composables/useLocale'
import type { ProjectSummary } from '../../content/types'
import BaseTag from '../ui/BaseTag.vue'
import DeviceFrame from './DeviceFrame.vue'

/* Carte de projet (design system § ProjectCard) : un seul lien, sur le titre, étendu à toute la carte.
   Au survol ou au focus, la carte se soulève, se redresse et s'éclaircit ; pas d'ombre (design plat). */
defineProps<{ project: ProjectSummary }>()
const { to } = useLocale()
</script>

<template>
  <article class="card">
    <DeviceFrame
      :device="project.capture.device"
      :src="project.capture.src"
      :label="project.capture.label ?? project.title"
    />
    <div class="tags">
      <BaseTag v-for="tag in project.tags" :key="tag">{{ tag }}</BaseTag>
    </div>
    <h3>
      <RouterLink :to="to('etude-de-cas', { slug: project.slug })">{{ project.title }}</RouterLink>
    </h3>
    <p class="desc">{{ project.description }}</p>
    <p class="stack">{{ project.stack.join(' · ') }}</p>
  </article>
</template>

<style scoped>
.card {
  position: relative;
  display: grid;
  gap: var(--space-3);
  align-content: start;
  padding: var(--space-5);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  transform: rotate(var(--tilt, 0deg));
  transition:
    transform var(--duration-fast) var(--ease-out),
    background-color var(--duration-fast) var(--ease-out);
}
.card:hover,
.card:has(a:focus-visible) {
  background: var(--color-surface-hover);
  transform: translateY(calc(-1 * var(--card-lift))) rotate(0deg);
}
.card:active {
  transform: translateY(calc(-1 * var(--card-lift) / 2)) rotate(0deg);
  transition-duration: var(--duration-press);
}
.card:has(a:focus-visible) {
  outline: var(--focus-width) solid var(--color-focus);
  outline-offset: var(--focus-offset);
}
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}
h3 {
  margin: var(--space-1) 0 0;
  font-family: var(--font-display);
  font-weight: var(--weight-regular);
  font-size: var(--text-h3);
  line-height: var(--leading-display);
}
h3 a {
  color: inherit;
  text-decoration: none;
}
h3 a:focus-visible {
  outline: none;
}
h3 a::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
}
.desc {
  margin: 0;
  color: var(--color-text-muted);
}
.stack {
  margin: 0;
  font-size: var(--text-sm);
  color: var(--color-text-subtle);
}
</style>

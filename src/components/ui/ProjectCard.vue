<script setup lang="ts">
import { useLocale } from '../../composables/useLocale'
import type { ProjectSummary } from '../../content/types'
import BaseTag from '../ui/BaseTag.vue'
import DeviceFrame from './DeviceFrame.vue'

/* Carte de projet (design system § ProjectCard) : un seul lien, sur le titre, étendu à toute la carte.
   Au survol ou au focus, elle s'éclaircit ; pas d'ombre (design plat). Le conteneur fixe sa disposition :
   affiche collée (PosterGrid) ou tuile du bento (BentoGrid). */
defineProps<{ project: ProjectSummary }>()
const { to } = useLocale()
</script>

<template>
  <article class="card">
    <DeviceFrame
      :device="project.capture.device"
      :src="project.capture.src"
      :srcset="project.capture.srcset"
      sizes="(min-width: 768px) 50vw, 100vw"
      :label="project.capture.label ?? project.title"
    />
    <div class="body">
      <div class="tags">
        <BaseTag v-for="tag in project.tags" :key="tag">{{ tag }}</BaseTag>
      </div>
      <h3 class="display">
        <RouterLink :to="to('etude-de-cas', { slug: project.slug })">{{
          project.title
        }}</RouterLink>
      </h3>
      <p class="desc">{{ project.description }}</p>
      <p class="stack">{{ project.stack.join(' · ') }}</p>
    </div>
  </article>
</template>

<style scoped>
.card {
  position: relative;
  display: grid;
  gap: var(--space-4);
  align-content: start;
  padding: var(--space-5);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  transition:
    transform var(--duration-fast) var(--ease-out),
    background-color var(--duration-fast) var(--ease-out);
}
.card:hover,
.card:focus-within {
  background: var(--color-surface-hover);
}
.card:has(a:focus-visible) {
  outline: var(--focus-width) solid var(--color-focus);
  outline-offset: var(--focus-offset);
}
.body {
  display: grid;
  gap: var(--space-3);
  align-content: start;
}
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}
h3 {
  margin-top: var(--space-1);
  /* Agrandi dans la grande cellule de BentoGrid */
  font-size: var(--card-title, var(--text-h3));
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

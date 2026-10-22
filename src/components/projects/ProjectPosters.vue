<script setup lang="ts">
import type { ProjectSummary } from '../../content/types'
import ProjectCard from './ProjectCard.vue'

// Les trois projets de l'accueil en « affiches collées » (DA §5) : décalés et inclinés sur bureau, droits ailleurs
defineProps<{ projects: ProjectSummary[] }>()
</script>

<template>
  <ul class="posters">
    <li v-for="(project, i) in projects" :key="project.slug" v-reveal="i">
      <ProjectCard class="poster" :project="project" />
    </li>
  </ul>
</template>

<style scoped>
.posters {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: var(--space-5);
}
li {
  display: grid;
}
.poster:active {
  transform: translateY(calc(-1 * var(--card-lift) / 2)) rotate(0deg);
  transition-duration: var(--duration-press);
}
@media (min-width: 768px) {
  .posters {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
/* Inclinaisons en multiples de --poster-tilt (-2°), donc droites en mouvement réduit */
@media (min-width: 1024px) {
  .posters {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    align-items: start;
  }
  li:nth-child(3n + 1) {
    margin-top: var(--space-5);
    --tilt: var(--poster-tilt);
  }
  li:nth-child(3n + 2) {
    margin-top: var(--space-8);
    --tilt: calc(var(--poster-tilt) * -0.75);
  }
  li:nth-child(3n) {
    --tilt: calc(var(--poster-tilt) * 0.5);
  }
}
</style>

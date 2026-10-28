<script setup lang="ts">
import PosterGrid from '../../../components/mise-en-page/PosterGrid.vue'
import DotList from '../../../components/ui/DotList.vue'
import PosterCard from '../../../components/ui/PosterCard.vue'
import ProjectCard from '../../../components/ui/ProjectCard.vue'
import { PROJETS } from '../projets'

// Trois colonnes : des cartes de projet (accueil) ; cinq : des cartes de compétences (À propos)
defineProps<{ columns: 3 | 5; count: number }>()
const SKILLS = [
  { title: 'front', items: ['Vue.js', 'TypeScript', 'CSS'] },
  { title: 'back', items: ['Node.js', 'Python', 'SQL'] },
  { title: 'UI / UX', items: ['Figma', 'accessibilité'] },
  { title: 'déploiement', items: ['Docker', 'Linux', 'Nginx'] },
  { title: 'méthode', items: ['sprints', 'daily'] },
]
</script>

<template>
  <PosterGrid :columns="columns">
    <template v-if="columns === 3">
      <ProjectCard v-for="p in PROJETS.slice(0, count)" :key="p.slug" :project="p" />
    </template>
    <template v-else>
      <PosterCard v-for="s in SKILLS.slice(0, count)" :key="s.title" as="article" class="skill">
        <h3>{{ s.title }}</h3>
        <DotList :items="s.items.map((name) => ({ name }))" />
      </PosterCard>
    </template>
  </PosterGrid>
</template>

<style scoped>
.skill {
  display: grid;
  gap: var(--space-4);
  align-content: start;
}
h3 {
  margin: 0;
  font-family: var(--font-accent);
  font-style: italic;
  font-weight: var(--weight-regular);
  font-size: var(--text-lead);
  color: var(--color-highlight);
}
</style>

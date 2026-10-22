<script setup lang="ts">
import capture from '../../assets/projets/ce-portfolio.png'
import HomeHero from '../../components/home/HomeHero.vue'
import ProcessSteps from '../../components/home/ProcessSteps.vue'
import ProjectPosters from '../../components/projects/ProjectPosters.vue'
import PageSection from '../../components/sections/PageSection.vue'
import SectionWave from '../../components/sections/SectionWave.vue'
import type { ProjectSummary } from '../../content/types'

// Trois projets d'exemple pour la vitrine (le vrai contenu arrive avec le chargeur de contenu)
const PROJECTS: ProjectSummary[] = [
  {
    slug: 'ce-portfolio',
    title: 'Ce portfolio',
    tags: ['projet perso'],
    description: 'Ce site, de la méthode au code.',
    stack: ['Vue 3', 'TypeScript', 'Vite', 'Docker'],
    capture: { device: 'browser', src: capture },
  },
  {
    slug: 'mangas',
    title: 'Lecteur de mangas et BD',
    tags: ['application'],
    description: 'Une application pour lire ses mangas et ses BD.',
    stack: ['stack à compléter'],
    capture: { device: 'phone', label: 'Mangas & BD' },
  },
  {
    slug: 'chrono',
    title: 'Chrono caisses à savon',
    tags: ['projet d’école', 'embarqué'],
    description: 'Le chronométrage embarqué d’une course de caisses à savon.',
    stack: ['stack à compléter'],
    capture: { device: 'browser' },
  },
]
</script>

<template>
  <!-- Composants de l'accueil, dans l'ordre de la page : section d'accueil, projets, méthode -->
  <div aria-label="Composants de l’accueil">
    <SectionWave :seed="11" from="nuit" to="violet" />
    <HomeHero />
    <SectionWave :seed="1" from="violet" to="nuit" />
    <PageSection title="Projets">
      <template #intro>La sélection du moment : trois projets, du besoin au code.</template>
      <ProjectPosters :projects="PROJECTS" />
    </PageSection>
    <SectionWave :seed="3" from="nuit" to="vif" />
    <PageSection fond="vif" title="Ma façon de travailler">
      <template #intro
        >Chaque projet passe par les mêmes étapes, du besoin jusqu’à la mise en ligne.</template
      >
      <ProcessSteps />
    </PageSection>
    <SectionWave :seed="4" from="vif" to="nuit" />
  </div>
</template>

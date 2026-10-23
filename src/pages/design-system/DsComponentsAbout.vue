<script setup lang="ts">
import SkillCards from '../../components/about/SkillCards.vue'
import CareerTimeline from '../../components/about/CareerTimeline.vue'
import BusinessCard from '../../components/contact/BusinessCard.vue'
import BrickRepair from '../../components/errors/BrickRepair.vue'
import PageSection from '../../components/sections/PageSection.vue'
import SectionWave from '../../components/sections/SectionWave.vue'
import type { SkillCategory, TimelineStep } from '../../content/types'

// Contenu d'exemple de la maquette (le vrai contenu arrive avec le chargeur de contenu)
const STEPS: TimelineStep[] = [
  {
    kind: 'lycée',
    dates: 'dates à compléter',
    title: 'Bac STI2D, spécialité SIN',
    place: 'Lycée (nom à compléter)',
    text: 'Le déclic : construire des choses avec du code, de l’électronique au logiciel.',
  },
  {
    kind: 'école',
    dates: 'dates à compléter',
    title: 'Cycle ingénieur, génie informatique',
    place: 'ESIEA, Paris · spécialité génie logiciel',
    text: 'Projets logiciels en équipe, dont le chronométrage embarqué d’une course de caisses à savon.',
  },
  {
    kind: 'stage',
    dates: 'dates à compléter',
    title: 'Stage de développement',
    place: 'CNAM',
    text: 'Un stage dont le code est privé : l’étude de cas en montre le process et les écrans.',
    caseStudy: 'stage-cnam',
  },
  {
    kind: 'job étudiant',
    dates: 'dates à compléter',
    title: 'Job étudiant à compléter',
    place: 'lieu et rôle',
    text: 'Une ou deux lignes sur ce que ce job a apporté.',
  },
]
const site = (...names: string[]) => names.map((name) => ({ name, site: true }))
const other = (...names: string[]) => names.map((name) => ({ name }))
const SKILLS: SkillCategory[] = [
  {
    title: 'front',
    skills: [
      ...site('Vue.js'),
      ...other('Nuxt'),
      ...site('TypeScript', 'JavaScript', 'HTML', 'CSS', 'Vite'),
    ],
  },
  { title: 'back', skills: other('Node.js', 'Express', 'Python', 'API REST', 'MongoDB', 'SQL') },
  { title: 'UI / UX', skills: other('Figma', 'responsive', 'accessibilité') },
  {
    title: 'outils et déploiement',
    skills: site('Git', 'GitHub', 'npm', 'Docker', 'Linux', 'Proxmox', 'Nginx Proxy Manager'),
  },
  { title: 'méthode', skills: other('sprints', 'daily') },
]
</script>

<template>
  <!-- Composants des pages À propos, Contact et 404 -->
  <div aria-label="Composants À propos, Contact et 404">
    <PageSection title="CareerTimeline">
      <template #intro
        >Le parcours : le fil se trace au scroll, les repères se remplissent.</template
      >
      <CareerTimeline :steps="STEPS" />
    </PageSection>
    <SectionWave :seed="3" from="nuit" to="violet" />
    <PageSection fond="violet" title="SkillCards">
      <template #intro>Les compétences en affiches collées, posées une à une.</template>
      <SkillCards :categories="SKILLS" />
    </PageSection>
    <BusinessCard />
    <!-- Replacer la brique mène à l'accueil, comme sur la vraie page 404 -->
    <BrickRepair />
    <SectionWave :seed="5" from="violet" to="nuit" />
  </div>
</template>

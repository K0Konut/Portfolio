<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import CaseNav from '../../components/case/CaseNav.vue'
import ProjectBento from '../../components/projects/ProjectBento.vue'
import PageSection from '../../components/sections/PageSection.vue'
import SectionWave from '../../components/sections/SectionWave.vue'
import DefinitionList from '../../components/ui/DefinitionList.vue'
import StatBlock from '../../components/ui/StatBlock.vue'
import StickyToc from '../../components/ui/StickyToc.vue'
import type { ProjectMeta, Stat } from '../../content/types'
import { PROJETS, TODO } from './projets'

// Contenu d'exemple de la maquette (le vrai contenu arrive avec le chargeur de contenu)
const META: ProjectMeta = {
  type: 'Projet perso',
  role: 'Conception, design et développement',
  duration: 'Depuis octobre 2026, en cours',
  team: 'Seul',
  stack: ['Vue 3', 'TypeScript', 'Vite', 'GSAP', 'Docker'],
}
const META_PRIVE: ProjectMeta = {
  type: 'Stage',
  role: 'Développeur full-stack',
  duration: 'À compléter',
  team: 'À compléter',
  stack: TODO,
  privateCode: 'Le code appartient au CNAM ; l’étude de cas montre le process et les écrans.',
}
const STATS: Stat[] = [
  { value: '7', label: 'étapes, du PRD au code, chacune validée avant la suivante' },
  { value: '24', label: 'composants spécifiés dans le design system' },
  {
    value: '6',
    label: 'fonds de section, contre un seul dans la première direction artistique',
    before: 1,
    after: 6,
  },
]
// La fiche de l'étude de cas ; un code privé : la mention et sa raison, jamais un bouton désactivé
const { t } = useI18n()
const fiche = (meta: ProjectMeta) => [
  { label: t('meta.type'), value: meta.type },
  { label: t('meta.role'), value: meta.role },
  { label: t('meta.duration'), value: meta.duration },
  { label: t('meta.team'), value: meta.team },
  { label: t('meta.stack'), value: meta.stack.join(' · ') },
  ...(meta.privateCode
    ? [{ label: t('meta.code'), value: t('meta.private'), note: meta.privateCode }]
    : []),
]
const BLOCKS = [
  { id: 'ds-contexte', label: 'Contexte' },
  { id: 'ds-methode', label: 'Méthode' },
  { id: 'ds-resultats', label: 'Résultats' },
]
</script>

<template>
  <!-- Composants de la page Projets et de l'étude de cas -->
  <div aria-label="Composants des projets">
    <PageSection title="ProjectBento">
      <template #intro
        >La page Projets : du plus récent au plus ancien, le premier en grand.</template
      >
      <ProjectBento :projects="PROJETS" />
    </PageSection>
    <SectionWave :seed="2" from="nuit" to="violet" />
    <PageSection fond="violet" title="DefinitionList">
      <template #intro
        >La fiche de l’étude de cas ; avec un code privé, la mention et sa raison.</template
      >
      <div class="fiches">
        <DefinitionList :items="fiche(META)" />
        <DefinitionList :items="fiche(META_PRIVE)" />
      </div>
    </PageSection>
    <SectionWave :seed="5" from="violet" to="nuit" />
    <PageSection title="StickyToc et StatBlock">
      <div class="case">
        <StickyToc :items="BLOCKS" />
        <div class="blocks">
          <section v-for="block in BLOCKS" :id="block.id" :key="block.id" class="block">
            <h3 class="display">{{ block.label }}</h3>
            <div v-if="block.id === 'ds-resultats'" class="stats">
              <StatBlock v-for="(stat, i) in STATS" :key="stat.label" v-bind="stat" :index="i" />
            </div>
            <p v-else>
              Un bloc de l’étude de cas. Le sommaire, à gauche sur bureau, suit le bloc en cours de
              lecture ; sur mobile, il disparaît.
            </p>
          </section>
        </div>
      </div>
    </PageSection>
    <SectionWave :seed="6" from="nuit" to="rose" />
    <CaseNav :next="{ slug: 'stage-cnam', title: 'Stage au CNAM' }" />
    <SectionWave :seed="7" from="rose" to="nuit" />
  </div>
</template>

<style scoped>
.fiches {
  display: grid;
  gap: var(--space-7);
  max-width: 40rem;
}
.case {
  display: grid;
  gap: var(--space-8);
}
@media (min-width: 1024px) {
  .case {
    grid-template-columns: var(--toc-width) minmax(0, 1fr);
    align-items: start;
  }
}
.blocks {
  display: grid;
  gap: var(--space-9);
}
.block {
  display: grid;
  gap: var(--space-4);
  min-height: 60vh;
  align-content: start;
}
.block h3 {
  font-size: var(--text-h2);
}
.block p {
  margin: 0;
  max-width: var(--measure);
  color: var(--color-text-muted);
}
.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 13rem), 1fr));
  gap: var(--space-7) var(--space-6);
}
</style>

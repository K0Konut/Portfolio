<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import HomeHero from '../../components/home/HomeHero.vue'
import ProjectPosters from '../../components/projects/ProjectPosters.vue'
import PageSection from '../../components/sections/PageSection.vue'
import SectionWave from '../../components/sections/SectionWave.vue'
import CycleSteps from '../../components/ui/CycleSteps.vue'
import { PROJETS } from './projets'

const { t, tm } = useI18n()
const steps = computed(() => tm('method.steps') as { title: string; text: string }[])
</script>

<template>
  <!-- Composants de l'accueil, dans l'ordre de la page : section d'accueil, projets, méthode -->
  <div aria-label="Composants de l’accueil">
    <SectionWave :seed="11" from="nuit" to="violet" />
    <HomeHero />
    <SectionWave :seed="1" from="violet" to="nuit" />
    <PageSection title="Projets">
      <template #intro>La sélection du moment : trois projets, du besoin au code.</template>
      <ProjectPosters :projects="PROJETS.slice(0, 3)" />
    </PageSection>
    <SectionWave :seed="3" from="nuit" to="vif" />
    <PageSection fond="vif" title="Ma façon de travailler">
      <template #intro
        >Chaque projet passe par les mêmes étapes, du besoin jusqu’à la mise en ligne.</template
      >
      <CycleSteps :steps="steps">
        <template #center>{{ t('method.loop') }}</template>
      </CycleSteps>
    </PageSection>
    <SectionWave :seed="4" from="vif" to="nuit" />
  </div>
</template>

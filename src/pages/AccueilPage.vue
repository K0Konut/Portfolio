<script setup lang="ts">
import { computed, useId } from 'vue'
import { useI18n } from 'vue-i18n'
import SectionWave from '../components/fonds/SectionWave.vue'
import PageSection from '../components/mise-en-page/PageSection.vue'
import PosterGrid from '../components/mise-en-page/PosterGrid.vue'
import BaseButton from '../components/ui/BaseButton.vue'
import CycleSteps from '../components/ui/CycleSteps.vue'
import ProjectCard from '../components/ui/ProjectCard.vue'
import TextLink from '../components/ui/TextLink.vue'
import { useLocale } from '../composables/useLocale'
import { pageText } from '../content/pages'
import { featuredProjects } from '../content/projects'
import AccueilHero from './accueil/AccueilHero.vue'
import ParlonsEn from './blocs/ParlonsEn.vue'

/* Accueil (design system §5, architecture de contenu §4) : violet → nuit → crème → vif → lime,
   une vague à chaque changement de fond, jusqu'au pied de page (nuit). */
const { t, tm } = useI18n()
const { locale, to } = useLocale()
const projects = computed(() => featuredProjects(locale.value))
const who = computed(() => pageText(locale.value, 'qui-je-suis'))
const whoTitle = useId()
const steps = computed(() => tm('method.steps') as { title: string; text: string }[])
</script>

<template>
  <main id="contenu" tabindex="-1">
    <AccueilHero />
    <PageSection :title="t('home.projectsTitle')">
      <template #intro>{{ t('home.projectsIntro') }}</template>
      <PosterGrid>
        <ProjectCard v-for="project in projects" :key="project.slug" :project="project" />
      </PosterGrid>
      <TextLink v-reveal class="end" variant="standalone" icon="arrow-right" :to="to('projets')">{{
        t('case.all')
      }}</TextLink>
    </PageSection>
    <SectionWave :seed="2" from="nuit" to="creme" />
    <!-- Titre à côté du texte sur bureau : la section porte le sien (labelledby) -->
    <PageSection fond="creme" :labelledby="whoTitle">
      <div class="about">
        <h2 :id="whoTitle" v-reveal class="display">{{ t('home.whoTitle') }}</h2>
        <div v-reveal="1" class="about-text">
          <component :is="who" v-if="who" class="lead" />
          <BaseButton icon="arrow-right" :to="to('a-propos')">{{ t('home.whoMore') }}</BaseButton>
        </div>
      </div>
    </PageSection>
    <SectionWave :seed="3" from="creme" to="vif" />
    <PageSection fond="vif" :title="t('home.methodTitle')">
      <template #intro>{{ t('home.methodIntro') }}</template>
      <CycleSteps :steps="steps">
        <template #center>{{ t('method.loop') }}</template>
      </CycleSteps>
      <BaseButton v-reveal class="start" icon="arrow-right" :to="to('a-propos')">{{
        t('home.methodMore')
      }}</BaseButton>
    </PageSection>
    <SectionWave :seed="4" from="vif" to="lime" />
    <ParlonsEn :intro="t('home.contactIntro')" />
    <SectionWave :seed="5" from="lime" to="nuit" />
  </main>
</template>

<style scoped>
.end {
  justify-self: end;
}
.start {
  justify-self: start;
}
.about {
  display: grid;
  gap: var(--space-6);
}
@media (min-width: 1024px) {
  .about {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.6fr);
    align-items: start;
  }
}
.about h2 {
  font-size: var(--text-h2);
}
.about-text {
  display: grid;
  gap: var(--space-6);
  justify-items: start;
}
.about-text :deep(p) {
  margin: 0;
}
</style>

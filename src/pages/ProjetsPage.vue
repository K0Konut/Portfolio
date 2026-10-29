<script setup lang="ts">
import { computed, useId } from 'vue'
import { useI18n } from 'vue-i18n'
import SectionWave from '../components/fonds/SectionWave.vue'
import BentoGrid from '../components/mise-en-page/BentoGrid.vue'
import PageIntro from '../components/mise-en-page/PageIntro.vue'
import PageSection from '../components/mise-en-page/PageSection.vue'
import ProjectCard from '../components/ui/ProjectCard.vue'
import { useLocale } from '../composables/useLocale'
import { projects as allProjects } from '../content/projects'
import ParlonsEn from './blocs/ParlonsEn.vue'

// Projets (design system §5) : violet → nuit → lime, tous les projets du plus récent au plus ancien
const { t } = useI18n()
const { locale } = useLocale()
const projects = computed(() => allProjects(locale.value))
const listTitle = useId()
</script>

<template>
  <main id="contenu" tabindex="-1">
    <PageIntro :title="t('nav.projets')">{{ t('projects.intro') }}</PageIntro>
    <SectionWave :seed="1" from="violet" to="nuit" />
    <PageSection :labelledby="listTitle">
      <!-- Titre pour les lecteurs d'écran : les cartes portent des h3, le h1 est dans l'intro -->
      <h2 :id="listTitle" class="sr-only">{{ t('case.all') }}</h2>
      <BentoGrid glow>
        <ProjectCard v-for="project in projects" :key="project.slug" :project="project" />
      </BentoGrid>
    </PageSection>
    <SectionWave :seed="4" from="nuit" to="lime" />
    <ParlonsEn :intro="t('projects.contactIntro')" />
    <SectionWave :seed="5" from="lime" to="nuit" />
  </main>
</template>

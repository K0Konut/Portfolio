<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import SectionWave from '../components/fonds/SectionWave.vue'
import PageIntro from '../components/mise-en-page/PageIntro.vue'
import PageSection from '../components/mise-en-page/PageSection.vue'
import PosterGrid from '../components/mise-en-page/PosterGrid.vue'
import BaseTimeline from '../components/ui/BaseTimeline.vue'
import DotList from '../components/ui/DotList.vue'
import NumberedSteps from '../components/ui/NumberedSteps.vue'
import PosterCard from '../components/ui/PosterCard.vue'
import TextLink from '../components/ui/TextLink.vue'
import { useLocale } from '../composables/useLocale'
import { skills as allSkills, timeline } from '../content/about'
import { pageText } from '../content/pages'
import ParlonsEn from './blocs/ParlonsEn.vue'
import TitreEtTexte from './blocs/TitreEtTexte.vue'

/* À propos (design system §5) : violet → crème → nuit → violet → nuit → lime. La méthode porte l'id
   « methode », la cible du bouton « Voir ma méthode » de l'accueil. */
const { t, tm } = useI18n()
const { locale, to } = useLocale()

const story = computed(() => pageText(locale.value, 'mon-histoire'))
const path = computed(() =>
  timeline(locale.value).map((step) => ({
    tag: step.kind,
    date: step.dates,
    title: step.title,
    subtitle: step.place,
    text: step.text,
    link: step.caseStudy
      ? { to: to('etude-de-cas', { slug: step.caseStudy }), label: t('about.caseStudy') }
      : undefined,
  })),
)
const skills = computed(() =>
  allSkills(locale.value).map(({ title, skills: list }) => ({
    title,
    items: list.map(({ name, site }) => ({ name, highlight: site })),
  })),
)
const steps = computed(() => tm('method.steps') as { title: string; text: string }[])
</script>

<template>
  <main id="contenu" tabindex="-1">
    <PageIntro :title="t('nav.a-propos')">{{ t('about.intro') }}</PageIntro>
    <SectionWave :seed="1" from="violet" to="creme" />
    <TitreEtTexte :title="t('about.storyTitle')" :text="story" />
    <SectionWave :seed="2" from="creme" to="nuit" />
    <PageSection :title="t('about.pathTitle')">
      <template #intro>{{ t('about.pathIntro') }}</template>
      <BaseTimeline :items="path" />
    </PageSection>
    <SectionWave :seed="3" from="nuit" to="violet" />
    <PageSection fond="violet" :title="t('about.skillsTitle')">
      <template #intro>{{ t('about.skillsIntro') }}</template>
      <PosterGrid :columns="5">
        <PosterCard v-for="category in skills" :key="category.title" as="article" class="skills">
          <h3 class="hl">{{ category.title }}</h3>
          <DotList :items="category.items" />
        </PosterCard>
      </PosterGrid>
      <p v-reveal class="legend">
        <i class="skill-dot on" aria-hidden="true" />{{ t('about.legend') }}
        <TextLink :to="to('etude-de-cas', { slug: 'ce-portfolio' })">{{
          t('about.legendLink')
        }}</TextLink>
      </p>
    </PageSection>
    <SectionWave :seed="4" from="violet" to="nuit" />
    <PageSection id="methode" :title="t('home.methodTitle')">
      <template #intro>{{ t('home.methodIntro') }}</template>
      <div class="method">
        <div class="steps">
          <NumberedSteps :steps="steps" />
          <p v-reveal class="loop">{{ t('about.methodLoop') }}</p>
        </div>
        <aside v-reveal class="team">
          <h3 class="display">{{ t('about.teamTitle') }}</h3>
          <p>{{ t('about.teamText') }}</p>
        </aside>
      </div>
    </PageSection>
    <SectionWave :seed="5" from="nuit" to="lime" />
    <ParlonsEn :intro="t('about.contactIntro')" />
    <SectionWave :seed="6" from="lime" to="nuit" />
  </main>
</template>

<style scoped>
.skills {
  display: grid;
  gap: var(--space-4);
  align-content: start;
}
.skills h3 {
  margin: 0;
  font-size: var(--text-lead);
}
.legend {
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-3);
  font-size: var(--text-sm);
  color: var(--color-text-muted);
}
.method {
  display: grid;
  gap: var(--space-7);
}
@media (min-width: 1024px) {
  .method {
    grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
    align-items: start;
  }
  .team {
    position: sticky;
    top: calc(var(--header-height) + var(--space-6));
  }
}
.steps {
  display: grid;
  gap: var(--space-6);
}
.loop {
  margin: 0;
  font-size: var(--text-sm);
  font-weight: var(--weight-bold);
}
.team {
  display: grid;
  gap: var(--space-3);
  padding: var(--space-6);
  border: var(--border-thin) solid var(--color-border);
  border-radius: var(--radius-md);
}
.team h3 {
  font-size: var(--text-h3);
}
.team p {
  margin: 0;
  max-width: var(--measure);
  color: var(--color-text-muted);
}
</style>

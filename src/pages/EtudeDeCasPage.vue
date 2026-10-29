<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import SectionWave from '../components/fonds/SectionWave.vue'
import PageSection from '../components/mise-en-page/PageSection.vue'
import NextLink from '../components/ui/NextLink.vue'
import StickyToc from '../components/ui/StickyToc.vue'
import TextLink from '../components/ui/TextLink.vue'
import { useLocale } from '../composables/useLocale'
import { projectBody, projects } from '../content/projects'
import { SITE } from '../content/site'
import EtudeEnTete from './etude-de-cas/EtudeEnTete.vue'

/* Étude de cas (design system §5) : violet → nuit → rose. Le corps vient du Markdown du projet ;
   ses h2 alimentent le sommaire. Seuls les projets existants sont pré-rendus (vite.config.ts). */
const route = useRoute()
const { t } = useI18n()
const { locale, to } = useLocale()

const list = computed(() => projects(locale.value))
const index = computed(() => list.value.findIndex((p) => p.slug === route.params.slug))
const project = computed(() => list.value[index.value])
const body = computed(() => project.value && projectBody(locale.value, project.value.slug))
// Le projet suivant ; après le dernier, le premier. Aucun s'il n'y a qu'un projet
const next = computed(() =>
  list.value.length > 1 ? list.value[(index.value + 1) % list.value.length] : undefined,
)

useHead({
  title: computed(() => project.value && `${project.value.title} · ${SITE.name}`),
  meta: computed(() =>
    project.value ? [{ name: 'description', content: project.value.description }] : [],
  ),
})
</script>

<template>
  <main id="contenu" tabindex="-1">
    <template v-if="project">
      <EtudeEnTete :project="project" />
      <SectionWave :seed="2" from="violet" to="nuit" />
      <PageSection>
        <div class="case">
          <StickyToc :items="project.toc" />
          <component :is="body" class="prose" />
        </div>
      </PageSection>
      <SectionWave :seed="6" from="nuit" to="rose" />
      <PageSection fond="rose">
        <nav class="end" :aria-label="t('case.after')">
          <NextLink
            v-if="next"
            :label="t('case.next')"
            :title="next.title"
            :to="to('etude-de-cas', { slug: next.slug })"
          />
          <TextLink variant="standalone" :to="to('projets')" icon="arrow-left" icon-start>{{
            t('case.all')
          }}</TextLink>
        </nav>
      </PageSection>
      <SectionWave :seed="7" from="rose" to="nuit" />
    </template>
  </main>
</template>

<style scoped>
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
.end {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: var(--space-6);
}

/* Le corps en Markdown : un h2 par bloc du gabarit (contexte, besoin…), texte limité à --measure */
.prose {
  display: grid;
  gap: var(--space-4);
  min-width: 0;
}
.prose :deep(:is(p, ul, ol)) {
  margin: 0;
  max-width: var(--measure);
  color: var(--color-text-muted);
}
.prose :deep(h2) {
  margin: 0;
  font-family: var(--font-display);
  font-weight: var(--weight-regular);
  font-size: var(--text-h2);
  line-height: var(--leading-display);
  scroll-margin-top: calc(var(--header-height) + var(--space-5));
}
.prose :deep(* + h2) {
  margin-top: var(--space-8);
}
/* La première phrase d'un bloc, en avant */
.prose :deep(h2 + p) {
  font-size: var(--text-lead);
  line-height: var(--leading-snug);
  color: var(--color-text);
}
.prose :deep(h3) {
  margin: var(--space-4) 0 0;
  font-size: var(--text-lead);
  line-height: var(--leading-snug);
}
/* Le compromis d'un choix technique, écrit en italique dans le Markdown */
.prose :deep(p:has(> em:only-child)) {
  font-size: var(--text-sm);
  color: var(--color-text-subtle);
}
.prose :deep(p > em:only-child) {
  font-style: normal;
}
/* Listes : le titre de chaque élément en gras, sur sa ligne */
.prose :deep(:is(ul, ol)) {
  list-style: none;
  padding: 0;
  display: grid;
}
.prose :deep(ul) {
  gap: var(--space-4);
}
.prose :deep(li strong) {
  display: block;
  color: var(--color-text);
}
/* Liste numérotée : les étapes de la méthode, numéro en grand */
.prose :deep(ol) {
  counter-reset: step;
}
.prose :deep(ol li) {
  display: grid;
  grid-template-columns: 3rem minmax(0, 1fr);
  column-gap: var(--space-4);
  padding: var(--space-3) 0;
  border-top: var(--border-thin) solid var(--color-border);
}
.prose :deep(ol li::before) {
  counter-increment: step;
  content: counter(step);
  grid-row: span 2;
  font-family: var(--font-display);
  font-size: var(--text-h3);
  line-height: var(--leading-none);
  color: var(--color-block);
}
.prose :deep(.stats) {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 13rem), 1fr));
  gap: var(--space-7) var(--space-6);
  margin-block: var(--space-4);
}
</style>

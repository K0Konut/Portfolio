<script setup lang="ts">
import { computed, useId } from 'vue'
import { useI18n } from 'vue-i18n'
import BaseButton from '../../components/ui/BaseButton.vue'
import BaseTag from '../../components/ui/BaseTag.vue'
import DefinitionList from '../../components/ui/DefinitionList.vue'
import DeviceFrame from '../../components/ui/DeviceFrame.vue'
import type { Project } from '../../content/types'

/* En-tête d'une étude de cas (design system §5), en violet : étiquettes, titre, phrase, liens ; la fiche
   à droite du titre sur bureau (colonnes 7/5) ; la capture principale en grand dessous. */
const props = defineProps<{ project: Project }>()
const { t } = useI18n()
const titleId = useId()

// Code privé : la mention et sa raison, jamais un bouton désactivé
const fiche = computed(() => {
  const { meta, stack } = props.project
  return [
    { label: t('meta.type'), value: meta.type },
    { label: t('meta.role'), value: meta.role },
    { label: t('meta.duration'), value: meta.duration },
    { label: t('meta.team'), value: meta.team },
    { label: t('meta.stack'), value: stack.join(' · ') },
    ...(meta.privateCode
      ? [{ label: t('meta.code'), value: t('meta.private'), note: meta.privateCode }]
      : []),
  ]
})
</script>

<template>
  <section class="head fond-violet" :aria-labelledby="titleId">
    <div class="container inner">
      <div class="intro">
        <div v-reveal class="tags">
          <BaseTag v-for="tag in project.tags" :key="tag">{{ tag }}</BaseTag>
        </div>
        <h1 :id="titleId" v-reveal class="display">{{ project.title }}</h1>
        <p v-reveal="1" class="lead">{{ project.description }}</p>
        <div v-if="project.links.code || project.links.demo" v-reveal="2" class="links">
          <BaseButton v-if="project.links.code" :href="project.links.code" icon="github">{{
            t('meta.code')
          }}</BaseButton>
          <BaseButton v-if="project.links.demo" :href="project.links.demo" icon="arrow-up-right">{{
            t('case.demo')
          }}</BaseButton>
        </div>
      </div>
      <DefinitionList v-reveal="2" class="fiche" :items="fiche" />
      <DeviceFrame
        v-reveal="3"
        class="shot"
        :device="project.capture.device"
        :src="project.capture.src"
        :label="project.capture.label ?? project.title"
        stage="var(--lime-500)"
      />
    </div>
  </section>
</template>

<style scoped>
.head {
  padding: calc(var(--header-height) + var(--space-8)) var(--gutter) var(--space-7);
}
.inner {
  display: grid;
  gap: var(--space-7);
}
@media (min-width: 1024px) {
  .inner {
    grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
    align-items: end;
  }
  .shot {
    grid-column: 1 / -1;
  }
}
.intro {
  display: grid;
  gap: var(--space-5);
  justify-items: start;
}
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}
h1 {
  font-size: var(--text-h1);
}
.links {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
}
</style>

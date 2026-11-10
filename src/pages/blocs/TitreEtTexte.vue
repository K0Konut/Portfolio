<script setup lang="ts">
import { useId } from 'vue'
import PageSection from '../../components/mise-en-page/PageSection.vue'

/* Bloc titre et texte (accueil « Qui je suis », À propos « Mon histoire ») : le titre à gauche, le texte
   (HTML de Dashility, déjà filtré) à droite sur bureau, puis ce que la page ajoute dessous (un bouton). */
defineProps<{ title: string; text?: string }>()
const titleId = useId()
</script>

<template>
  <PageSection fond="creme" :labelledby="titleId">
    <div class="split">
      <h2 :id="titleId" v-reveal class="display">{{ title }}</h2>
      <div v-reveal="1" class="text">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-if="text" class="lead prose" v-html="text" />
        <slot />
      </div>
    </div>
  </PageSection>
</template>

<style scoped>
.split {
  display: grid;
  gap: var(--space-6);
}
@media (min-width: 1024px) {
  .split {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.6fr);
    align-items: start;
  }
}
h2 {
  font-size: var(--text-h2);
}
.text {
  display: grid;
  gap: var(--space-6);
  justify-items: start;
}
</style>

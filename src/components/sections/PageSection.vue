<script setup lang="ts">
import { useId } from 'vue'
import type { Fond } from './fonds'

withDefaults(defineProps<{ fond?: Fond; title?: string }>(), { fond: 'nuit', title: undefined })
const titleId = useId()
</script>

<template>
  <!-- Section de page : fond (rôles de couleur), titre h2 et phrase d'introduction facultatifs -->
  <section :class="['section', `fond-${fond}`]" :aria-labelledby="title ? titleId : undefined">
    <div class="inner">
      <div v-if="title" v-reveal class="head">
        <h2 :id="titleId">{{ title }}</h2>
        <p v-if="$slots.intro"><slot name="intro" /></p>
      </div>
      <slot />
    </div>
  </section>
</template>

<style scoped>
.section {
  padding: var(--space-section) var(--gutter);
}
.inner {
  max-width: var(--container);
  margin: 0 auto;
  display: grid;
  gap: var(--space-6);
}
.head {
  display: grid;
  gap: var(--space-3);
}
h2 {
  margin: 0;
  font-family: var(--font-display);
  font-weight: var(--weight-regular);
  font-size: var(--text-h2);
  line-height: var(--leading-display);
}
.head p {
  margin: 0;
  max-width: var(--measure);
  font-size: var(--text-lead);
  line-height: var(--leading-snug);
  color: var(--color-text-muted);
}
</style>

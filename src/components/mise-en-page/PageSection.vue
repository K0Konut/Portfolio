<script setup lang="ts">
import { useId } from 'vue'
import type { Fond } from '../fonds/fonds'

const props = withDefaults(
  defineProps<{
    fond?: Fond
    title?: string
    /** Identifiant du titre, quand la section affiche le sien (« Parlons-en ») */
    labelledby?: string
  }>(),
  { fond: 'nuit', title: undefined, labelledby: undefined },
)
const titleId = useId()
</script>

<template>
  <!-- Section de page : fond (rôles de couleur), titre h2 et phrase d'introduction facultatifs -->
  <section
    :class="['section', `fond-${fond}`]"
    :aria-labelledby="props.title ? titleId : props.labelledby"
  >
    <div class="container inner">
      <div v-if="title" v-reveal class="head">
        <h2 :id="titleId" class="display">{{ title }}</h2>
        <p v-if="$slots.intro" class="lead"><slot name="intro" /></p>
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
  display: grid;
  gap: var(--space-6);
}
.head {
  display: grid;
  gap: var(--space-3);
}
h2 {
  font-size: var(--text-h2);
}
</style>

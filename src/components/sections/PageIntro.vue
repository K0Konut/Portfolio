<script setup lang="ts">
import { useId } from 'vue'
import type { Fond } from './fonds'

withDefaults(defineProps<{ title: string; fond?: Fond; center?: boolean }>(), {
  fond: 'violet',
  center: false,
})
const titleId = useId()
</script>

<template>
  <!-- Haut des pages Projets, À propos, Contact et 404 ; variante centrée pour la 404 seulement -->
  <section :class="['intro', `fond-${fond}`, { center }]" :aria-labelledby="titleId">
    <div class="container inner">
      <h1 :id="titleId" v-reveal class="display">{{ title }}</h1>
      <p v-if="$slots.default" v-reveal="1" class="lead"><slot /></p>
      <div v-if="$slots.actions" v-reveal="2" class="actions"><slot name="actions" /></div>
    </div>
  </section>
</template>

<style scoped>
.intro {
  padding: calc(var(--header-height) + var(--space-8)) var(--gutter) var(--space-8);
}
.inner {
  display: grid;
  gap: var(--space-4);
  justify-items: start;
}
.center .inner {
  justify-items: center;
  text-align: center;
}
h1 {
  font-size: var(--text-h1);
}
.actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
}
</style>

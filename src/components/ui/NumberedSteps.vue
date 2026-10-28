<script setup lang="ts">
/* Étapes détaillées, numérotées (design system § NumberedSteps) : le numéro en grand, reliés par un filet.
   Les étapes apparaissent une à une (v-reveal) ; en mouvement réduit, en fondu. */
defineProps<{ steps: { title: string; text: string }[] }>()
</script>

<template>
  <ol class="numbered">
    <li v-for="(step, k) in steps" :key="k" v-reveal="k">
      <span class="n display" aria-hidden="true">{{ k + 1 }}</span>
      <div>
        <b>{{ step.title }}</b>
        <p>{{ step.text }}</p>
      </div>
    </li>
  </ol>
</template>

<style scoped>
.numbered {
  position: relative;
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: var(--space-5);
  max-width: 46rem;
}
/* Le filet passe derrière les numéros, qui le masquent de leur fond */
.numbered::before {
  content: '';
  position: absolute;
  left: 1.75rem;
  top: var(--space-4);
  bottom: var(--space-4);
  width: var(--border-thin);
  background: var(--color-border);
}
li {
  position: relative;
  display: grid;
  grid-template-columns: 3.5rem minmax(0, 1fr);
  gap: var(--space-4);
  align-items: start;
}
.n {
  font-size: var(--text-h3);
  line-height: var(--leading-none);
  color: var(--color-block);
  background: var(--color-bg);
  text-align: center;
  padding-block: var(--space-1);
}
b {
  display: block;
  font-size: var(--text-lead);
  line-height: var(--leading-snug);
}
p {
  margin: var(--space-1) 0 0;
  color: var(--color-text-muted);
  max-width: var(--measure);
}
</style>

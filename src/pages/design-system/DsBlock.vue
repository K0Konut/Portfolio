<script setup lang="ts">
defineProps<{ title: string; intro?: string }>()
</script>

<template>
  <section class="ds-block" :aria-label="title">
    <h2>{{ title }}</h2>
    <p v-if="intro" class="intro">{{ intro }}</p>
    <slot />
  </section>
</template>

<style scoped>
.ds-block {
  display: grid;
  gap: var(--space-5);
}
h2 {
  margin: 0;
  font-family: var(--font-display);
  font-weight: var(--weight-regular);
  font-size: var(--text-h2);
  line-height: var(--leading-display);
}
.intro {
  margin: 0;
  max-width: var(--measure);
  color: var(--color-text-muted);
}
</style>

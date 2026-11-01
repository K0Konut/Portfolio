<script setup lang="ts">
// Texte du catalogue : ce qui est entre accents graves s'affiche en code
defineProps<{ text: string }>()
</script>

<template>
  <template v-for="(part, i) in text.split('`')" :key="i">
    <code v-if="i % 2">{{ part }}</code>
    <template v-else>{{ part }}</template>
  </template>
</template>

<style scoped>
code {
  font-size: 0.9em;
  color: var(--color-text);
}
</style>

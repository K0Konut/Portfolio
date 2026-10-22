<script setup lang="ts">
import DsBlock from './DsBlock.vue'

const BASE = [
  'violet-500',
  'violet-700',
  'lime-500',
  'pink-500',
  'neutral-50',
  'neutral-100',
  'neutral-400',
  'neutral-700',
  'neutral-850',
  'neutral-900',
  'neutral-950',
]
</script>

<template>
  <DsBlock
    title="Couleurs de base"
    intro="Les teintes ; les composants passent toujours par les rôles."
  >
    <ul class="swatches">
      <li v-for="name in BASE" :key="name">
        <span class="chip" :style="{ background: `var(--${name})` }" />
        <code>--{{ name }}</code>
      </li>
    </ul>
  </DsBlock>
</template>

<style scoped>
.swatches {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(9rem, 1fr));
  gap: var(--space-4);
}
li {
  display: grid;
  gap: var(--space-2);
}
.chip {
  height: var(--space-8);
  border-radius: var(--radius-sm);
  border: var(--border-thin) solid var(--color-border);
}
code {
  font-size: var(--text-sm);
  color: var(--color-text-subtle);
}
</style>

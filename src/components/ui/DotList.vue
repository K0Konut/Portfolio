<script setup lang="ts">
/* Liste courte à pastilles (design system § DotList) ; la pastille d'une ligne mise en avant (.skill-dot.on,
   base.css) porte une information : la page affiche une légende. */
defineProps<{ items: { name: string; highlight?: boolean }[] }>()
</script>

<template>
  <ul class="dot-list">
    <li v-for="item in items" :key="item.name">
      <i :class="['skill-dot', { on: item.highlight }]" aria-hidden="true" />{{ item.name }}
    </li>
  </ul>
</template>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: var(--space-2);
}
li {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-weight: var(--weight-bold);
}
</style>

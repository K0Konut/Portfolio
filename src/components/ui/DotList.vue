<script setup lang="ts">
/* Liste courte à pastilles (design system § DotList) : grise, ou violet vif cernée de crème quand la ligne
   est mise en avant. La couleur porte une information : la page affiche une légende. */
defineProps<{ items: { name: string; highlight?: boolean }[] }>()
</script>

<template>
  <ul class="dot-list">
    <li v-for="item in items" :key="item.name" :class="{ highlight: item.highlight }">
      {{ item.name }}
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
li::before {
  content: '';
  flex: none;
  width: var(--skill-dot);
  height: var(--skill-dot);
  border-radius: var(--radius-pill);
  background: var(--neutral-700);
}
li.highlight::before {
  background: var(--violet-500);
  box-shadow: 0 0 0 var(--underline) var(--neutral-50);
}
</style>

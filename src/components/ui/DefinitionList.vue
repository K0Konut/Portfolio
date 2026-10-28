<script setup lang="ts">
/* Fiche d'informations (design system § DefinitionList) : une ligne par information, libellé à gauche,
   valeur en gras à droite, et en dessous une précision facultative. */
defineProps<{ items: { label: string; value: string; note?: string }[] }>()
</script>

<template>
  <dl class="fiche">
    <div v-for="item in items" :key="item.label">
      <dt>{{ item.label }}</dt>
      <dd>
        {{ item.value }}<span v-if="item.note" class="note">{{ item.note }}</span>
      </dd>
    </div>
  </dl>
</template>

<style scoped>
.fiche {
  margin: 0;
  width: 100%;
  border-top: var(--border-thin) solid var(--color-border);
}
.fiche > div {
  display: grid;
  grid-template-columns: 6rem minmax(0, 1fr);
  gap: var(--space-4);
  padding: var(--space-3) 0;
  border-bottom: var(--border-thin) solid var(--color-border);
}
dt {
  padding-top: 2px;
  font-size: var(--text-sm);
  color: var(--color-text-subtle);
}
dd {
  margin: 0;
  font-weight: var(--weight-bold);
  line-height: var(--leading-snug);
}
.note {
  display: block;
  font-size: var(--text-sm);
  font-weight: var(--weight-regular);
  color: var(--color-text-muted);
}
</style>

<script setup lang="ts">
import BaseIcon from '../../components/ui/BaseIcon.vue'
import { ICONS, type IconName } from '../../components/ui/icons'
import DsBlock from './DsBlock.vue'

// Toutes les icônes de la V1, avec leur nom (design system § BaseIcon)
const NAMES = Object.keys(ICONS) as IconName[]
</script>

<template>
  <DsBlock title="Icônes" intro="Lucide, contour épais et arrondi ; le nom à passer à BaseIcon.">
    <ul>
      <li v-for="n in NAMES" :key="n">
        <BaseIcon :name="n" size="md" />
        <code>{{ n }}</code>
      </li>
    </ul>
  </DsBlock>
</template>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(8rem, 1fr));
  gap: var(--space-4);
}
li {
  display: grid;
  justify-items: center;
  gap: var(--space-2);
  padding: var(--space-4);
  border: var(--border-thin) solid var(--color-border);
  border-radius: var(--radius-md);
}
code {
  font-size: var(--text-sm);
  color: var(--color-text-subtle);
}
</style>

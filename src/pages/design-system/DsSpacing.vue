<script setup lang="ts">
import DsBlock from './DsBlock.vue'

const SPACES = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => `space-${n}`)
const RADII = ['radius-sm', 'radius-md', 'radius-lg', 'radius-pill']
</script>

<template>
  <DsBlock title="Espaces et rayons">
    <ul class="spaces">
      <li v-for="s in SPACES" :key="s">
        <code>--{{ s }}</code>
        <span class="bar" :style="{ width: `var(--${s})` }" />
      </li>
    </ul>
    <ul class="radii">
      <li v-for="r in RADII" :key="r">
        <span class="box" :style="{ borderRadius: `var(--${r})` }" />
        <code>--{{ r }}</code>
      </li>
    </ul>
  </DsBlock>
</template>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.spaces {
  display: grid;
  gap: var(--space-2);
}
.spaces li {
  display: grid;
  grid-template-columns: 7rem 1fr;
  align-items: center;
  gap: var(--space-4);
}
.bar {
  height: var(--space-3);
  background: var(--color-block);
  border-radius: 2px;
}
.radii {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-5);
}
.radii li {
  display: grid;
  gap: var(--space-2);
  justify-items: center;
}
.box {
  width: var(--space-9);
  height: var(--space-8);
  background: var(--color-surface);
  border: var(--border-strong) solid var(--color-border);
}
code {
  font-size: var(--text-sm);
  color: var(--color-text-subtle);
}
</style>

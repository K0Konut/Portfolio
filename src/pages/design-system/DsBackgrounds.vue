<script setup lang="ts">
import DsBlock from './DsBlock.vue'

const FONDS = [
  { cls: 'fond-nuit', name: 'Nuit', use: 'Fond du site, lecture longue' },
  { cls: 'fond-violet', name: 'Violet', use: "L'affiche : section d'accueil" },
  { cls: 'fond-vif', name: 'Violet vif', use: 'Sections courtes' },
  { cls: 'fond-lime', name: 'Lime', use: 'Section vive' },
  { cls: 'fond-rose', name: 'Rose', use: 'Section vive' },
  { cls: 'fond-creme', name: 'Crème', use: 'Respiration claire' },
]
</script>

<template>
  <DsBlock
    title="Fonds de section"
    intro="Chaque fond réaffecte les rôles : texte, action, mise en valeur et détail restent lisibles sans variante de composant."
  >
    <div class="fonds">
      <div v-for="f in FONDS" :key="f.cls" :class="['fond', f.cls]">
        <p class="name">{{ f.name }}</p>
        <p class="use">{{ f.use }}</p>
        <p class="sample">
          Texte, <span class="muted">discret</span>, <span class="subtle">très discret</span> et une
          <span class="hl">mise en valeur.</span>
        </p>
        <div class="row">
          <span class="action">Action</span>
          <span class="detail">étiquette</span>
        </div>
      </div>
    </div>
  </DsBlock>
</template>

<style scoped>
.fonds {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(17rem, 1fr));
  gap: var(--space-4);
}
.fond {
  display: grid;
  gap: var(--space-3);
  align-content: start;
  padding: var(--space-5);
  border-radius: var(--radius-md);
  border: var(--border-thin) solid var(--color-border);
}
p {
  margin: 0;
}
.name {
  font-family: var(--font-display);
  font-size: var(--text-h3);
  line-height: var(--leading-display);
}
.use,
.subtle {
  color: var(--color-text-subtle);
}
.use {
  font-size: var(--text-sm);
}
.muted {
  color: var(--color-text-muted);
}
.row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  align-items: center;
}
.action {
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-pill);
  background: var(--color-action);
  color: var(--color-on-action);
  font-weight: var(--weight-bold);
  font-size: var(--text-sm);
}
.detail {
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-pill);
  border: var(--border-strong) solid var(--color-detail);
  color: var(--color-detail);
  background: color-mix(in srgb, var(--color-detail) var(--tag-tint), transparent);
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
}
</style>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

/* Résultat chiffré (design system § StatBlock) : le chiffre en grand, son libellé ; avec `before` et `after`,
   deux barres proportionnelles qui se remplissent une fois à l'arrivée à l'écran (v-reveal), l'« après »
   --stagger-bar après l'« avant ». Pas de compteur qui défile. Les barres sont décoratives : tout est dans le texte. */
const props = defineProps<{
  value: string
  label: string
  before?: number
  after?: number
  /** Rang, pour le décalage d'apparition */
  index?: number
}>()
const { t } = useI18n()

const bars = computed(() => {
  const { before, after } = props
  if (before === undefined || after === undefined) return []
  const max = Math.max(before, after) || 1
  return [
    { key: 'before', label: t('stat.before'), value: before, width: before / max },
    { key: 'after', label: t('stat.after'), value: after, width: after / max },
  ]
})
</script>

<template>
  <div v-reveal="index" class="stat">
    <span class="value display">{{ value }}</span>
    <span class="label">{{ label }}</span>
    <div v-if="bars.length" class="bars">
      <div v-for="bar in bars" :key="bar.key" :class="['bar', bar.key]">
        <span>{{ bar.label }}</span>
        <i :style="{ '--w': bar.width }" aria-hidden="true" />
        <span>{{ bar.value }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.stat {
  display: grid;
  gap: var(--space-2);
  align-content: start;
}
.value {
  font-size: var(--text-h1);
  line-height: var(--leading-none);
}
.label {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
}
/* Une seule grille pour les deux lignes : les barres partent du même point, quelle que soit la longueur des valeurs */
.bars {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: var(--space-2) var(--space-3);
  margin-top: var(--space-2);
  font-size: var(--text-sm);
  color: var(--color-text-muted);
}
.bar {
  display: contents;
}
.bar i {
  display: block;
  width: calc(var(--w) * 100%);
  height: var(--stat-bar);
  border-radius: var(--radius-pill);
  background: var(--color-border);
  transform-origin: left;
  transition: transform var(--duration-bar) var(--ease-out);
}
.bar.after i {
  background: var(--color-highlight);
  transition-delay: var(--stagger-bar);
}
.stat.is-pending .bar i {
  transform: scaleX(0);
}
/* Animations réduites : barres déjà remplies */
@media (prefers-reduced-motion: reduce) {
  .stat.is-pending .bar i {
    transform: none;
  }
}
</style>

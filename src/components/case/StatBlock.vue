<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Stat } from '../../content/types'

/* Résultat chiffré (design system § StatBlock) : le chiffre en grand, son libellé ; pour un avant / après,
   deux barres proportionnelles qui se remplissent une fois à l'arrivée à l'écran (v-reveal), l'« après »
   150 ms après l'« avant ». Pas de compteur qui défile. Les barres sont décoratives : tout est dans le texte. */
const props = defineProps<{ stat: Stat; index?: number }>()
const { t } = useI18n()

const bars = computed(() => {
  const compare = props.stat.compare
  if (!compare) return []
  const max = Math.max(compare.before, compare.after) || 1
  return [
    { key: 'before', label: t('stat.before'), value: compare.before, width: compare.before / max },
    { key: 'after', label: t('stat.after'), value: compare.after, width: compare.after / max },
  ]
})
</script>

<template>
  <div v-reveal="index" class="stat">
    <span class="value display">{{ stat.value }}</span>
    <span class="label">{{ stat.label }}</span>
    <div v-if="bars.length" class="bars" aria-hidden="true">
      <div v-for="bar in bars" :key="bar.key" :class="['bar', bar.key]">
        <span>{{ bar.label }}</span>
        <i :style="{ '--w': bar.width }" />
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
.bars {
  display: grid;
  gap: var(--space-2);
  margin-top: var(--space-2);
}
.bar {
  display: grid;
  grid-template-columns: 3.5rem minmax(0, 1fr) 1.5rem;
  align-items: center;
  gap: var(--space-3);
  font-size: var(--text-sm);
  color: var(--color-text-muted);
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
  transition-delay: 150ms;
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

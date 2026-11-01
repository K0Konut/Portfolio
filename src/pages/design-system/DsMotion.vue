<script setup lang="ts">
import DsBlock from './DsBlock.vue'

const MOTION = [
  { token: 'ease-out', use: 'Toutes les animations (sensation fluide)' },
  { token: 'duration-fast', use: 'Survol, clic' },
  { token: 'duration-base', use: 'Apparitions' },
  { token: 'duration-reduced', use: 'Fondus quand les animations sont réduites' },
  { token: 'stagger-block', use: 'Blocs successifs' },
  { token: 'card-lift', use: 'Carte qui se soulève au survol' },
  { token: 'reveal-distance', use: 'Montée d’un bloc qui apparaît' },
]
</script>

<template>
  <DsBlock title="Mouvement">
    <p class="hint">
      Survolez la carte : elle se soulève de <code>--card-lift</code> en
      <code>--duration-fast</code>. Avec « réduire les animations », elle ne bouge plus.
    </p>
    <div class="demo" tabindex="0">Carte de démonstration</div>
    <dl class="tokens">
      <div v-for="m in MOTION" :key="m.token">
        <dt>
          <code>--{{ m.token }}</code>
        </dt>
        <dd>{{ m.use }}</dd>
      </div>
    </dl>
  </DsBlock>
</template>

<style scoped>
.hint {
  margin: 0;
  max-width: var(--measure);
  color: var(--color-text-muted);
}
.demo {
  width: min(100%, 20rem);
  padding: var(--space-6) var(--space-5);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  font-weight: var(--weight-bold);
  transition:
    transform var(--duration-fast) var(--ease-out),
    background-color var(--duration-fast) var(--ease-out);
}
.demo:hover,
.demo:focus-visible {
  transform: translateY(calc(-1 * var(--card-lift)));
  background: var(--color-surface-hover);
}
.tokens {
  margin: 0;
  display: grid;
}
.tokens div {
  display: grid;
  grid-template-columns: 12rem 1fr;
  gap: var(--space-4);
  padding: var(--space-3) 0;
  border-top: var(--border-thin) solid var(--color-border);
}
dd {
  margin: 0;
  color: var(--color-text-muted);
}
code {
  font-size: var(--text-sm);
  color: var(--color-text-subtle);
}
</style>

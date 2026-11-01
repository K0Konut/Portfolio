<script setup lang="ts">
import DsBlock from './DsBlock.vue'

const SCALE = [
  { token: 'text-h1', font: 'display', sample: 'Ma façon de travailler' },
  { token: 'text-h2', font: 'display', sample: 'Parlons-en' },
  { token: 'text-h3', font: 'display', sample: 'Chrono caisses à savon' },
  {
    token: 'text-lead',
    font: 'body',
    sample: 'Créatif dans l’interface, rigoureux dans la méthode.',
  },
  {
    token: 'text-body',
    font: 'body',
    sample: 'Chaque projet passe par les mêmes étapes, du besoin jusqu’à la mise en ligne.',
  },
  { token: 'text-sm', font: 'body', sample: 'Vue 3 · TypeScript · Vite · Docker' },
]
</script>

<template>
  <DsBlock
    title="Typographie"
    intro="Bagel Fat One pour les grands titres, Manrope pour le texte et l’interface, Fraunces italique pour la mise en valeur."
  >
    <ul class="scale">
      <li v-for="s in SCALE" :key="s.token">
        <code>--{{ s.token }}</code>
        <span :style="{ fontSize: `var(--${s.token})`, fontFamily: `var(--font-${s.font})` }">{{
          s.sample
        }}</span>
      </li>
      <li>
        <code>.hl</code>
        <span class="lead"
          >Partir d’une idée et la voir devenir un produit,
          <span class="hl">brique par brique.</span></span
        >
      </li>
    </ul>
  </DsBlock>
</template>

<style scoped>
.scale {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
}
li {
  display: grid;
  gap: var(--space-2);
  padding: var(--space-4) 0;
  border-top: var(--border-thin) solid var(--color-border);
  line-height: var(--leading-snug);
}
code {
  font-size: var(--text-sm);
  color: var(--color-text-subtle);
}
.lead {
  font-size: var(--text-lead);
}
</style>

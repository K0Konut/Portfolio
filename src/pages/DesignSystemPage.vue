<script setup lang="ts">
import { useHead } from '@unhead/vue'
import DsBackgrounds from './design-system/DsBackgrounds.vue'
import DsColors from './design-system/DsColors.vue'
import DsComponentsBase from './design-system/DsComponentsBase.vue'
import DsComponentsHome from './design-system/DsComponentsHome.vue'
import DsComponentsProjects from './design-system/DsComponentsProjects.vue'
import DsComponentsLayout from './design-system/DsComponentsLayout.vue'
import DsMotion from './design-system/DsMotion.vue'
import DsSpacing from './design-system/DsSpacing.vue'
import DsTypography from './design-system/DsTypography.vue'

// Vitrine du design system v1.1, en développement seulement (architecture technique §11)
useHead({ title: 'Design system · Costa Maskulov', meta: [{ name: 'robots', content: 'noindex' }] })
</script>

<template>
  <main id="contenu" tabindex="-1">
    <div class="ds">
      <header class="ds-head">
        <h1>Design system</h1>
        <p>
          Tokens et composants du portfolio, avec leurs états réels. Référence :
          <code>docs/05-design-system.md</code> v1.1 et les maquettes de
          <code>docs/06-maquettes/</code>.
        </p>
      </header>
      <DsColors />
      <DsBackgrounds />
      <DsTypography />
      <DsSpacing />
      <DsMotion />
      <DsComponentsBase />
    </div>
    <DsComponentsLayout />
    <DsComponentsHome />
    <DsComponentsProjects />
  </main>
</template>

<style scoped>
.ds {
  max-width: var(--container);
  margin: 0 auto;
  padding: calc(var(--header-height) + var(--space-8)) var(--gutter) var(--space-9);
  display: grid;
  gap: var(--space-9);
}
.ds-head {
  display: grid;
  gap: var(--space-4);
}
.ds-head h1 {
  margin: 0;
  font-family: var(--font-display);
  font-weight: var(--weight-regular);
  font-size: var(--text-h1);
  line-height: var(--leading-display);
}
.ds-head p {
  margin: 0;
  max-width: var(--measure);
  font-size: var(--text-lead);
  line-height: var(--leading-snug);
  color: var(--color-text-muted);
}
code {
  font-size: 0.85em;
  color: var(--color-text-subtle);
}
</style>

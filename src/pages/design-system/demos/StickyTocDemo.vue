<script setup lang="ts">
import { computed } from 'vue'
import StickyToc from '../../../components/ui/StickyToc.vue'

// Le sommaire suit des blocs de la page : de quoi faire défiler dans le cadre (bureau seulement)
const props = defineProps<{ count?: number }>()
const NAMES = ['Contexte', 'Besoin', 'Contraintes', 'Méthode', 'Choix techniques', 'Résultats']
const items = computed(() =>
  NAMES.slice(0, props.count ?? 3).map((label, i) => ({ id: `ds-toc-${i}`, label })),
)
</script>

<template>
  <div class="demo">
    <StickyToc :items="items" />
    <div>
      <section v-for="item in items" :id="item.id" :key="item.id" class="block">
        <h2 class="display">{{ item.label }}</h2>
        <p>Faites défiler : le sommaire suit le bloc en cours. Sous 1024 px, il disparaît.</p>
      </section>
    </div>
  </div>
</template>

<style scoped>
.demo {
  display: grid;
  gap: var(--space-7);
}
@media (min-width: 1024px) {
  .demo {
    grid-template-columns: var(--toc-width) minmax(0, 1fr);
    align-items: start;
  }
}
.block {
  min-height: 80vh;
}
h2 {
  font-size: var(--text-h2);
}
p {
  color: var(--color-text-muted);
}
</style>

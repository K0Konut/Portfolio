<script setup lang="ts">
import type { VNode } from 'vue'
import { slotChildren } from '../../composables/slotChildren'

/* Grille « affiches collées » (DA §5, design system § PosterGrid) : une colonne sur mobile, deux à partir de
   768 px, `columns` sur bureau, où chaque enfant reçoit une inclinaison (--tilt, multiple de --poster-tilt,
   nulle en mouvement réduit) et un décalage selon sa place. Les enfants deviennent des affiches (.poster) :
   ils se soulèvent et se redressent au survol, et se posent un à un à l'arrivée à l'écran. Chaque enfant
   doit n'avoir qu'une racine, qui reçoit la classe. */
withDefaults(defineProps<{ columns?: 3 | 5 }>(), { columns: 3 })
const slots = defineSlots<{ default(): VNode[] }>()
</script>

<template>
  <ul :class="['poster-grid', `cols-${columns}`]">
    <!-- Clé par place : les clés des enfants peuvent se répéter d'un fragment à l'autre -->
    <li v-for="(child, i) in slotChildren(slots.default?.())" :key="i" v-reveal="i">
      <!-- Une PosterCard :lift="false" reste immobile -->
      <component :is="child" :class="{ poster: child.props?.lift !== false }" />
    </li>
  </ul>
</template>

<style scoped>
.poster-grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: var(--space-5);
}
li {
  display: grid;
}
/* Appui : la carte redescend à mi-hauteur */
li > :deep(.poster:active) {
  transform: translateY(calc(-1 * var(--card-lift) / 2)) rotate(0deg);
  transition-duration: var(--duration-press);
}
@media (min-width: 768px) {
  .poster-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media (min-width: 1024px) {
  .poster-grid {
    align-items: start;
  }
  .cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  .cols-3 > li:nth-child(3n + 1) {
    margin-top: var(--space-5);
    --tilt: var(--poster-tilt);
  }
  .cols-3 > li:nth-child(3n + 2) {
    margin-top: var(--space-8);
    --tilt: calc(var(--poster-tilt) * -0.75);
  }
  .cols-3 > li:nth-child(3n) {
    --tilt: calc(var(--poster-tilt) * 0.5);
  }
  .cols-5 {
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: var(--space-4);
  }
  .cols-5 > li:nth-child(even) {
    margin-top: var(--space-7);
  }
  .cols-5 > li:nth-child(5n + 1) {
    --tilt: var(--poster-tilt);
  }
  .cols-5 > li:nth-child(5n + 2) {
    --tilt: calc(var(--poster-tilt) * -0.75);
  }
  .cols-5 > li:nth-child(5n + 3) {
    --tilt: calc(var(--poster-tilt) * 0.5);
  }
  .cols-5 > li:nth-child(5n + 4) {
    --tilt: calc(var(--poster-tilt) * -1);
  }
  .cols-5 > li:nth-child(5n + 5) {
    --tilt: calc(var(--poster-tilt) * 0.75);
  }
}
</style>

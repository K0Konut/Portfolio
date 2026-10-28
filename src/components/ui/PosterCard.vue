<script setup lang="ts">
import type { Fond } from '../sections/fonds'

/* Carte « affiche » (DA §5, design system § PosterCard) : la surface d'un fond posée sur une autre,
   inclinée sur bureau de `tilt` × --poster-tilt, qui se soulève et se redresse au survol (`lift`).
   Une grille (PosterGrid) peut poser --tilt elle-même : la carte ne l'écrase que si `tilt` est donné. */
withDefaults(defineProps<{ fond?: Fond; tilt?: number; lift?: boolean; as?: string }>(), {
  fond: 'nuit',
  tilt: 0,
  lift: true,
  as: 'div',
})
</script>

<template>
  <component
    :is="as"
    :class="['poster-card', `fond-${fond}`, { poster: lift, tilted: tilt }]"
    :style="tilt ? { '--card-tilt': tilt } : undefined"
  >
    <slot />
  </component>
</template>

<style scoped>
/* Marges en part de la largeur du bloc qui contient la carte (sa cellule de grille, ou sa colonne) :
   serrées dans une grille de cinq, larges pour une carte seule */
.poster-card {
  padding: clamp(var(--space-5), 8%, var(--space-7));
  border-radius: var(--radius-md);
}
.poster-card:not(.poster) {
  transform: rotate(var(--tilt, 0deg));
}
@media (min-width: 1024px) {
  .tilted {
    --tilt: calc(var(--poster-tilt) * var(--card-tilt));
  }
}
</style>

<script setup lang="ts">
import { computed } from 'vue'
import { useViewportWidth } from '../../composables/useViewportWidth'
import type { Fond } from './fonds'
import { REFERENCE_WIDTH, wavePath } from './wave'

const props = defineProps<{
  seed: number
  from: Fond
  to: Fond
  /** Le dessus de la vague reste transparent : le fond animé de la section du dessus s'y prolonge */
  transparent?: boolean
}>()

// Rendu de référence à 1440 px dans le HTML, puis tracé à la largeur réelle (pas de déformation).
// La hauteur reste celle de la référence : la vague, plus douce sur mobile, n'y fait pas sauter la page.
const viewport = useViewportWidth()
const reference = computed(() => wavePath(props.seed, REFERENCE_WIDTH))
const wave = computed(() =>
  viewport.value ? wavePath(props.seed, viewport.value) : reference.value,
)
</script>

<template>
  <!-- Décorative et immobile : la vague de la section précédente descend sur le fond de la suivante -->
  <div :class="['wave', { [`fond-${to}`]: !transparent }]" aria-hidden="true">
    <svg
      :viewBox="`0 0 ${wave.width} ${reference.height}`"
      :height="reference.height"
      preserveAspectRatio="none"
    >
      <!-- Transparente : seul le dessous est dessiné (le rectangle moins le dessus de la vague) -->
      <path
        v-if="transparent"
        :class="`fond-${to}`"
        fill-rule="evenodd"
        :d="`M0,0H${wave.width}V${reference.height}H0Z${wave.d}`"
      />
      <!-- Le dessus déborde de 2 px sur la section du dessus, de la même couleur : à 125 ou 150 % de zoom,
           la jonction tombe entre deux pixels et le fond de la vague y faisait un liseré -->
      <path v-else :class="`fond-${from}`" :d="`M0,-2H${wave.width}V1H0Z${wave.d}`" />
    </svg>
  </div>
</template>

<style scoped>
.wave {
  line-height: 0;
  /* La section suivante recouvre le dernier pixel, de la même couleur : pas de liseré à la jonction */
  margin-bottom: -1px;
}
svg {
  display: block;
  width: 100%;
  overflow: visible;
}
/* La classe fond-* du tracé ne sert qu'à lui donner sa couleur de fond */
path {
  fill: var(--color-bg);
}
</style>

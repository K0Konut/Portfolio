<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

/* Indicateur de scroll (design system § ScrollHint) : un trait discret, en bas de la section qui le contient.
   Il apparaît après `delay`, son repère fait `passes` allers puis s'immobilise (jamais de boucle, WCAG 2.2.2),
   et il s'efface au premier défilement. Le mouvement est en CSS : il ne dépend d'aucun script. */
withDefaults(
  defineProps<{
    /** Délai avant l'apparition (s) */
    delay?: number
    /** Nombre d'allers du repère */
    passes?: number
  }>(),
  { delay: 1.5, passes: 2 },
)

// S'efface au premier défilement compté depuis son affichage, puis n'écoute plus
const gone = ref(false)
let from = 0
const leave = () => {
  if (Math.abs(scrollY - from) <= 10) return
  gone.value = true
  removeEventListener('scroll', leave)
}
onMounted(() => {
  from = scrollY
  addEventListener('scroll', leave, { passive: true })
})
onBeforeUnmount(() => removeEventListener('scroll', leave))
</script>

<template>
  <div
    :class="['hint', { gone }]"
    :style="{ '--delay': `${delay}s`, '--passes': passes }"
    aria-hidden="true"
  >
    <i class="segment" />
  </div>
</template>

<style scoped>
.hint {
  position: absolute;
  z-index: 1;
  left: 50%;
  bottom: calc(var(--space-6) + env(safe-area-inset-bottom, 0px));
  width: var(--border-strong);
  height: var(--hint-height);
  background: color-mix(in srgb, var(--color-text-muted) 45%, transparent);
  overflow: hidden;
  animation: hint-in var(--duration-reduced) var(--ease-out) var(--delay) backwards;
  transition: opacity var(--duration-reduced) var(--ease-out);
}
.gone {
  opacity: 0;
}
.segment {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: var(--hint-travel);
  background: var(--color-highlight);
  animation: hint-pass var(--duration-hint) ease-in-out calc(var(--delay) + 0.1s) var(--passes);
}
@keyframes hint-in {
  from {
    opacity: 0;
  }
}
/* Un aller : le repère apparaît, descend la piste, puis s'efface ; à la fin, il revient en haut, immobile */
@keyframes hint-pass {
  0% {
    opacity: 0;
    translate: 0 calc(-1 * var(--hint-travel));
  }
  20% {
    opacity: 1;
    translate: 0 calc(-1 * var(--hint-travel));
  }
  87% {
    opacity: 1;
    translate: 0 calc(var(--hint-height) - var(--hint-travel));
  }
  100% {
    opacity: 0;
    translate: 0 calc(var(--hint-height) - var(--hint-travel));
  }
}
@media (prefers-reduced-motion: reduce) {
  .segment {
    animation: none;
  }
}
</style>

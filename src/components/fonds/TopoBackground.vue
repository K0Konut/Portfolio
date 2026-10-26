<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { startTopography } from '../../composables/useTopography'

/* Courbes de niveau qui ondulent lentement derrière une section (design system § TopoBackground), démarrées
   quand la page est au repos (hors chemin critique). Les valeurs par défaut donnent le rendu de l'accueil. */
const props = withDefaults(
  defineProps<{
    /** Tokens de couleur des creux, des pentes et des hauteurs */
    from?: string
    via?: string
    to?: string
    speed?: number
    density?: number
    fade?: boolean
  }>(),
  { from: 'violet-500', via: 'topo-via', to: 'pink-500', speed: 1, density: 1.4, fade: true },
)

const box = ref<HTMLElement>()
const on = ref(false)
let stop: (() => void) | undefined
let idle = 0
let started = false

// Les réglages sont passés tels quels : la vitesse est relue à chaque image
function start() {
  started = true
  stop?.()
  stop = box.value ? startTopography(box.value, props) : undefined
  on.value = !!stop
}

onMounted(() => {
  idle =
    'requestIdleCallback' in window
      ? requestIdleCallback(start, { timeout: 1000 })
      : setTimeout(start, 200)
})
// Teintes, densité ou estompe changent (catalogue) : le shader est recompilé ; la vitesse, elle, suit seule
watch(
  () => [props.from, props.via, props.to, props.density, props.fade],
  () => started && start(),
)
onBeforeUnmount(() => {
  if ('cancelIdleCallback' in window) cancelIdleCallback(idle)
  clearTimeout(idle)
  stop?.()
})
</script>

<template>
  <div ref="box" :class="['topo', { on }]" aria-hidden="true" />
</template>

<style scoped>
.topo {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  opacity: 0;
  transition: opacity 1.2s var(--ease-out);
}
.on {
  opacity: 1;
}
.topo :deep(canvas) {
  display: block;
  width: 100%;
  height: 100%;
}
</style>

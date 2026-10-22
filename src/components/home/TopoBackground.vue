<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { startTopography } from '../../composables/useTopography'

// Courbes de niveau derrière la section d'accueil, démarrées quand la page est au repos (hors chemin critique)
const box = ref<HTMLElement>()
const on = ref(false)
let stop: (() => void) | undefined
let idle = 0

onMounted(() => {
  const start = () => {
    if (!box.value) return
    stop = startTopography(box.value)
    on.value = !!stop
  }
  idle =
    'requestIdleCallback' in window
      ? requestIdleCallback(start, { timeout: 1000 })
      : setTimeout(start, 200)
})
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

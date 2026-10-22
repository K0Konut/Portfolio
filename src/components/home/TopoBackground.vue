<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { startTopography } from '../../composables/useTopography'

// Courbes de niveau derrière la section d'accueil, démarrées après le premier affichage
const box = ref<HTMLElement>()
const on = ref(false)
let stop: (() => void) | undefined

onMounted(() => {
  if (!box.value) return
  stop = startTopography(box.value)
  on.value = !!stop
})
onBeforeUnmount(() => stop?.())
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

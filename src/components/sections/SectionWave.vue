<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { FOND_COLORS, type Fond } from './fonds'
import { REFERENCE_WIDTH, wavePath } from './wave'

const props = defineProps<{ seed: number; from: Fond; to: Fond }>()

// Rendu de référence à 1440 px dans le HTML, puis recalcul à la largeur réelle (pas de déformation)
const width = ref(REFERENCE_WIDTH)
const wave = computed(() => wavePath(props.seed, width.value))
const root = ref<HTMLElement>()
let resize: ResizeObserver | undefined

onMounted(() => {
  if (!root.value) return
  width.value = root.value.clientWidth
  resize = new ResizeObserver(([entry]) => {
    if (entry) width.value = entry.contentRect.width
  })
  resize.observe(root.value)
})
onBeforeUnmount(() => resize?.disconnect())
</script>

<template>
  <!-- Décorative et immobile : la vague de la section précédente descend sur le fond de la suivante -->
  <div
    ref="root"
    class="wave"
    :style="{ '--prev': FOND_COLORS[from], '--next': FOND_COLORS[to] }"
    aria-hidden="true"
  >
    <svg
      :viewBox="`0 0 ${Math.round(width)} ${wave.height}`"
      :height="wave.height"
      preserveAspectRatio="none"
    >
      <path :d="wave.d" />
    </svg>
  </div>
</template>

<style scoped>
.wave {
  line-height: 0;
  background: var(--next);
  color: var(--prev);
}
svg {
  display: block;
  width: 100%;
  fill: currentColor;
}
</style>

<script setup lang="ts">
import { ref } from 'vue'
import DragToSnap from '../../../components/animations/DragToSnap.vue'

// Une cible et un élément à y glisser ; la démo montre les événements near et snap
defineProps<{ reach?: number }>()
const target = ref<HTMLElement>()
const near = ref(false)
const snapped = ref(false)
</script>

<template>
  <div class="demo">
    <div ref="target" :class="['target', { near, snapped }]" />
    <DragToSnap
      v-slot="{ placed }"
      :target="target"
      :reach="reach"
      label="Glisser vers la cible"
      @near="near = $event"
      @snap="snapped = true"
    >
      <span :class="['chip', { placed }]" />
    </DragToSnap>
    <p class="state" aria-live="polite">
      {{ snapped ? 'snap : logé' : near ? 'near : à portée' : 'Glissez le carré dans la cible.' }}
    </p>
  </div>
</template>

<style scoped>
.demo {
  display: grid;
  justify-items: center;
  gap: var(--space-7);
}
.target,
.chip {
  width: var(--space-8);
  height: var(--space-8);
  border-radius: var(--radius-sm);
}
.target {
  border: var(--border-strong) dashed var(--color-highlight);
}
.target.near {
  border-style: solid;
}
.chip {
  display: block;
  background: var(--color-text);
  transition: background-color var(--duration-fast) var(--ease-out);
}
.chip.placed {
  background: var(--color-action);
}
.state {
  margin: 0;
  font-size: var(--text-sm);
  color: var(--color-text-subtle);
}
</style>

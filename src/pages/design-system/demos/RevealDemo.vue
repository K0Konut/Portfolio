<script setup lang="ts">
import { onMounted, ref } from 'vue'

/* v-reveal ne cache que ce qui est sous la ligne de flottaison, et l'iframe montre tout : la démo pose
   elle-même les classes de la directive (.reveal, .is-pending) et part de l'état caché à chaque montage. */
withDefaults(defineProps<{ count?: number }>(), { count: 3 })
const pending = ref(true)
onMounted(() => requestAnimationFrame(() => requestAnimationFrame(() => (pending.value = false))))
</script>

<template>
  <div class="blocks">
    <div
      v-for="i in count"
      :key="i"
      :class="['reveal', 'block', { 'is-pending': pending }]"
      :style="{ '--i': i - 1 }"
    >
      Bloc {{ i }}
    </div>
  </div>
</template>

<style scoped>
.blocks {
  display: grid;
  gap: var(--space-4);
}
.block {
  padding: var(--space-5);
  border-radius: var(--radius-md);
  background: var(--color-surface);
}
</style>

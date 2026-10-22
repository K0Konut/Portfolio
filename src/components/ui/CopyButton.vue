<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import BaseIcon from './BaseIcon.vue'

const props = defineProps<{ value: string }>()
const { t } = useI18n()

/** Durée d'affichage de la confirmation (token --feedback-hold) */
const HOLD_MS = 2000

const status = ref<'idle' | 'copied' | 'selected'>('idle')
const address = ref<HTMLElement>()
let timer: ReturnType<typeof setTimeout> | undefined

function settle(next: 'copied' | 'selected') {
  status.value = next
  clearTimeout(timer)
  timer = setTimeout(() => (status.value = 'idle'), HOLD_MS)
}

// Presse-papiers refusé : on sélectionne l'adresse pour une copie au clavier
function selectAddress() {
  if (!address.value) return
  const range = document.createRange()
  range.selectNodeContents(address.value)
  const selection = getSelection()
  selection?.removeAllRanges()
  selection?.addRange(range)
  settle('selected')
}

async function copy() {
  try {
    await navigator.clipboard.writeText(props.value)
    settle('copied')
  } catch {
    selectAddress()
  }
}

onBeforeUnmount(() => clearTimeout(timer))

const labels = { idle: 'ui.copy', copied: 'ui.copied', selected: 'ui.selected' } as const
</script>

<template>
  <div :class="['copy', { done: status === 'copied' }]">
    <span ref="address" class="address">{{ value }}</span>
    <button type="button" @click="copy">
      <span class="swap">
        <BaseIcon name="copy" class="ic-copy" />
        <BaseIcon name="check" class="ic-check" />
      </span>
      <span>{{ t(labels[status]) }}</span>
    </button>
    <span class="sr-only" aria-live="polite">{{ status === 'idle' ? '' : t(labels[status]) }}</span>
  </div>
</template>

<style scoped>
.copy {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-3);
}
.address {
  font-size: var(--text-lead);
  font-weight: var(--weight-medium);
  user-select: all;
  overflow-wrap: anywhere;
}
button {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  min-height: var(--target-min);
  padding: 0 var(--space-4);
  border: var(--border-strong) solid var(--color-text);
  border-radius: var(--radius-pill);
  background: transparent;
  color: var(--color-text);
  font: var(--weight-bold) var(--text-sm) / var(--leading-none) var(--font-body);
  cursor: pointer;
  transition:
    background-color var(--duration-fast) var(--ease-out),
    color var(--duration-fast) var(--ease-out);
}
button:hover {
  background: var(--color-text);
  color: var(--color-bg);
}
/* Fondu croisé de l'icône : « check » grandit de 0,6 à 1 ; fondu seul en mouvement réduit */
.swap {
  display: inline-grid;
}
.swap .icon {
  grid-area: 1 / 1;
  transition:
    opacity var(--duration-fast) var(--ease-out),
    transform var(--duration-fast) var(--ease-out);
}
.ic-check {
  opacity: 0;
  transform: scale(0.6);
}
.done .ic-copy {
  opacity: 0;
}
.done .ic-check {
  opacity: 1;
  transform: scale(1);
}
@media (prefers-reduced-motion: reduce) {
  .ic-check,
  .done .ic-check {
    transform: none;
  }
}
</style>

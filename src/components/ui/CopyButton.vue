<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import BaseButton from './BaseButton.vue'
import BaseIcon from './BaseIcon.vue'

const props = defineProps<{
  value: string
  /** Adresse en taille de texte courant (pied de page) */
  small?: boolean
}>()
const { t } = useI18n()

const status = ref<'idle' | 'copied' | 'selected'>('idle')
const address = ref<HTMLElement>()
let timer: ReturnType<typeof setTimeout> | undefined

/** Durée d'affichage de la confirmation : le token --feedback-hold (en secondes) */
function holdMs() {
  const value = address.value && getComputedStyle(address.value).getPropertyValue('--feedback-hold')
  return (parseFloat(value || '') || 2) * 1000
}

function settle(next: 'copied' | 'selected') {
  status.value = next
  clearTimeout(timer)
  timer = setTimeout(() => (status.value = 'idle'), holdMs())
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
    <span ref="address" :class="['address', { small }]">{{ value }}</span>
    <BaseButton compact @click="copy">
      <span class="swap">
        <BaseIcon name="copy" class="ic-copy" />
        <BaseIcon name="check" class="ic-check" />
      </span>
      <span>{{ t(labels[status]) }}</span>
    </BaseButton>
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
.address.small {
  font-size: var(--text-ui);
}
/* Fondu croisé de l'icône : « check » grandit depuis --pop-scale ; fondu seul en mouvement réduit */
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
  transform: scale(var(--pop-scale));
}
.done .ic-copy {
  opacity: 0;
}
.done .ic-check {
  opacity: 1;
  transform: scale(1);
}
</style>

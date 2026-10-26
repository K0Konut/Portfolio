<script setup lang="ts">
import type { Control, Values } from './catalogue'

// Panneau de réglages en direct : un contrôle par option, qui met la démo à jour immédiatement
defineProps<{ controls: Control[] }>()
const values = defineModel<Values>({ required: true })

function set(key: string, value: string | number | boolean) {
  values.value = { ...values.value, [key]: value }
}
</script>

<template>
  <form class="controls" @submit.prevent>
    <p v-if="!controls.length" class="none">Pas d’option réglable.</p>
    <label v-for="c in controls" :key="c.key" :class="['control', c.type]">
      <span>{{ c.label }}</span>
      <select
        v-if="c.type === 'select'"
        class="ds-field"
        :value="values[c.key]"
        @change="set(c.key, ($event.target as HTMLSelectElement).value)"
      >
        <option v-for="o in c.options" :key="o" :value="o">{{ o || '(aucune)' }}</option>
      </select>
      <input
        v-else-if="c.type === 'boolean'"
        type="checkbox"
        :checked="Boolean(values[c.key])"
        @change="set(c.key, ($event.target as HTMLInputElement).checked)"
      />
      <span v-else-if="c.type === 'number'" class="range">
        <input
          type="range"
          :min="c.min"
          :max="c.max"
          :step="c.step ?? 1"
          :value="values[c.key]"
          @input="set(c.key, Number(($event.target as HTMLInputElement).value))"
        />
        <output>{{ values[c.key] }}</output>
      </span>
      <input
        v-else
        class="ds-field"
        type="text"
        :value="values[c.key]"
        @input="set(c.key, ($event.target as HTMLInputElement).value)"
      />
    </label>
  </form>
</template>

<style scoped>
.controls {
  display: grid;
  gap: var(--space-4);
}
.none {
  margin: 0;
  color: var(--color-text-subtle);
}
.control {
  display: grid;
  gap: var(--space-2);
  font-size: var(--text-sm);
  font-weight: var(--weight-bold);
}
.control.boolean {
  grid-template-columns: 1fr auto;
  align-items: center;
}
input[type='checkbox'] {
  width: var(--icon-md);
  height: var(--icon-md);
  accent-color: var(--color-action);
}
.range {
  display: grid;
  grid-template-columns: 1fr 3rem;
  align-items: center;
  gap: var(--space-3);
}
input[type='range'] {
  accent-color: var(--color-action);
}
output {
  text-align: right;
  font-variant-numeric: tabular-nums;
}
</style>

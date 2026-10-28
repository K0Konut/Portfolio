<script setup lang="ts">
import CycleSteps from '../../../components/ui/CycleSteps.vue'

// Le panneau ne règle que le slot par défaut : la démo remplit le slot center avec le texte choisi
defineProps<{ steps: { title: string; text: string }[]; center?: string }>()
</script>

<template>
  <CycleSteps :steps="steps">
    <template v-if="center" #center>{{ center }}</template>
  </CycleSteps>
</template>

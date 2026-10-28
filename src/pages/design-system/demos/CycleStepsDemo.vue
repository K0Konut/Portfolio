<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import CycleSteps from '../../../components/ui/CycleSteps.vue'

// Les étapes de la méthode ; le slot center, que le panneau ne règle pas, reçoit le texte choisi
const props = defineProps<{ count?: number; center?: string }>()
const { tm } = useI18n()
const steps = computed(() =>
  (tm('method.steps') as { title: string; text: string }[]).slice(0, props.count),
)
</script>

<template>
  <CycleSteps :steps="steps">
    <template v-if="center" #center>{{ center }}</template>
  </CycleSteps>
</template>

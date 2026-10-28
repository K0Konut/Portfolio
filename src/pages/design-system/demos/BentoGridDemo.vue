<script setup lang="ts">
import BentoGrid from '../../../components/mise-en-page/BentoGrid.vue'
import ProjectCard from '../../../components/ui/ProjectCard.vue'
import { PROJETS } from '../projets'

// Des cartes de projet, comme sur la page Projets ; au-delà de cinq, les mêmes reviennent (cycle des teintes)
defineProps<{ count: number; glow?: boolean; reach?: number; tilt?: number }>()
</script>

<template>
  <BentoGrid :glow="glow" :reach="reach" :tilt="tilt">
    <ProjectCard v-for="i in count" :key="i" :project="PROJETS[(i - 1) % PROJETS.length]!" />
  </BentoGrid>
</template>

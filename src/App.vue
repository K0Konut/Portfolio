<script setup lang="ts">
import SkipLink from './components/layout/SkipLink.vue'
import { useSeo } from './composables/useSeo'

useSeo()
</script>

<template>
  <!-- Premier élément focusable de chaque page (design system § SkipLink) -->
  <SkipLink />
  <RouterView />
</template>

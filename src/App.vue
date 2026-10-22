<script setup lang="ts">
import AppFooter from './components/layout/AppFooter.vue'
import AppHeader from './components/layout/AppHeader.vue'
import SkipLink from './components/layout/SkipLink.vue'
import { useSeo } from './composables/useSeo'

useSeo()
</script>

<template>
  <!-- Premier élément focusable de chaque page (design system § SkipLink) -->
  <SkipLink />
  <AppHeader />
  <RouterView />
  <AppFooter />
</template>

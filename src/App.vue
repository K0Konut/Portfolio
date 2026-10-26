<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppFooter from './components/layout/AppFooter.vue'
import AppHeader from './components/layout/AppHeader.vue'
import SkipLink from './components/layout/SkipLink.vue'
import { useSeo } from './composables/useSeo'

useSeo()
// Démo isolée du catalogue de développement (iframe de /design-system) : sans en-tête ni pied de page
const route = useRoute()
const bare = computed(() => route.meta.bare)
</script>

<template>
  <!-- Premier élément focusable de chaque page (design system § SkipLink) -->
  <SkipLink v-if="!bare" />
  <AppHeader v-if="!bare" />
  <RouterView />
  <AppFooter v-if="!bare" />
</template>

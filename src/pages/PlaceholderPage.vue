<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

// Page provisoire du socle, commune à toutes les routes ; remplacée page par page (architecture technique §11)
const route = useRoute()
const { t } = useI18n()
const page = computed(() => route.meta.page ?? '404')
</script>

<template>
  <main id="contenu">
    <h1>{{ t(`pages.${page}.title`) }}</h1>
    <p v-if="route.params.slug">{{ route.params.slug }}</p>
    <p>{{ t('placeholder.text') }}</p>
  </main>
</template>

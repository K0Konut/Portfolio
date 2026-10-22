<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import PageIntro from '../components/sections/PageIntro.vue'

// Page provisoire commune à toutes les routes ; remplacée page par page (architecture technique §11)
const route = useRoute()
const { t } = useI18n()
const page = computed(() => route.meta.page ?? '404')
</script>

<template>
  <main id="contenu" tabindex="-1">
    <PageIntro :title="t(`pages.${page}.title`)">
      {{ route.params.slug ? `${route.params.slug} · ` : '' }}{{ t('placeholder.text') }}
    </PageIntro>
  </main>
</template>

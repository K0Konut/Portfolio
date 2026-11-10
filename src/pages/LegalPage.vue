<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import SectionWave from '../components/fonds/SectionWave.vue'
import PageIntro from '../components/mise-en-page/PageIntro.vue'
import PageSection from '../components/mise-en-page/PageSection.vue'
import { useLocale } from '../composables/useLocale'
import { pageText } from '../content/pages'

// Mentions légales et confidentialité : le titre, puis le texte saisi dans Dashility (src/content/pages.ts)
const route = useRoute()
const { t } = useI18n()
const { locale } = useLocale()
const TITLES = { 'mentions-legales': 'footer.legal', confidentialite: 'footer.privacy' }
// routes.ts ne monte cette vue que pour ces deux pages
const page = computed(() => route.meta.page as keyof typeof TITLES)
const text = computed(() => pageText(locale.value, page.value))
</script>

<template>
  <main id="contenu" tabindex="-1">
    <PageIntro :title="t(TITLES[page])" />
    <SectionWave :seed="1" from="violet" to="nuit" />
    <PageSection>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div v-if="text" class="prose legal" v-html="text" />
    </PageSection>
  </main>
</template>

<style scoped>
.legal :deep(h2) {
  margin: 0;
  font-size: var(--text-h3);
  line-height: var(--leading-snug);
}
.legal :deep(* + h2) {
  margin-top: var(--space-6);
}
</style>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import SectionWave from '../components/fonds/SectionWave.vue'
import PageIntro from '../components/mise-en-page/PageIntro.vue'
import PageSection from '../components/mise-en-page/PageSection.vue'
import { useLocale } from '../composables/useLocale'
import { pageText } from '../content/pages'

// Mentions légales et confidentialité : le titre, puis le texte en Markdown (content/<langue>/pages/<page>.md)
const route = useRoute()
const { t } = useI18n()
const { locale } = useLocale()
const page = computed(() =>
  route.meta.page === 'confidentialite' ? 'confidentialite' : 'mentions-legales',
)
const text = computed(() => pageText(locale.value, page.value))
</script>

<template>
  <main id="contenu" tabindex="-1">
    <PageIntro :title="t(page === 'confidentialite' ? 'footer.privacy' : 'footer.legal')" />
    <SectionWave :seed="1" from="violet" to="nuit" />
    <PageSection>
      <component :is="text" v-if="text" class="prose legal" />
    </PageSection>
  </main>
</template>

<style scoped>
.legal :deep(h2) {
  margin: var(--space-6) 0 0;
  font-size: var(--text-h3);
  line-height: var(--leading-snug);
}
.legal :deep(h2:first-child) {
  margin-top: 0;
}
.legal :deep(:is(p, ul)) {
  color: var(--color-text-muted);
}
</style>

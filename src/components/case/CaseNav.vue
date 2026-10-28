<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useLocale } from '../../composables/useLocale'
import PageSection from '../sections/PageSection.vue'
import NextLink from '../ui/NextLink.vue'
import TextLink from '../ui/TextLink.vue'

/* Fin d'une étude de cas (design system § CaseNav), sur fond rose : le projet suivant en grand,
   et le retour à la liste. */
defineProps<{ next: { slug: string; title: string } }>()
const { t } = useI18n()
const { to } = useLocale()
</script>

<template>
  <PageSection fond="rose" :aria-label="t('case.after')">
    <div class="nav">
      <NextLink
        :label="t('case.next')"
        :title="next.title"
        :to="to('etude-de-cas', { slug: next.slug })"
      />
      <TextLink variant="standalone" :to="to('projets')" icon="arrow-left" icon-start>{{
        t('case.all')
      }}</TextLink>
    </div>
  </PageSection>
</template>

<style scoped>
.nav {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: var(--space-6);
}
</style>

<script setup lang="ts">
import { useId } from 'vue'
import { useI18n } from 'vue-i18n'
import ContactLinks from '../site/ContactLinks.vue'
import PosterCard from '../ui/PosterCard.vue'
import PageSection from './PageSection.vue'

// Section « Parlons-en » (design system § ContactCard) : la section vive de la page, en lime
defineProps<{ intro: string }>()
const { t } = useI18n()
const titleId = useId()
</script>

<template>
  <PageSection fond="lime" :labelledby="titleId">
    <div class="contact">
      <div v-reveal class="intro">
        <h2 :id="titleId" class="display">{{ t('contact.title') }}</h2>
        <p class="lead">{{ intro }}</p>
      </div>
      <PosterCard v-reveal="1" :tilt="1">
        <ContactLinks :address-label="t('contact.address')" />
      </PosterCard>
    </div>
  </PageSection>
</template>

<style scoped>
.contact {
  display: grid;
  gap: var(--space-7);
  align-items: center;
}
@media (min-width: 1024px) {
  .contact {
    grid-template-columns: minmax(0, 5fr) minmax(0, 6fr);
    gap: var(--space-8);
  }
}
.intro {
  display: grid;
  gap: var(--space-5);
  justify-items: start;
}
h2 {
  font-size: clamp(3rem, 1.5rem + 7vw, 6rem);
}
</style>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { SITE } from '../../content/site'
import PageIntro from '../sections/PageIntro.vue'
import ContactLinks from '../site/ContactLinks.vue'
import PosterCard from '../ui/PosterCard.vue'

/* Page Contact (design system § BusinessCard) : toute la page tient sur une carte de visite crème posée
   sur le violet, droite et immobile ; seuls ses liens et boutons réagissent. */
const { t } = useI18n()
</script>

<template>
  <PageIntro :title="t('business.title')" center full>
    {{ t('business.intro') }}
    <template #after>
      <PosterCard v-reveal="2" class="card" fond="creme" :lift="false">
        <div class="who">
          <b class="display">{{ SITE.name }}</b>
          <span>{{ t('business.role') }}</span>
        </div>
        <ContactLinks :cv-label="t('business.cv')" />
      </PosterCard>
    </template>
  </PageIntro>
</template>

<style scoped>
/* Format carte de visite (1,75:1, 40rem au plus) ; sur mobile, la hauteur de son contenu */
.card {
  width: min(100%, 40rem);
  aspect-ratio: 1.75;
  display: grid;
  align-content: space-between;
  gap: var(--space-5);
  margin-top: var(--space-5);
  text-align: start;
  --contact-links-gap: var(--space-3);
}
@media (max-width: 767px) {
  .card {
    aspect-ratio: auto;
  }
}
.who b {
  display: block;
  font-size: clamp(2rem, 1.2rem + 3vw, 3.25rem);
}
.who span {
  display: block;
  margin-top: var(--space-2);
  color: var(--color-text-subtle);
  font-weight: var(--weight-medium);
}
</style>

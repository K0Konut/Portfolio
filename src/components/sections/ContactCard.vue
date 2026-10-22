<script setup lang="ts">
import { computed, useId } from 'vue'
import { useI18n } from 'vue-i18n'
import { SITE } from '../../content/site'
import type { Locale } from '../../router/routes'
import BaseButton from '../ui/BaseButton.vue'
import CopyButton from '../ui/CopyButton.vue'
import TextLink from '../ui/TextLink.vue'

// Section « Parlons-en » (design system § ContactCard) : la section vive de la page, en lime
defineProps<{ intro: string }>()
const { t, locale } = useI18n()
const cv = computed(() => SITE.cv[locale.value as Locale])
const titleId = useId()
</script>

<template>
  <section class="section fond-lime" :aria-labelledby="titleId">
    <div class="inner contact">
      <div v-reveal class="intro">
        <h2 :id="titleId">{{ t('contact.title') }}</h2>
        <p>{{ intro }}</p>
      </div>
      <div v-reveal="1" class="card fond-nuit">
        <div>
          <p class="label">{{ t('contact.address') }}</p>
          <CopyButton :value="SITE.email" />
        </div>
        <div class="links">
          <BaseButton variant="primary" :href="cv" download icon="download">{{
            t('contact.cv')
          }}</BaseButton>
          <TextLink variant="standalone" :href="SITE.linkedin">LinkedIn</TextLink>
          <TextLink variant="standalone" :href="SITE.github">GitHub</TextLink>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section {
  padding: var(--space-section) var(--gutter);
}
.contact {
  max-width: var(--container);
  margin: 0 auto;
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
  margin: 0;
  font-family: var(--font-display);
  font-weight: var(--weight-regular);
  font-size: clamp(3rem, 1.5rem + 7vw, 6rem);
  line-height: var(--leading-display);
}
.intro p {
  margin: 0;
  max-width: var(--measure);
  font-size: var(--text-lead);
  line-height: var(--leading-snug);
}
/* Affiche collée : inclinée sur bureau, elle se redresse et se soulève au survol ; droite sur mobile */
.card {
  display: grid;
  gap: var(--space-6);
  padding: clamp(var(--space-5), 4vw, var(--space-7));
  border-radius: var(--radius-md);
  transition: transform var(--duration-fast) var(--ease-out);
}
@media (min-width: 1024px) {
  .card {
    transform: rotate(-2deg);
  }
  .card:hover,
  .card:focus-within {
    transform: translateY(calc(-1 * var(--card-lift))) rotate(0deg);
  }
}
@media (prefers-reduced-motion: reduce) {
  .card,
  .card:hover,
  .card:focus-within {
    transform: none;
  }
}
.label {
  margin: 0 0 var(--space-2);
  font-size: var(--text-sm);
  font-weight: var(--weight-bold);
  color: var(--color-text-subtle);
}
.links {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-3) var(--space-5);
}
</style>

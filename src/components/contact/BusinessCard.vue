<script setup lang="ts">
import { useId } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLocale } from '../../composables/useLocale'
import { SITE } from '../../content/site'
import BaseButton from '../ui/BaseButton.vue'
import CopyButton from '../ui/CopyButton.vue'
import TextLink from '../ui/TextLink.vue'

/* Page Contact (design system § BusinessCard) : toute la page tient sur une carte de visite crème posée
   sur le violet, droite et immobile ; seuls ses liens et boutons réagissent. */
const { t } = useI18n()
const { locale } = useLocale()
const titleId = useId()
</script>

<template>
  <section class="stage fond-violet" :aria-labelledby="titleId">
    <div class="intro">
      <h1 :id="titleId" v-reveal class="display">{{ t('business.title') }}</h1>
      <p v-reveal="1" class="lead">{{ t('business.intro') }}</p>
    </div>
    <div v-reveal="2" class="card fond-creme">
      <div class="who">
        <b class="display">{{ SITE.name }}</b>
        <span>{{ t('business.role') }}</span>
      </div>
      <div class="lines">
        <CopyButton :value="SITE.email" />
        <div class="links">
          <BaseButton variant="primary" :href="SITE.cv[locale]" download icon="download">{{
            t('business.cv')
          }}</BaseButton>
          <TextLink variant="standalone" :href="SITE.linkedin">LinkedIn</TextLink>
          <TextLink variant="standalone" :href="SITE.github">GitHub</TextLink>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.stage {
  min-height: calc(100svh - var(--space-9));
  display: grid;
  place-content: center;
  justify-items: center;
  gap: var(--space-7);
  padding: calc(var(--header-height) + var(--space-8)) var(--gutter) var(--space-9);
}
.intro {
  display: grid;
  gap: var(--space-3);
  justify-items: center;
  text-align: center;
}
h1 {
  font-size: var(--text-h1);
}
/* Format carte de visite (1,75:1, 40rem au plus) ; sur mobile, la hauteur de son contenu */
.card {
  width: min(100%, 40rem);
  aspect-ratio: 1.75;
  display: grid;
  align-content: space-between;
  gap: var(--space-5);
  padding: clamp(var(--space-5), 4vw, var(--space-7));
  border-radius: var(--radius-md);
}
@media (max-width: 599px) {
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
.lines {
  display: grid;
  gap: var(--space-3);
}
.links {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-3) var(--space-5);
}
</style>

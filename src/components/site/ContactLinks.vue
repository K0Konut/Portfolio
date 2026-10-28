<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useLocale } from '../../composables/useLocale'
import { SITE } from '../../content/site'
import BaseButton from '../ui/BaseButton.vue'
import CopyButton from '../ui/CopyButton.vue'
import TextLink from '../ui/TextLink.vue'

/* Coordonnées du propriétaire, au même format partout (design system § ContactLinks) : l'adresse à copier,
   puis le CV de la langue de la page, LinkedIn et GitHub. */
defineProps<{ cvLabel?: string; addressLabel?: string }>()
const { t } = useI18n()
const { locale } = useLocale()
</script>

<template>
  <div class="contact-links">
    <div>
      <p v-if="addressLabel" class="label">{{ addressLabel }}</p>
      <CopyButton :value="SITE.email" />
    </div>
    <div class="links">
      <BaseButton variant="primary" :href="SITE.cv[locale]" download icon="download">{{
        cvLabel ?? t('contact.cv')
      }}</BaseButton>
      <TextLink variant="standalone" :href="SITE.linkedin">LinkedIn</TextLink>
      <TextLink variant="standalone" :href="SITE.github">GitHub</TextLink>
    </div>
  </div>
</template>

<style scoped>
.contact-links {
  display: grid;
  gap: var(--space-5);
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

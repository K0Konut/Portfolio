<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useLocale } from '../../composables/useLocale'
import PageSection from '../sections/PageSection.vue'
import BaseIcon from '../ui/BaseIcon.vue'
import TextLink from '../ui/TextLink.vue'

/* Fin d'une étude de cas (design system § CaseNav), sur fond rose : le projet suivant en grand,
   et le retour à la liste. Au survol, la flèche avance et le titre se souligne. */
defineProps<{ next: { slug: string; title: string } }>()
const { t } = useI18n()
const { to } = useLocale()
</script>

<template>
  <PageSection fond="rose" :aria-label="t('case.after')">
    <div class="nav">
      <RouterLink class="next" :to="to('etude-de-cas', { slug: next.slug })">
        <span class="lbl">{{ t('case.next') }}</span>
        <span class="title display"
          ><span class="text">{{ next.title }}</span
          ><BaseIcon name="arrow-right" size="md"
        /></span>
      </RouterLink>
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
.next {
  display: grid;
  gap: var(--space-2);
  color: var(--color-text);
  text-decoration: none;
}
.lbl {
  font-size: var(--text-sm);
  font-weight: var(--weight-bold);
}
.title {
  display: inline-flex;
  align-items: center;
  gap: var(--space-3);
  font-size: var(--text-h2);
}
.text {
  background: linear-gradient(currentColor, currentColor) left bottom / 0 var(--underline) no-repeat;
  transition: background-size var(--duration-fast) var(--ease-out);
}
.title .icon {
  transition: transform var(--duration-fast) var(--ease-out);
}
.next:hover .text,
.next:focus-visible .text {
  background-size: 100% var(--underline);
}
.next:hover .icon,
.next:focus-visible .icon {
  transform: translateX(var(--hover-nudge));
}
</style>

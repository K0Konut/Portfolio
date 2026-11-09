<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useLocale } from '../../composables/useLocale'
import { SITE } from '../../content/site'
import CopyButton from '../ui/CopyButton.vue'
import TextLink from '../ui/TextLink.vue'

// Pied de page de toutes les pages (design system § AppFooter) : un repère calme, sans animation
const { t } = useI18n()
const { to } = useLocale()
const year = new Date().getFullYear()
</script>

<template>
  <footer class="fond-nuit">
    <div class="container foot">
      <div class="cols">
        <div>
          <h2>{{ t('footer.cv') }}</h2>
          <ul>
            <li>
              <TextLink
                variant="standalone"
                :href="SITE.cv.fr"
                download
                data-dashility-cv
                icon="download"
                >{{ t('footer.cvFr') }}</TextLink
              >
            </li>
            <li>
              <TextLink
                variant="standalone"
                :href="SITE.cv.en"
                download
                data-dashility-cv
                icon="download"
                >{{ t('footer.cvEn') }}</TextLink
              >
            </li>
          </ul>
        </div>
        <div>
          <h2>{{ t('footer.contact') }}</h2>
          <CopyButton :value="SITE.email" small />
          <ul>
            <li><TextLink variant="standalone" :href="SITE.linkedin">LinkedIn</TextLink></li>
            <li><TextLink variant="standalone" :href="SITE.github">GitHub</TextLink></li>
          </ul>
        </div>
        <div>
          <h2>{{ t('footer.site') }}</h2>
          <ul>
            <li>
              <TextLink variant="standalone" :href="SITE.repository">{{
                t('footer.code')
              }}</TextLink>
            </li>
            <li>
              <TextLink variant="standalone" :to="to('mentions-legales')">{{
                t('footer.legal')
              }}</TextLink>
            </li>
            <li>
              <TextLink variant="standalone" :to="to('confidentialite')">{{
                t('footer.privacy')
              }}</TextLink>
            </li>
          </ul>
        </div>
      </div>
      <small>© {{ year }} {{ SITE.name }}</small>
    </div>
  </footer>
</template>

<style scoped>
footer {
  padding-inline: var(--gutter);
}
.foot {
  padding: var(--space-8) 0 var(--space-6);
  display: grid;
  gap: var(--space-7);
}
.cols {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 14rem), 1fr));
  gap: var(--space-6);
}
h2 {
  margin: 0 0 var(--space-2);
  font: var(--weight-bold) var(--text-sm) / var(--leading-snug) var(--font-body);
  color: var(--color-text-subtle);
}
ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
}
small {
  font-size: var(--text-sm);
  color: var(--color-text-subtle);
}
</style>

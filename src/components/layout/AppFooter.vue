<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { SITE } from '../../content/site'
import { routeName, type Locale } from '../../router/routes'
import CopyButton from '../ui/CopyButton.vue'
import TextLink from '../ui/TextLink.vue'

// Pied de page de toutes les pages (design system § AppFooter) : un repère calme, sans animation
const { t, locale } = useI18n()
const year = new Date().getFullYear()
</script>

<template>
  <footer class="fond-nuit">
    <div class="foot">
      <div class="cols">
        <div>
          <h2>{{ t('footer.cv') }}</h2>
          <ul>
            <li>
              <TextLink variant="standalone" :href="SITE.cv.fr" download icon="download">{{
                t('footer.cvFr')
              }}</TextLink>
            </li>
            <li>
              <TextLink variant="standalone" :href="SITE.cv.en" download icon="download">{{
                t('footer.cvEn')
              }}</TextLink>
            </li>
          </ul>
        </div>
        <div>
          <h2>{{ t('footer.contact') }}</h2>
          <CopyButton :value="SITE.email" class="mail" />
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
              <TextLink
                variant="standalone"
                :to="{ name: routeName('mentions-legales', locale as Locale) }"
                >{{ t('footer.legal') }}</TextLink
              >
            </li>
            <li>
              <TextLink
                variant="standalone"
                :to="{ name: routeName('confidentialite', locale as Locale) }"
                >{{ t('footer.privacy') }}</TextLink
              >
            </li>
          </ul>
        </div>
      </div>
      <small>© {{ year }} Costa Maskulov</small>
    </div>
  </footer>
</template>

<style scoped>
footer {
  padding-inline: var(--gutter);
}
.foot {
  max-width: var(--container);
  margin: 0 auto;
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
.mail :deep(.address) {
  font-size: var(--text-ui);
}
small {
  font-size: var(--text-sm);
  color: var(--color-text-subtle);
}
</style>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { useLocale } from '../../composables/useLocale'
import { LOCALES, routeName } from '../../router/routes'

// Mène à la page équivalente dans l'autre langue (architecture §2). Sans équivalent, à sa rubrique (un projet
// pas encore traduit : la page Projets, architecture technique §3) ; depuis une adresse inconnue, à l'accueil
defineProps<{ variant: 'header' | 'menu' }>()
const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const { locale, alternate } = useLocale()

const links = computed(() =>
  LOCALES.map((l) => ({
    locale: l,
    href:
      alternate(l) ?? router.resolve({ name: routeName(route.meta.section ?? 'accueil', l) }).href,
    current: l === locale.value,
  })),
)
</script>

<template>
  <div :class="['lang', `lang-${variant}`]" role="group" :aria-label="t('nav.language')">
    <template v-for="(link, i) in links" :key="link.locale">
      <span v-if="i > 0 && variant === 'header'" class="sep" aria-hidden="true">/</span>
      <RouterLink
        :to="link.href"
        :lang="link.locale"
        :hreflang="link.locale"
        :aria-current="link.current ? 'true' : undefined"
      >
        <span :class="{ trace: variant === 'header' }">{{ link.locale.toUpperCase() }}</span>
      </RouterLink>
    </template>
  </div>
</template>

<style scoped>
.lang {
  display: flex;
  align-items: center;
}
a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: var(--target-min);
  min-height: var(--target-min);
  text-decoration: none;
}
.lang-header a {
  color: var(--color-header-text);
  font-weight: var(--weight-medium);
  font-size: var(--text-ui);
}
.lang-header .sep {
  color: var(--color-header-muted);
}
.lang-menu {
  gap: var(--space-2);
  font-weight: var(--weight-bold);
}
.lang-menu a {
  color: var(--color-text-muted);
}
.lang-menu a[aria-current] {
  color: var(--color-action);
}
</style>

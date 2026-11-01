<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLocale } from '../../composables/useLocale'
import { SITE } from '../../content/site'
import BaseButton from '../ui/BaseButton.vue'
import BaseIcon from '../ui/BaseIcon.vue'
import LangSwitch from './LangSwitch.vue'
import LogoSymbole from './LogoSymbole.vue'
import MobileMenu from './MobileMenu.vue'
import { useNavLinks } from './navigation'

// En-tête fixe qui « pend » au-dessus du contenu (design system § AppHeader)
const { t } = useI18n()
const { to } = useLocale()
const links = useNavLinks()
const menuOpen = ref(false)
</script>

<template>
  <header class="site-header">
    <div class="bar" data-intro-hide>
      <RouterLink class="name" :to="to('accueil')"><LogoSymbole />{{ SITE.name }}</RouterLink>
      <nav :aria-label="t('nav.label')">
        <RouterLink
          v-for="link in links"
          :key="link.page"
          :to="link.to"
          :aria-current="link.current ? 'page' : undefined"
          ><span class="trace">{{ link.label }}</span></RouterLink
        >
      </nav>
      <LangSwitch variant="header" class="langs" />
      <BaseButton
        compact
        class="menu-button"
        :aria-expanded="menuOpen"
        aria-controls="menu-mobile"
        @click="menuOpen = true"
      >
        <BaseIcon name="menu" />{{ t('nav.menu') }}
      </BaseButton>
    </div>
    <MobileMenu v-model="menuOpen" />
  </header>
</template>

<style scoped>
.site-header {
  position: fixed;
  z-index: 20;
  top: 0;
  left: 0;
  right: 0;
  padding-inline: var(--gutter);
  pointer-events: none;
}
/* Barre claire : les rôles de couleur prennent ceux de l'en-tête (boutons, focus, trait) */
.bar {
  --color-text: var(--color-header-text);
  --color-bg: var(--color-header-bg);
  --color-focus: var(--color-header-accent);
  --trace-color: var(--color-header-accent);
  pointer-events: auto;
  max-width: var(--container);
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: var(--space-4);
  min-height: var(--header-height);
  padding: var(--space-2) var(--gutter);
  border-radius: 0 0 var(--radius-lg) var(--radius-lg);
  background: var(--color-header-bg);
  color: var(--color-header-text);
  transition:
    opacity var(--duration-base) var(--ease-out),
    translate var(--duration-base) var(--ease-out);
}
/* Entrée avec la section d'accueil (DA §6) : la barre glisse depuis le haut quand l'attente se lève */
html.js[data-intro='pending'] .bar {
  translate: 0 calc(-1 * var(--reveal-distance));
}
@media (prefers-reduced-motion: reduce) {
  .bar {
    transition-duration: var(--duration-reduced);
  }
}
.name {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  min-height: var(--target-min);
  font-family: var(--font-display);
  font-size: var(--text-logo);
  line-height: var(--leading-none);
  color: inherit;
  text-decoration: none;
  white-space: nowrap;
}
nav {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: var(--space-5);
}
nav a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: var(--target-min);
  min-height: var(--target-min);
  color: var(--color-header-text);
  text-decoration: none;
  font-weight: var(--weight-medium);
  font-size: var(--text-ui);
}
.menu-button {
  display: none;
  margin-left: auto;
}
@media (max-width: 767px) {
  nav,
  .langs {
    display: none;
  }
  .menu-button {
    display: inline-flex;
  }
}
</style>

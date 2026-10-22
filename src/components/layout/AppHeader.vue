<script setup lang="ts">
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { routeName, type Locale } from '../../router/routes'
import BaseIcon from '../ui/BaseIcon.vue'
import LangSwitch from './LangSwitch.vue'
import MobileMenu from './MobileMenu.vue'
import { isCurrentSection, NAV_PAGES } from './navigation'

// En-tête fixe qui « pend » au-dessus du contenu (design system § AppHeader)
const route = useRoute()
const { t, locale } = useI18n()
const menuOpen = ref(false)
const menuButton = ref<HTMLButtonElement>()

// Menu refermé : le focus revient au bouton qui l'a ouvert
watch(menuOpen, (isOpen, wasOpen) => {
  if (!isOpen && wasOpen) menuButton.value?.focus()
})
</script>

<template>
  <header class="site-header">
    <div class="bar">
      <RouterLink class="name" :to="{ name: routeName('accueil', locale as Locale) }"
        >Costa Maskulov</RouterLink
      >
      <nav :aria-label="t('nav.label')">
        <RouterLink
          v-for="page in NAV_PAGES"
          :key="page"
          :to="{ name: routeName(page, locale as Locale) }"
          :aria-current="isCurrentSection(page, route.meta.page) ? 'page' : undefined"
          ><span>{{ t(`nav.${page}`) }}</span></RouterLink
        >
      </nav>
      <LangSwitch variant="header" class="langs" />
      <button
        ref="menuButton"
        type="button"
        class="menu-button"
        :aria-expanded="menuOpen"
        aria-controls="menu-mobile"
        @click="menuOpen = true"
      >
        <BaseIcon name="menu" />{{ t('nav.menu') }}
      </button>
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
.bar {
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
  --color-focus: var(--color-header-accent);
}
.name {
  display: inline-flex;
  align-items: center;
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
nav span {
  position: relative;
}
/* Survol : un trait violet se trace ; page en cours : trait permanent */
nav span::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: calc(-1 * var(--space-1));
  height: var(--underline);
  background: var(--color-header-accent);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform var(--duration-move) var(--ease-out);
}
nav a:hover span::after,
nav a[aria-current] span::after {
  transform: scaleX(1);
}
.menu-button {
  display: none;
  margin-left: auto;
  align-items: center;
  gap: var(--space-2);
  min-height: var(--target-min);
  padding: 0 var(--space-4);
  border: var(--border-strong) solid var(--color-header-text);
  border-radius: var(--radius-pill);
  background: transparent;
  color: var(--color-header-text);
  font: var(--weight-bold) var(--text-sm) / var(--leading-none) var(--font-body);
  cursor: pointer;
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

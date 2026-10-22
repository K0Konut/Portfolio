<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { routeName, type Locale } from '../../router/routes'
import LangSwitch from './LangSwitch.vue'
import { isCurrentSection, NAV_PAGES } from './navigation'

// Menu plein écran sur mobile (design system § AppHeader) : focus piégé, Échap ferme
const open = defineModel<boolean>({ required: true })
const route = useRoute()
const { t, locale } = useI18n()
const panel = ref<HTMLElement>()
const closeButton = ref<HTMLButtonElement>()

watch(open, async (isOpen) => {
  if (!isOpen) return
  await nextTick()
  closeButton.value?.focus()
})

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    open.value = false
    return
  }
  if (event.key !== 'Tab' || !panel.value) return
  const focusable = panel.value.querySelectorAll<HTMLElement>('a, button')
  const first = focusable[0]
  const last = focusable[focusable.length - 1]
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault()
    last?.focus()
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first?.focus()
  }
}
</script>

<template>
  <div
    v-show="open"
    id="menu-mobile"
    ref="panel"
    class="menu fond-violet"
    role="dialog"
    aria-modal="true"
    :aria-label="t('nav.menu')"
    @keydown="onKeydown"
  >
    <div class="top">
      <b>Costa Maskulov</b>
      <button ref="closeButton" type="button" class="close" @click="open = false">
        {{ t('nav.close') }}
      </button>
    </div>
    <ul>
      <li v-for="page in NAV_PAGES" :key="page">
        <RouterLink
          :to="{ name: routeName(page, locale as Locale) }"
          :aria-current="isCurrentSection(page, route.meta.page) ? 'page' : undefined"
          @click="open = false"
          >{{ t(`nav.${page}`) }}</RouterLink
        >
      </li>
    </ul>
    <LangSwitch variant="menu" class="langs" />
  </div>
</template>

<style scoped>
.menu {
  position: fixed;
  inset: 0;
  z-index: 25;
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  padding: var(--space-3) var(--gutter) var(--space-6);
}
.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: var(--header-height);
}
.top b {
  font-family: var(--font-display);
  font-weight: var(--weight-regular);
  font-size: var(--text-logo);
}
.close {
  min-height: var(--target-min);
  padding: 0 var(--space-4);
  border: var(--border-strong) solid var(--color-text);
  border-radius: var(--radius-pill);
  background: transparent;
  color: var(--color-text);
  font: var(--weight-bold) var(--text-sm) / var(--leading-none) var(--font-body);
  cursor: pointer;
}
ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: var(--space-1);
}
/* Seule exception à « pas de Bagel dans la navigation » : rappel de l'affiche (DA §3) */
ul a {
  display: inline-flex;
  align-items: center;
  min-height: var(--target-min);
  font-family: var(--font-display);
  font-size: var(--text-menu);
  line-height: var(--leading-display);
  color: var(--color-text);
  text-decoration: none;
}
ul a[aria-current] {
  color: var(--color-action);
}
.langs {
  margin-top: auto;
}
</style>

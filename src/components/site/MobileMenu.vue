<script setup lang="ts">
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import BaseButton from '../ui/BaseButton.vue'
import LangSwitch from './LangSwitch.vue'
import SiteLogo from './SiteLogo.vue'
import { useNavLinks } from './navigation'

/* Menu plein écran sur mobile (design system § AppHeader), sur l'élément <dialog> natif :
   showModal() rend le reste de la page inerte, Échap ferme, et le focus revient au bouton qui l'a ouvert. */
const open = defineModel<boolean>({ required: true })
const { t } = useI18n()
const links = useNavLinks()
const dialog = ref<HTMLDialogElement>()
const route = useRoute()
// Toute navigation ferme le menu, changement de langue compris (LangSwitch) ; un lien vers la page en cours
// ne change pas la route : les liens le ferment aussi au clic
watch(
  () => route.fullPath,
  () => (open.value = false),
)

watch(open, (isOpen) => {
  if (isOpen) dialog.value?.showModal()
  else dialog.value?.close()
})
</script>

<template>
  <dialog
    id="menu-mobile"
    ref="dialog"
    class="menu fond-violet"
    :aria-label="t('nav.menu')"
    @close="open = false"
  >
    <div class="top">
      <SiteLogo />
      <BaseButton compact autofocus @click="open = false">{{ t('nav.close') }}</BaseButton>
    </div>
    <ul>
      <li v-for="link in links" :key="link.page">
        <RouterLink
          :to="link.to"
          :aria-current="link.current ? 'page' : undefined"
          @click="open = false"
          >{{ link.label }}</RouterLink
        >
      </li>
    </ul>
    <LangSwitch variant="menu" class="langs" />
  </dialog>
</template>

<style scoped>
.menu {
  /* Placé dans l'en-tête, qui laisse passer les clics (pointer-events: none) : le menu les reprend */
  pointer-events: auto;
  width: 100%;
  max-width: none;
  height: 100%;
  max-height: none;
  margin: 0;
  border: 0;
  padding: var(--space-3) var(--gutter) var(--space-6);
  flex-direction: column;
  gap: var(--space-6);
}
.menu[open] {
  display: flex;
}
.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: var(--header-height);
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

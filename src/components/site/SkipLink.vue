<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <!-- Premier élément focusable de chaque page, vers <main id="contenu"> -->
  <a class="skip" href="#contenu">{{ t('ui.skip') }}</a>
</template>

<style scoped>
.skip {
  position: fixed;
  z-index: 30;
  top: var(--space-3);
  left: max(var(--space-4), env(safe-area-inset-left, 0px));
  display: inline-flex;
  align-items: center;
  min-height: var(--target-min);
  padding: 0 var(--space-5);
  border-radius: var(--radius-pill);
  background: var(--color-action);
  color: var(--color-on-action);
  font: var(--weight-bold) var(--text-ui) / var(--leading-none) var(--font-body);
  text-decoration: none;
  transform: translateY(calc(-100% - var(--space-6)));
  transition: transform var(--duration-fast) var(--ease-out);
}
.skip:focus {
  transform: none;
}
/* Mouvement réduit : pas de glissement, le lien apparaît en fondu à sa place */
@media (prefers-reduced-motion: reduce) {
  .skip {
    opacity: 0;
    transition: opacity var(--duration-reduced) var(--ease-out);
  }
  .skip:focus {
    opacity: 1;
  }
}
</style>

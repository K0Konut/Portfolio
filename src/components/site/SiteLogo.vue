<script setup lang="ts">
import { SITE } from '../../content/site'
</script>

<!-- Le logo : symbole Kokonut (source : docs/logo/kokonut-symbole.svg) et nom du site. Le symbole est en ligne
     pour prendre la couleur du texte (currentColor) sans requête ; décoratif, le nom donne le nom accessible. -->
<template>
  <span class="site-logo">
    <svg viewBox="27 27 146 146" aria-hidden="true" focusable="false">
      <g
        fill="none"
        stroke="currentColor"
        stroke-width="22"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M120 40H40V160H120" />
        <path d="M72 128V72H160V160" />
        <path d="M116 72V128" />
      </g>
    </svg>
    {{ SITE.name }}
  </span>
</template>

<style scoped>
.site-logo {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-family: var(--font-display);
  font-weight: var(--weight-regular);
  font-size: var(--text-logo);
  line-height: var(--leading-none);
  white-space: nowrap;
}
/* En em : le symbole suit la taille fluide du nom (--text-logo) */
svg {
  flex: none;
  width: 1.5em;
  height: 1.5em;
}
</style>

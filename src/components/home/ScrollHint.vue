<template>
  <!-- Indicateur de scroll (design system § ScrollHint) : décoratif ; son mouvement est piloté par l'entrée -->
  <div class="hint" aria-hidden="true"><i class="segment" /></div>
</template>

<style scoped>
.hint {
  position: absolute;
  z-index: 1;
  left: 50%;
  bottom: calc(var(--space-6) + env(safe-area-inset-bottom, 0px));
  width: var(--border-strong);
  height: var(--hint-height);
  background: color-mix(in srgb, var(--color-text-muted) 45%, transparent);
  overflow: hidden;
}
.segment {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: var(--hint-travel);
  background: var(--color-highlight);
}
</style>

<template>
  <!-- Étiquette d'information, jamais cliquable en V1 ; une ou deux par carte au plus -->
  <span class="tag"><slot /></span>
</template>

<style scoped>
.tag {
  display: inline-flex;
  align-items: center;
  padding: var(--space-2) var(--space-3);
  border: var(--border-strong) solid var(--color-detail);
  border-radius: var(--radius-pill);
  background: color-mix(in srgb, var(--color-detail) var(--tag-tint), transparent);
  color: var(--color-detail);
  font: var(--weight-medium) var(--text-sm) / var(--leading-none) var(--font-body);
  white-space: nowrap;
}
</style>

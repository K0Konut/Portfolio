<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { ProjectMeta } from '../../content/types'

/* Fiche d'une étude de cas (design system § MetaList) : une information par ligne, libellé à gauche,
   valeur en gras à droite. Code privé : la mention et sa raison, jamais un bouton désactivé. */
const props = defineProps<{ meta: ProjectMeta }>()
const { t } = useI18n()

const rows = computed(() => [
  { label: t('meta.type'), value: props.meta.type },
  { label: t('meta.role'), value: props.meta.role },
  { label: t('meta.duration'), value: props.meta.duration },
  { label: t('meta.team'), value: props.meta.team },
  { label: t('meta.stack'), value: props.meta.stack.join(' · ') },
])
</script>

<template>
  <dl class="fiche">
    <div v-for="row in rows" :key="row.label">
      <dt>{{ row.label }}</dt>
      <dd>{{ row.value }}</dd>
    </div>
    <div v-if="meta.privateCode">
      <dt>{{ t('meta.code') }}</dt>
      <dd>
        {{ t('meta.private') }}<span class="why">{{ meta.privateCode }}</span>
      </dd>
    </div>
  </dl>
</template>

<style scoped>
.fiche {
  margin: 0;
  width: 100%;
  border-top: var(--border-thin) solid var(--color-border);
}
.fiche > div {
  display: grid;
  grid-template-columns: 6rem minmax(0, 1fr);
  gap: var(--space-4);
  padding: var(--space-3) 0;
  border-bottom: var(--border-thin) solid var(--color-border);
}
dt {
  padding-top: 2px;
  font-size: var(--text-sm);
  color: var(--color-text-subtle);
}
dd {
  margin: 0;
  font-weight: var(--weight-bold);
  line-height: var(--leading-snug);
}
.why {
  display: block;
  font-size: var(--text-sm);
  font-weight: var(--weight-regular);
  color: var(--color-text-muted);
}
</style>

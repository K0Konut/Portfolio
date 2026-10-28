<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

/* Sommaire collant d'une page longue, sur bureau (design system § StickyToc). Le bloc en cours de lecture
   est le dernier dont le haut a passé le premier tiers de l'écran : un IntersectionObserver signale
   chaque passage de cette ligne, et la position n'est lue qu'à ce moment-là. */
const props = defineProps<{
  items: { id: string; label: string }[]
  /** Nom accessible de la navigation, « Sommaire » par défaut */
  label?: string
}>()
const { t } = useI18n()
const current = ref(props.items[0]?.id)
let observer: IntersectionObserver | undefined

function observe() {
  observer?.disconnect()
  const blocks = props.items.flatMap(({ id }) => document.getElementById(id) ?? [])
  observer = new IntersectionObserver(
    () => {
      // La même ligne que la marge de l'observateur (-67 %) : 33 % de la hauteur
      const line = innerHeight * 0.33
      const passed = blocks.filter((block) => block.getBoundingClientRect().top <= line)
      current.value = passed.pop()?.id ?? props.items[0]?.id
    },
    { rootMargin: '0px 0px -67% 0px' },
  )
  for (const block of blocks) observer.observe(block)
}

onMounted(observe)
// Le routeur garde la page quand seuls ses blocs changent (étude de cas suivante) : on observe les nouveaux
watch(() => props.items, observe, { flush: 'post' })
onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <nav class="toc" :aria-label="label ?? t('case.toc')">
    <ol>
      <li v-for="item in items" :key="item.id">
        <a :href="`#${item.id}`" :aria-current="item.id === current ? 'location' : undefined">{{
          item.label
        }}</a>
      </li>
    </ol>
  </nav>
</template>

<style scoped>
.toc {
  display: none;
}
@media (min-width: 1024px) {
  .toc {
    display: block;
    position: sticky;
    top: calc(var(--header-height) + var(--space-5));
  }
}
ol {
  list-style: none;
  margin: 0;
  padding: 0;
  border-left: var(--border-thin) solid var(--color-border);
}
a {
  position: relative;
  display: flex;
  align-items: center;
  min-height: var(--target-min);
  padding-left: var(--space-4);
  color: var(--color-text-subtle);
  text-decoration: none;
  transition: color var(--duration-fast) var(--ease-out);
}
a:hover {
  color: var(--color-text);
}
a[aria-current] {
  color: var(--color-text);
  font-weight: var(--weight-bold);
}
a[aria-current]::before {
  content: '';
  position: absolute;
  left: calc(-1 * var(--border-thin) - 1px);
  top: var(--space-2);
  bottom: var(--space-2);
  width: var(--underline);
  background: var(--color-highlight);
}
</style>

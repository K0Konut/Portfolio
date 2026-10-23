<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import type { Fond } from '../../components/sections/fonds'
import { type Entry, initialValues, propsOf, type Values } from './catalogue'
import { forceReducedMotion } from './forceStyles'

/* La démo d'un composant, seule dans l'iframe du catalogue : ses points de rupture suivent la largeur du cadre.
   La page du catalogue lui envoie les réglages ; elle renvoie sa hauteur. */
const props = defineProps<{ entry: Entry; reduced: boolean }>()
const values = ref<Values>(initialValues(props.entry))
const fond = ref<Fond>(props.entry.fond ?? 'nuit')
const run = ref(0)

// Avant le rendu du composant : il lit la préférence à sa création
if (props.reduced) forceReducedMotion()

type Message = { type: 'ds-values'; values: Values; fond: Fond } | { type: 'ds-replay' }

function onMessage(event: MessageEvent<Message>) {
  if (event.origin !== location.origin) return
  if (event.data.type === 'ds-values') {
    values.value = event.data.values
    fond.value = event.data.fond
  } else if (event.data.type === 'ds-replay') run.value++
}

// La hauteur du bloc de démo, pas celle du document : celle-ci vaut au moins celle de l'iframe
const demo = ref<HTMLElement>()
const observer = new ResizeObserver(([e]) =>
  parent.postMessage({ type: 'ds-height', height: e?.target.scrollHeight }, location.origin),
)

onMounted(() => {
  addEventListener('message', onMessage)
  if (demo.value) observer.observe(demo.value)
  parent.postMessage({ type: 'ds-ready' }, location.origin)
})
onBeforeUnmount(() => {
  removeEventListener('message', onMessage)
  observer.disconnect()
})
</script>

<template>
  <main ref="demo" :class="['demo', `fond-${fond}`]">
    <div :style="entry.frame">
      <component
        :is="entry.component"
        v-if="'slot' in values"
        :key="run"
        v-bind="propsOf(entry, values)"
        >{{ values.slot }}</component
      >
      <component :is="entry.component" v-else :key="run" v-bind="propsOf(entry, values)" />
    </div>
  </main>
</template>

<style scoped>
.demo {
  padding: var(--space-6) var(--gutter);
}
</style>

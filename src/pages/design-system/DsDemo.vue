<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import type { Fond } from '../../components/sections/fonds'
import { useRoute } from 'vue-router'
import { ENTRIES, type Entry, initialValues, propsOf, type Values } from './catalogue'
import { forceReducedMotion } from './forceStyles'

/* La démo d'un composant, seule dans l'iframe du catalogue (route /design-system/:entry/demo) : ses points de
   rupture suivent la largeur du cadre. La page du catalogue lui envoie les réglages ; elle renvoie sa hauteur.
   « ?reduced » : mouvement réduit forcé. */
const route = useRoute()
const entry: Entry | undefined = ENTRIES.find((e) => e.id === route.params.entry)
const values = ref<Values>(entry ? initialValues(entry) : {})
const fond = ref<Fond>(entry?.fond ?? 'nuit')
const run = ref(0)

// Avant le rendu du composant : il lit la préférence à sa création
if ('reduced' in route.query) forceReducedMotion()

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
let observer: ResizeObserver | undefined

onMounted(() => {
  addEventListener('message', onMessage)
  observer = new ResizeObserver(([e]) =>
    parent.postMessage({ type: 'ds-height', height: e?.target.scrollHeight }, location.origin),
  )
  if (demo.value) observer.observe(demo.value)
  parent.postMessage({ type: 'ds-ready' }, location.origin)
})
onBeforeUnmount(() => {
  removeEventListener('message', onMessage)
  observer?.disconnect()
})
</script>

<template>
  <main v-if="entry" ref="demo" :class="['demo', `fond-${fond}`]">
    <div :style="entry.frame">
      <component :is="entry.component" :key="run" v-bind="propsOf(entry, values)">
        <template v-if="'slot' in values" #default>{{ values.slot }}</template>
      </component>
    </div>
  </main>
</template>

<style scoped>
.demo {
  padding: var(--space-6) var(--gutter);
}
</style>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch, type Directive } from 'vue'
import type { Fond } from '../../components/sections/fonds'
import BaseButton from '../../components/ui/BaseButton.vue'
import { seconds } from '../../composables/motion'
import { codeOf, type Entry, FONDS, initialValues, propsOf, type Values } from './catalogue'
import DsControls from './DsControls.vue'
import DsReference from './DsReference.vue'
import DsText from './DsText.vue'
import { forceStates } from './forceStyles'

/* Page d'un composant du catalogue (design system v1.2 §6) : démo isolée dans une iframe (ses points de rupture
   suivent la largeur choisie), panneau de réglages, états côte à côte, code et tableau des options. */
const props = defineProps<{ entry: Entry }>()

const WIDTHS = [
  { label: 'Mobile', width: '390px' },
  { label: 'Tablette', width: '768px' },
  { label: 'Bureau', width: '1280px' },
  { label: 'Fluide', width: '100%' },
]
const STATES = [
  { label: 'Repos', cls: '' },
  { label: 'Survol', cls: 'ds-hover' },
  { label: 'Focus', cls: 'ds-focus' },
  { label: 'Appuyé', cls: 'ds-active' },
]

const values = ref<Values>(initialValues(props.entry))
const fond = ref<Fond>(props.entry.fond ?? 'nuit')
const width = ref('100%')
const reduced = ref(false)
const height = ref(0)
const frame = ref<HTMLIFrameElement>()
const copied = ref(false)

const src = computed(
  () => `/design-system/${props.entry.id}/demo${reduced.value ? '?reduced' : ''}`,
)
const code = computed(() => codeOf(props.entry, values.value))
const bound = computed(() => propsOf(props.entry, values.value))

const send = (message: object) => frame.value?.contentWindow?.postMessage(message, location.origin)
const sync = () => send({ type: 'ds-values', values: { ...values.value }, fond: fond.value })
watch([values, fond], sync)

function onMessage(event: MessageEvent) {
  if (event.origin !== location.origin || event.source !== frame.value?.contentWindow) return
  if (event.data?.type === 'ds-ready') sync()
  else if (event.data?.type === 'ds-height') height.value = event.data.height
}

// « Copié » seulement si le presse-papiers a accepté (absent hors https ou localhost), pendant --feedback-hold
let timer: ReturnType<typeof setTimeout> | undefined
async function copy() {
  try {
    await navigator.clipboard.writeText(code.value)
    copied.value = true
  } catch {
    copied.value = false
  }
  clearTimeout(timer)
  timer = setTimeout(() => (copied.value = false), seconds('--feedback-hold') * 1000)
}

/* Un état forcé : la classe sur la racine du composant, et sur ses liens et boutons pour le focus. Si le
   composant se redessine seul (Vue réécrit alors ses classes), elle est remise. */
const forced = new WeakMap<HTMLElement, MutationObserver>()
const vState: Directive<HTMLElement, string> = {
  mounted(el, { value }) {
    if (!value) return
    const apply = () => {
      const root = el.firstElementChild
      if (!root) return
      const targets = [root, ...(value === 'ds-focus' ? root.querySelectorAll('a, button') : [])]
      for (const t of targets) if (!t.classList.contains(value)) t.classList.add(value)
    }
    apply()
    const observer = new MutationObserver(apply)
    observer.observe(el, { subtree: true, childList: true, attributeFilter: ['class'] })
    forced.set(el, observer)
  },
  unmounted: (el) => forced.get(el)?.disconnect(),
}

onMounted(() => {
  addEventListener('message', onMessage)
  if (props.entry.states) forceStates()
})
onBeforeUnmount(() => {
  removeEventListener('message', onMessage)
  clearTimeout(timer)
})
</script>

<template>
  <article class="entry">
    <header>
      <p class="family">{{ entry.family }}</p>
      <h1>{{ entry.name }}</h1>
      <p class="description"><DsText :text="entry.description" /></p>
    </header>

    <div class="toolbar" role="group" aria-label="Réglages de la démo">
      <label>
        Fond
        <select v-model="fond" class="ds-field">
          <option v-for="f in FONDS" :key="f" :value="f">{{ f }}</option>
        </select>
      </label>
      <div class="widths" role="radiogroup" aria-label="Largeur">
        <button
          v-for="w in WIDTHS"
          :key="w.width"
          type="button"
          role="radio"
          :aria-checked="width === w.width"
          @click="width = w.width"
        >
          {{ w.label }}
        </button>
      </div>
      <label class="check"><input v-model="reduced" type="checkbox" /> Mouvement réduit</label>
      <BaseButton compact @click="send({ type: 'ds-replay' })">Rejouer</BaseButton>
    </div>

    <div class="workbench">
      <div class="stage">
        <iframe
          ref="frame"
          :src="src"
          :title="`Démo de ${entry.name}`"
          :style="{ width, height: entry.screen ? '40rem' : `${Math.max(height, 96)}px` }"
        />
      </div>
      <aside class="panel" aria-label="Options">
        <h2 class="ds-label">Options</h2>
        <DsControls v-model="values" :controls="entry.controls" />
      </aside>
    </div>

    <section v-if="entry.states" class="states" aria-label="États">
      <h2 class="ds-label">États</h2>
      <div class="state-grid">
        <figure v-for="s in STATES" :key="s.label" :class="`fond-${fond}`">
          <div v-state="s.cls" class="state" :style="entry.frame">
            <component :is="entry.component" v-bind="bound">
              <template v-if="values.slot" #default>{{ values.slot }}</template>
            </component>
          </div>
          <figcaption>{{ s.label }}</figcaption>
        </figure>
      </div>
    </section>

    <section v-if="entry.states" class="states" aria-label="Sur les six fonds">
      <h2 class="ds-label">Sur les six fonds</h2>
      <div class="state-grid">
        <figure v-for="f in FONDS" :key="f" :class="`fond-${f}`">
          <div :style="entry.frame">
            <component :is="entry.component" v-bind="bound">
              <template v-if="values.slot" #default>{{ values.slot }}</template>
            </component>
          </div>
          <figcaption>{{ f }}</figcaption>
        </figure>
      </div>
    </section>

    <section class="code" aria-label="Code">
      <h2 class="ds-label">Code</h2>
      <div class="code-row">
        <pre><code>{{ code }}</code></pre>
        <BaseButton compact @click="copy">{{ copied ? 'Copié' : 'Copier' }}</BaseButton>
      </div>
    </section>

    <DsReference :entry="entry" />
  </article>
</template>

<style scoped>
.entry {
  display: grid;
  gap: var(--space-7);
  min-width: 0;
}
header {
  display: grid;
  gap: var(--space-3);
}
.family {
  margin: 0;
  font-size: var(--text-sm);
  font-weight: var(--weight-bold);
  color: var(--color-text-subtle);
}
h1 {
  margin: 0;
  font-family: var(--font-display);
  font-weight: var(--weight-regular);
  font-size: var(--text-h2);
  line-height: var(--leading-display);
}
.description {
  margin: 0;
  max-width: var(--measure);
  color: var(--color-text-muted);
}
.toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-3) var(--space-5);
  font-size: var(--text-sm);
  font-weight: var(--weight-bold);
}
.toolbar label {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  min-height: var(--target-min);
}
.check input {
  width: var(--icon-sm);
  height: var(--icon-sm);
  accent-color: var(--color-action);
}
.widths {
  display: inline-flex;
  border: var(--border-thin) solid var(--color-border);
  border-radius: var(--radius-pill);
  overflow: hidden;
}
.widths button {
  min-height: var(--target-min);
  padding: 0 var(--space-4);
  border: 0;
  background: transparent;
  color: var(--color-text-muted);
  font: inherit;
  cursor: pointer;
}
.widths button[aria-checked='true'] {
  background: var(--color-text);
  color: var(--color-bg);
}
.workbench {
  display: grid;
  gap: var(--space-5);
  align-items: start;
}
@media (min-width: 1024px) {
  .workbench {
    grid-template-columns: minmax(0, 1fr) 17rem;
  }
}
.stage {
  overflow-x: auto;
  border: var(--border-thin) solid var(--color-border);
  border-radius: var(--radius-md);
}
iframe {
  display: block;
  max-width: none;
  border: 0;
}
.panel {
  padding: var(--space-5);
  border: var(--border-thin) solid var(--color-border);
  border-radius: var(--radius-md);
}
@media (min-width: 1024px) {
  .panel {
    position: sticky;
    top: calc(var(--header-height) + var(--space-5));
  }
}
.state-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 14rem), 1fr));
  gap: var(--space-4);
}
figure {
  margin: 0;
  display: grid;
  gap: var(--space-4);
  align-content: space-between;
  padding: var(--space-5);
  border-radius: var(--radius-md);
}
figcaption {
  font-size: var(--text-sm);
  color: var(--color-text-subtle);
}
.code-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-4);
}
pre {
  flex: 1;
  margin: 0;
  padding: var(--space-4);
  overflow-x: auto;
  border-radius: var(--radius-sm);
  background: var(--color-surface);
}
</style>

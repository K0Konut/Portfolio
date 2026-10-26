<script setup lang="ts">
import { ref } from 'vue'

/* Un élément à glisser jusqu'à une cible, où il se loge (design system § DragToSnap) : souris ou doigt
   (Pointer Events, bouton principal d'un seul pointeur), ou Entrée / Espace / appui bref, qui le logent
   directement. Relâché hors de portée, ou glisser interrompu, il revient à sa place.
   Le déplacement passe par la propriété `translate` : la page reste libre de `rotate`, `scale` ou `transform`,
   et stylise les états par les classes `dragging` et `placed`. */
const props = withDefaults(
  defineProps<{
    /** L'élément cible */
    target?: HTMLElement | null
    /** Distance de capture (px) */
    reach?: number
    /** Nom accessible du bouton */
    label: string
    disabled?: boolean
  }>(),
  { target: null, reach: 40, disabled: false },
)
const emit = defineEmits<{ near: [near: boolean]; snap: [] }>()

const el = ref<HTMLButtonElement>()
const offset = ref({ x: 0, y: 0 })
/** Glisser en cours : pointeur au départ, et décalage qui pose l'élément sur la cible */
const drag = ref<{ px: number; py: number; tx: number; ty: number }>()
const near = ref(false)
const placed = ref(false)
let dragged = false

/** Décalage du point de repos (position sans transformation) au centre de la cible */
function toTarget() {
  const button = el.value
  const parent = button?.offsetParent?.getBoundingClientRect()
  const goal = props.target?.getBoundingClientRect()
  if (!button || !parent || !goal) return { x: 0, y: 0 }
  return {
    x: goal.x + goal.width / 2 - (parent.x + button.offsetLeft + button.offsetWidth / 2),
    y: goal.y + goal.height / 2 - (parent.y + button.offsetTop + button.offsetHeight / 2),
  }
}

function setNear(value: boolean) {
  if (value === near.value) return
  near.value = value
  emit('near', value)
}

function place() {
  if (placed.value || props.disabled || !props.target) return
  offset.value = toTarget()
  placed.value = true
  emit('snap')
}

function onDown(event: PointerEvent) {
  if (placed.value || props.disabled || !event.isPrimary || event.button !== 0) return
  el.value?.setPointerCapture(event.pointerId)
  const { x, y } = toTarget()
  drag.value = {
    px: event.clientX - offset.value.x,
    py: event.clientY - offset.value.y,
    tx: x,
    ty: y,
  }
  dragged = false
}

// Une seule mesure, au départ : pendant le glisser, l'écart à la cible se calcule sans lire la mise en page
function onMove(event: PointerEvent) {
  const d = drag.value
  if (!d || !event.isPrimary) return
  offset.value = { x: event.clientX - d.px, y: event.clientY - d.py }
  dragged ||= Math.hypot(offset.value.x, offset.value.y) > 4
  setNear(Math.hypot(d.tx - offset.value.x, d.ty - offset.value.y) < props.reach)
}

function onUp(event: PointerEvent) {
  if (!drag.value || !event.isPrimary) return
  drag.value = undefined
  if (near.value && event.type === 'pointerup') place()
  else if (dragged || event.type !== 'pointerup') offset.value = { x: 0, y: 0 }
  setNear(false)
}

// Entrée et Espace déclenchent un « click » sans pointeur (detail 0) ; un appui bref aussi ; pas un glisser
function onClick(event: MouseEvent) {
  if (event.detail === 0 || !dragged) place()
  dragged = false
}
</script>

<template>
  <button
    ref="el"
    type="button"
    :class="['drag', { dragging: drag, placed }]"
    :style="{ '--x': `${offset.x}px`, '--y': `${offset.y}px` }"
    :aria-label="label"
    :disabled="disabled"
    @pointerdown="onDown"
    @pointermove="onMove"
    @pointerup="onUp"
    @pointercancel="onUp"
    @lostpointercapture="onUp"
    @click="onClick"
  >
    <slot />
  </button>
</template>

<style scoped>
/* Retour et mise en place en --duration-move (instantanés en mouvement réduit) ; la page ajoute ses propres
   transitions par --drag-transitions (rotation, couleur…) */
.drag {
  cursor: grab;
  touch-action: none;
  user-select: none;
  translate: var(--x) var(--y);
  transition:
    translate var(--duration-move) var(--ease-out),
    var(--drag-transitions, opacity 0s);
}
.dragging {
  cursor: grabbing;
  transition: none;
}
.placed {
  cursor: default;
}
</style>

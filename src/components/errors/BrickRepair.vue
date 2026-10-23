<script setup lang="ts">
import { onBeforeUnmount, ref, useId } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { reducedMotion } from '../../composables/motion'
import { useLocale } from '../../composables/useLocale'
import BaseButton from '../ui/BaseButton.vue'

/* Page 404 (design system § BrickRepair) : « Il manque une brique. » La brique tombée se glisse dans le trou
   du mur (souris ou doigt) ; relâchée à moins de REACH px du trou, elle s'y loge et la page mène à l'accueil.
   Au clavier ou d'un simple appui, le bouton la met en place directement. */
const REACH = 40
/** Délai avant le retour à l'accueil (ms) : le temps de voir le mur complet ; 300 ms en mouvement réduit */
const REDIRECT = 900

const { t } = useI18n()
const { to } = useLocale()
const router = useRouter()
const titleId = useId()

const brick = ref<HTMLButtonElement>()
const hole = ref<HTMLElement>()
const offset = ref({ x: 0, y: 0 })
const dragging = ref(false)
const near = ref(false)
const placed = ref(false)
const status = ref('')
let start: { x: number; y: number } | undefined
let dragged = false
let timer: ReturnType<typeof setTimeout> | undefined

/** Écart entre le centre de la brique et celui du trou */
function gap() {
  const b = brick.value?.getBoundingClientRect()
  const h = hole.value?.getBoundingClientRect()
  if (!b || !h) return { x: 0, y: 0 }
  return { x: h.x + h.width / 2 - b.x - b.width / 2, y: h.y + h.height / 2 - b.y - b.height / 2 }
}

function place() {
  if (placed.value) return
  const { x, y } = gap()
  offset.value = { x: offset.value.x + x, y: offset.value.y + y }
  placed.value = true
  status.value = t('notFound.done')
  timer = setTimeout(() => router.push(to('accueil')), reducedMotion().matches ? 300 : REDIRECT)
}

function onDown(event: PointerEvent) {
  if (placed.value) return
  brick.value?.setPointerCapture(event.pointerId)
  start = { x: event.clientX - offset.value.x, y: event.clientY - offset.value.y }
  dragged = false
  dragging.value = true
}

function onMove(event: PointerEvent) {
  if (!start) return
  offset.value = { x: event.clientX - start.x, y: event.clientY - start.y }
  dragged ||= Math.hypot(offset.value.x, offset.value.y) > 4
  const { x, y } = gap()
  near.value = Math.hypot(x, y) < REACH
}

/** Fin du glisser : près du trou, la brique s'y loge ; ailleurs (ou glisser interrompu), elle revient */
function onUp(event: PointerEvent) {
  if (!start) return
  start = undefined
  dragging.value = false
  if (near.value && event.type === 'pointerup') place()
  else if (dragged || event.type !== 'pointerup') offset.value = { x: 0, y: 0 }
  near.value = false
}

// Entrée, Espace ou un appui sans glisser déclenchent « click » ; un glisser, non
function onClick() {
  if (dragged) dragged = false
  else place()
}

onBeforeUnmount(() => clearTimeout(timer))
</script>

<template>
  <section class="repair fond-violet" :aria-labelledby="titleId">
    <div :class="['wall', { near, placed }]" aria-hidden="true">
      <div class="row"><i v-for="n in 5" :key="n" /></div>
      <div class="row"><i /><i /><i ref="hole" class="hole" /><i /></div>
      <div class="row"><i v-for="n in 5" :key="n" /></div>
    </div>
    <div class="ground">
      <button
        ref="brick"
        type="button"
        :class="['brick', { dragging, placed }]"
        :style="{ '--x': `${offset.x}px`, '--y': `${offset.y}px` }"
        :aria-label="t('notFound.brick')"
        @pointerdown="onDown"
        @pointermove="onMove"
        @pointerup="onUp"
        @pointercancel="onUp"
        @lostpointercapture="onUp"
        @click="onClick"
      />
    </div>
    <h1 :id="titleId" class="display">{{ t('notFound.title') }}</h1>
    <p class="lead">{{ t('notFound.text') }}</p>
    <p class="status" aria-live="polite">{{ status }}</p>
    <div class="actions">
      <BaseButton variant="primary" :to="to('accueil')">{{ t('notFound.home') }}</BaseButton>
      <BaseButton :to="to('projets')" icon="arrow-right">{{ t('notFound.projects') }}</BaseButton>
    </div>
  </section>
</template>

<style scoped>
.repair {
  --bw: var(--space-8);
  --bh: var(--space-6);
  min-height: calc(100svh - var(--space-9));
  display: grid;
  place-content: center;
  justify-items: center;
  gap: var(--space-5);
  padding: calc(var(--header-height) + var(--space-8)) var(--gutter) var(--space-9);
  overflow: hidden;
  text-align: center;
}
@media (max-width: 599px) {
  .repair {
    --bw: var(--space-7);
    --bh: var(--space-5);
  }
}
/* Mur crème de trois rangées appareillées, avec un trou en pointillés */
.wall {
  display: grid;
  gap: var(--space-2);
  justify-items: center;
}
.row {
  display: flex;
  gap: var(--space-2);
}
.row:nth-child(even) {
  transform: translateX(calc((var(--bw) + var(--space-2)) / 2));
}
.wall i,
.brick {
  display: block;
  width: var(--bw);
  height: var(--bh);
  border-radius: var(--radius-sm);
  background: var(--neutral-50);
}
.wall .hole {
  background: transparent;
  border: var(--border-strong) dashed var(--color-highlight);
  transition: border-color var(--duration-fast) var(--ease-out);
}
.near .hole {
  border-style: solid;
  background: color-mix(in srgb, var(--lime-500) 20%, transparent);
}
.placed .hole {
  visibility: hidden;
}
/* La brique tombée, inclinée ; elle se redresse en partie pendant le glisser, et passe en lime une fois placée */
.ground {
  height: calc(var(--space-6) * 2);
  display: grid;
  place-items: center;
}
.brick {
  --rot: -14deg;
  --s: 1;
  border: 0;
  padding: 0;
  cursor: grab;
  touch-action: none;
  user-select: none;
  transform: translate(var(--x), var(--y)) rotate(var(--rot)) scale(var(--s));
  transition:
    transform var(--duration-fast) var(--ease-out),
    background-color var(--duration-fast) var(--ease-out);
}
.brick.dragging {
  --rot: -4deg;
  --s: 1.06;
  cursor: grabbing;
  transition: none;
}
.brick.placed {
  --rot: 0deg;
  background: var(--lime-500);
  cursor: default;
}
h1 {
  font-size: var(--text-h1);
}
.status {
  margin: 0;
  min-height: 1.4em;
  font-size: var(--text-sm);
  color: var(--color-text-subtle);
}
.actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-3);
}
/* Animations réduites : pas de mouvement, la brique se met en place d'un coup */
@media (prefers-reduced-motion: reduce) {
  .brick {
    transition: none;
  }
}
</style>

<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { reducedMotion, seconds } from '../../composables/motion'
import { useLocale } from '../../composables/useLocale'
import PageIntro from '../sections/PageIntro.vue'
import BaseButton from '../ui/BaseButton.vue'

/* Page 404 (design system § BrickRepair) : « Il manque une brique. » La brique tombée se glisse dans le trou
   du mur (souris ou doigt) ; relâchée à moins de REACH px du trou, elle s'y loge et la page mène à l'accueil.
   Au clavier ou d'un simple appui, le bouton la met en place directement. */
const REACH = 40
/** Délai avant le retour à l'accueil (s) : le temps de voir le mur complet ; --duration-reduced en mouvement réduit */
const REDIRECT = 0.9

const { t } = useI18n()
const { to } = useLocale()
const router = useRouter()

const brick = ref<HTMLButtonElement>()
const hole = ref<HTMLElement>()
const offset = ref({ x: 0, y: 0 })
/** Glisser en cours : pointeur au départ, et centre du trou vu depuis la brique au repos */
const drag = ref<{ px: number; py: number; hx: number; hy: number }>()
const near = ref(false)
const placed = ref(false)
let dragged = false
let timer: ReturnType<typeof setTimeout> | undefined

/** Écart entre le centre de la brique et celui du trou (la rotation et l'échelle ne déplacent pas le centre) */
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
  const delay = reducedMotion().matches ? seconds('--duration-reduced') : REDIRECT
  timer = setTimeout(() => router.push(to('accueil')), delay * 1000)
}

function onDown(event: PointerEvent) {
  if (placed.value) return
  brick.value?.setPointerCapture(event.pointerId)
  const { x, y } = gap()
  const { x: ox, y: oy } = offset.value
  drag.value = { px: event.clientX - ox, py: event.clientY - oy, hx: ox + x, hy: oy + y }
  dragged = false
}

// Une seule mesure, au départ : pendant le glisser, l'écart au trou se calcule sans lire la mise en page
function onMove(event: PointerEvent) {
  const d = drag.value
  if (!d) return
  offset.value = { x: event.clientX - d.px, y: event.clientY - d.py }
  dragged ||= Math.hypot(offset.value.x, offset.value.y) > 4
  near.value = Math.hypot(d.hx - offset.value.x, d.hy - offset.value.y) < REACH
}

/** Fin du glisser : près du trou, la brique s'y loge ; ailleurs (ou glisser interrompu), elle revient */
function onUp(event: PointerEvent) {
  if (!drag.value) return
  drag.value = undefined
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
  <PageIntro :title="t('notFound.title')" class="repair" center full>
    <template #before>
      <div :class="['wall', { near, placed }]" aria-hidden="true">
        <div class="row"><i v-for="n in 5" :key="n" /></div>
        <div class="row"><i /><i /><i ref="hole" class="hole" /><i /></div>
        <div class="row"><i v-for="n in 5" :key="n" /></div>
      </div>
      <div class="ground">
        <button
          ref="brick"
          type="button"
          :class="['brick', { dragging: drag, placed }]"
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
    </template>
    {{ t('notFound.text') }}
    <template #after>
      <p class="status" aria-live="polite">{{ placed ? t('notFound.done') : '' }}</p>
      <div class="actions">
        <BaseButton variant="primary" :to="to('accueil')">{{ t('notFound.home') }}</BaseButton>
        <BaseButton :to="to('projets')" icon="arrow-right">{{ t('notFound.projects') }}</BaseButton>
      </div>
    </template>
  </PageIntro>
</template>

<style scoped>
.repair {
  --bw: var(--space-8);
  --bh: var(--space-6);
  overflow: hidden;
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
/* La brique tombée, inclinée ; elle se redresse en partie pendant le glisser, et passe en lime une fois placée.
   Animations réduites : --duration-move vaut 0, la brique se met en place d'un coup, la couleur change en fondu */
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
    transform var(--duration-move) var(--ease-out),
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
</style>

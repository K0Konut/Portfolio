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

const ground = ref<HTMLElement>()
const hole = ref<HTMLElement>()
const offset = ref({ x: 0, y: 0 })
/** Glisser en cours : pointeur au départ, et décalage qui pose la brique sur le trou */
const drag = ref<{ px: number; py: number; tx: number; ty: number }>()
const near = ref(false)
const placed = ref(false)
let dragged = false
let timer: ReturnType<typeof setTimeout> | undefined

/** Décalage du centre du sol (où la brique repose, immobile) au centre du trou */
function target() {
  const g = ground.value?.getBoundingClientRect()
  const h = hole.value?.getBoundingClientRect()
  if (!g || !h) return { x: 0, y: 0 }
  return { x: h.x + h.width / 2 - g.x - g.width / 2, y: h.y + h.height / 2 - g.y - g.height / 2 }
}

function place() {
  if (placed.value) return
  offset.value = target()
  placed.value = true
  const delay = reducedMotion().matches ? seconds('--duration-reduced') : REDIRECT
  timer = setTimeout(() => router.push(to('accueil')), delay * 1000)
}

// Le bouton principal d'un seul pointeur : ni clic droit, ni second doigt
function onDown(event: PointerEvent) {
  if (placed.value || !event.isPrimary || event.button !== 0) return
  ;(event.currentTarget as HTMLElement).setPointerCapture(event.pointerId)
  const { x, y } = target()
  const { x: ox, y: oy } = offset.value
  drag.value = { px: event.clientX - ox, py: event.clientY - oy, tx: x, ty: y }
  dragged = false
}

// Une seule mesure, au départ : pendant le glisser, l'écart au trou se calcule sans lire la mise en page
function onMove(event: PointerEvent) {
  const d = drag.value
  if (!d || !event.isPrimary) return
  offset.value = { x: event.clientX - d.px, y: event.clientY - d.py }
  dragged ||= Math.hypot(offset.value.x, offset.value.y) > 4
  near.value = Math.hypot(d.tx - offset.value.x, d.ty - offset.value.y) < REACH
}

/** Fin du glisser : près du trou, la brique s'y loge ; ailleurs (ou glisser interrompu), elle revient */
function onUp(event: PointerEvent) {
  if (!drag.value || !event.isPrimary) return
  drag.value = undefined
  if (near.value && event.type === 'pointerup') place()
  else if (dragged || event.type !== 'pointerup') offset.value = { x: 0, y: 0 }
  near.value = false
}

// Entrée et Espace déclenchent un « click » sans pointeur (detail 0) : toujours une mise en place.
// Un appui bref aussi ; le « click » qui suit un glisser à la souris, non.
function onClick(event: MouseEvent) {
  if (event.detail === 0 || !dragged) place()
  dragged = false
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
      <div ref="ground" class="ground">
        <button
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
@media (max-width: 767px) {
  .repair {
    --bw: var(--space-7);
    --bh: var(--space-5);
  }
}
/* Mur crème de trois rangées appareillées (centrée, la rangée de quatre est décalée d'une demi-brique),
   avec un trou en pointillés */
.wall {
  display: grid;
  gap: var(--space-2);
  justify-items: center;
}
.row {
  display: flex;
  gap: var(--space-2);
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

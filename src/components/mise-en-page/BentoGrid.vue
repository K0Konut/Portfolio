<script setup lang="ts">
import { onBeforeUnmount, ref, watch, type VNode } from 'vue'
import { reducedMotion } from '../../composables/motion'
import { slotChildren } from '../../composables/slotChildren'

/* Grille bento (design system § BentoGrid) : le premier enfant en grand. Chaque cellule pose --stage
   (fond de capture de DeviceFrame) selon sa place. Avec `glow`, à la souris, les enfants proches du pointeur
   s'allument (bord et halo), d'autant plus qu'il est près, et l'enfant survolé s'incline vers lui.
   Une seule écriture par image. Contrat avec l'enfant : une grille dont la première ligne est le média
   (la grande cellule l'étire, la cellule large le met à gauche), et un titre h3, agrandi dans la grande. */
const props = withDefaults(
  defineProps<{
    glow?: boolean
    /** Portée de la lueur (px) */
    reach?: number
    /** Inclinaison maximale (degrés) */
    tilt?: number
  }>(),
  { glow: false, reach: 320, tilt: 3 },
)
const slots = defineSlots<{ default(): VNode[] }>()

const grid = ref<HTMLElement>()
let frame = 0
let pointer: { x: number; y: number } | undefined
const reduced = import.meta.env.SSR ? undefined : reducedMotion()

function cells() {
  return grid.value ? [...grid.value.querySelectorAll<HTMLElement>(':scope > li')] : []
}

function paint() {
  frame = 0
  if (!pointer) return
  const { x: px, y: py } = pointer
  // Toutes les lectures avant les écritures : une seule mise en page par image. On mesure la cellule, qui ne
  // s'incline pas : mesurer l'enfant incliné ferait clignoter l'inclinaison au bord.
  const rects = cells().map((cell) => [cell, cell.getBoundingClientRect()] as const)
  for (const [cell, r] of rects) {
    const x = px - r.left
    const y = py - r.top
    const distance = Math.hypot(
      Math.max(r.left - px, 0, px - r.right),
      Math.max(r.top - py, 0, py - r.bottom),
    )
    const tilt = distance === 0 && !reduced?.matches
    cell.style.setProperty('--mx', `${x}px`)
    cell.style.setProperty('--my', `${y}px`)
    cell.style.setProperty('--glow', Math.max(0, 1 - distance / props.reach).toFixed(3))
    cell.style.setProperty(
      '--rx',
      tilt ? `${((0.5 - y / r.height) * props.tilt * 2).toFixed(2)}deg` : '0deg',
    )
    cell.style.setProperty(
      '--ry',
      tilt ? `${((x / r.width - 0.5) * props.tilt * 2).toFixed(2)}deg` : '0deg',
    )
  }
}

function onMove(event: PointerEvent) {
  if (!props.glow || event.pointerType !== 'mouse') return
  pointer = { x: event.clientX, y: event.clientY }
  frame ||= requestAnimationFrame(paint)
}

function onLeave() {
  pointer = undefined
  cancelAnimationFrame(frame)
  frame = 0
  for (const cell of cells()) {
    cell.style.setProperty('--glow', '0')
    cell.style.setProperty('--rx', '0deg')
    cell.style.setProperty('--ry', '0deg')
  }
}

watch(
  () => props.glow,
  (on) => on || onLeave(),
)
onBeforeUnmount(() => cancelAnimationFrame(frame))
</script>

<template>
  <ul ref="grid" class="bento" @pointermove="onMove" @pointerleave="onLeave">
    <li
      v-for="(child, i) in slotChildren(slots.default?.())"
      :key="child.key ?? i"
      v-reveal="i % 3"
    >
      <component :is="child" class="tile" />
    </li>
  </ul>
</template>

<style scoped>
.bento {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: var(--space-4);
}
/* La cellule porte la position du pointeur et l'état de la lueur ; l'enfant les hérite */
li {
  --mx: 50%;
  --my: 50%;
  --glow: 0;
  --rx: 0deg;
  --ry: 0deg;
  display: grid;
}

/* Fond de capture (DA §5) : la teinte suit la place de la cellule, deux voisines n'ont jamais la même,
   sur mobile (1 colonne), tablette (2) et bureau (3). Cycle de quatre teintes à partir de la 6e ;
   la grande cellule en lime, et les cellules 2 à 5, qui la touchent sur bureau, jamais en lime. Jamais de violet vif. */
li:nth-child(4n + 1) {
  --stage: var(--violet-700);
}
li:nth-child(4n + 2),
li:first-child {
  --stage: var(--lime-500);
}
li:nth-child(4n + 3) {
  --stage: var(--pink-500);
}
li:nth-child(4n + 4) {
  --stage: var(--neutral-700);
}
li:nth-child(2) {
  --stage: var(--violet-700);
}

/* Enfant : droit ; la lueur (deux pseudo-éléments sous son contenu) et l'inclinaison suivent le pointeur */
li > :deep(.tile) {
  position: relative;
  isolation: isolate;
  transform: perspective(900px) rotateX(var(--rx)) rotateY(var(--ry));
}
li > :deep(.tile)::before,
li > :deep(.tile)::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: inherit;
  pointer-events: none;
  opacity: var(--glow);
}
li > :deep(.tile)::before {
  background: radial-gradient(
    30rem circle at var(--mx) var(--my),
    color-mix(in srgb, var(--violet-500) 30%, transparent),
    transparent 60%
  );
}
li > :deep(.tile)::after {
  padding: 2px;
  background: radial-gradient(
    24rem circle at var(--mx) var(--my),
    var(--pink-500),
    var(--violet-500) 40%,
    transparent 75%
  );
  mask:
    linear-gradient(#000 0 0) content-box exclude,
    linear-gradient(#000 0 0);
}

@media (min-width: 768px) {
  .bento {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  li:first-child {
    grid-column: 1 / -1;
  }
}
/* Bureau : le premier en 2 × 2, deux cellules à droite, puis une simple et une large ;
   au-delà de cinq, les suivants se rangent à la suite */
@media (min-width: 1024px) {
  .bento {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  li:first-child {
    grid-column: span 2;
    grid-row: span 2;
  }
  li:first-child > :deep(.tile) {
    grid-template-rows: minmax(22rem, 1fr) auto;
  }
  li:first-child :deep(.frame) {
    aspect-ratio: auto;
  }
  li:first-child :deep(h3) {
    font-size: var(--text-h2);
  }
  li:nth-child(5) {
    grid-column: span 2;
  }
  /* Cellule large : le média à gauche, le texte à droite */
  li:nth-child(5) > :deep(.tile) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-template-rows: minmax(14rem, 1fr);
    column-gap: var(--space-5);
    align-items: center;
  }
  li:nth-child(5) :deep(.frame) {
    align-self: stretch;
    aspect-ratio: auto;
  }
}
</style>

<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import { reducedMotion } from '../../composables/motion'
import type { ProjectSummary } from '../../content/types'
import ProjectCard from './ProjectCard.vue'

/* Bento magique de la page Projets (design system § ProjectBento) : du plus récent au plus ancien,
   le premier en grand. À la souris, les tuiles proches du pointeur s'allument (bord et halo), d'autant
   plus qu'il est près ; la tuile survolée s'incline vers lui. Une seule écriture par image. */
defineProps<{ projects: ProjectSummary[] }>()

/** Portée de la lueur (px) et inclinaison maximale (degrés) */
const REACH = 320
const TILT = 3

const grid = ref<HTMLElement>()
let frame = 0
let pointer: { x: number; y: number } | undefined
const reduced = import.meta.env.SSR ? undefined : reducedMotion()

function tiles() {
  return grid.value ? [...grid.value.querySelectorAll<HTMLElement>('.tile')] : []
}

function paint() {
  frame = 0
  if (!pointer) return
  const { x: px, y: py } = pointer
  // Toutes les lectures avant les écritures : une seule mise en page par image. On mesure le <li>, qui ne
  // s'incline pas : mesurer la tuile inclinée ferait clignoter l'inclinaison au bord.
  const rects = tiles().map(
    (tile) => [tile, (tile.parentElement ?? tile).getBoundingClientRect()] as const,
  )
  for (const [tile, r] of rects) {
    const x = px - r.left
    const y = py - r.top
    const distance = Math.hypot(
      Math.max(r.left - px, 0, px - r.right),
      Math.max(r.top - py, 0, py - r.bottom),
    )
    const tilt = distance === 0 && !reduced?.matches
    tile.style.setProperty('--mx', `${x}px`)
    tile.style.setProperty('--my', `${y}px`)
    tile.style.setProperty('--glow', Math.max(0, 1 - distance / REACH).toFixed(3))
    tile.style.setProperty(
      '--rx',
      tilt ? `${((0.5 - y / r.height) * TILT * 2).toFixed(2)}deg` : '0deg',
    )
    tile.style.setProperty(
      '--ry',
      tilt ? `${((x / r.width - 0.5) * TILT * 2).toFixed(2)}deg` : '0deg',
    )
  }
}

function onMove(event: PointerEvent) {
  if (event.pointerType !== 'mouse') return
  pointer = { x: event.clientX, y: event.clientY }
  frame ||= requestAnimationFrame(paint)
}

function onLeave() {
  pointer = undefined
  cancelAnimationFrame(frame)
  frame = 0
  for (const tile of tiles()) {
    tile.style.setProperty('--glow', '0')
    tile.style.setProperty('--rx', '0deg')
    tile.style.setProperty('--ry', '0deg')
  }
}

onBeforeUnmount(() => cancelAnimationFrame(frame))
</script>

<template>
  <ul ref="grid" class="bento" @pointermove="onMove" @pointerleave="onLeave">
    <li v-for="(project, i) in projects" :key="project.slug" v-reveal="i % 3">
      <ProjectCard class="tile" :project="project" />
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
li {
  display: grid;
}

/* Fond de capture (DA §5) : la teinte suit la place de la tuile, deux voisines n'ont jamais la même,
   sur mobile (1 colonne), tablette (2) et bureau (3). Cycle de quatre teintes à partir de la 6e ;
   la grande tuile en lime, et les tuiles 2 à 5, qui la touchent sur bureau, jamais en lime. Jamais de violet vif. */
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

/* Tuile : droite ; la lueur (deux pseudo-éléments sous le contenu) et l'inclinaison suivent le pointeur */
.tile {
  --mx: 50%;
  --my: 50%;
  --glow: 0;
  --rx: 0deg;
  --ry: 0deg;
  isolation: isolate;
  transform: perspective(900px) rotateX(var(--rx)) rotateY(var(--ry));
}
.tile::before,
.tile::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: inherit;
  pointer-events: none;
  opacity: var(--glow);
}
.tile::before {
  background: radial-gradient(
    30rem circle at var(--mx) var(--my),
    color-mix(in srgb, var(--violet-500) 30%, transparent),
    transparent 60%
  );
}
.tile::after {
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
/* Bureau : le plus récent en 2 × 2, deux tuiles à droite, puis une simple et une large ;
   au-delà de cinq projets, les suivantes se rangent à la suite */
@media (min-width: 1024px) {
  .bento {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  li:first-child {
    grid-column: span 2;
    grid-row: span 2;
  }
  li:first-child .tile {
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
  /* Tuile large : capture à gauche, texte à droite */
  li:nth-child(5) .tile {
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

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

/* Méthode en cycle de six étapes (design system § ProcessSteps, variante « cycle ») : anneau numéroté
   sur bureau, frise verticale en boucle sur mobile et tablette. L'étape k est à 30° + 60°·k, dans le sens
   horaire depuis le haut ; le retour de 6 vers 1 est en pointillés. */
const { t, tm } = useI18n()
const steps = computed(() => tm('method.steps') as { title: string; text: string }[])

const R = 170
const GAP = 10
const point = (deg: number, r = R) => {
  const a = (deg * Math.PI) / 180
  return [200 + r * Math.sin(a), 200 - r * Math.cos(a)].map((n) => +n.toFixed(1)) as [
    number,
    number,
  ]
}
const angle = (k: number) => 30 + 60 * k
const arcs = computed(() =>
  steps.value.map((_, k) => {
    const [x1, y1] = point(angle(k) + GAP)
    const [x2, y2] = point(angle(k + 1) - GAP)
    return { d: `M${x1} ${y1}A${R} ${R} 0 0 1 ${x2} ${y2}`, back: k === steps.value.length - 1 }
  }),
)
const dots = computed(() => steps.value.map((_, k) => point(angle(k))))
// Place du texte de chaque étape autour de l'anneau : côté, hauteur (en rayons), rapprochement
const PLACES = [
  ['droite', -0.866, 0.4],
  ['droite', 0, 0],
  ['droite', 0.866, 0.4],
  ['gauche', 0.866, 0.4],
  ['gauche', 0, 0],
  ['gauche', -0.866, 0.4],
] as const
</script>

<template>
  <div class="cycle">
    <svg viewBox="0 0 400 400" aria-hidden="true">
      <defs>
        <marker
          id="ring-tip"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="10"
          markerHeight="10"
          markerUnits="userSpaceOnUse"
          orient="auto"
        >
          <path class="arrow" d="M0 0L10 5L0 10z" />
        </marker>
      </defs>
      <path
        v-for="(arc, k) in arcs"
        :key="k"
        :class="['line', { back: arc.back }]"
        marker-end="url(#ring-tip)"
        :d="arc.d"
      />
      <template v-for="([x, y], k) in dots" :key="`dot-${k}`">
        <circle :class="['dot', { last: k === dots.length - 1 }]" :cx="x" :cy="y" r="18" />
        <text :class="['num', { last: k === dots.length - 1 }]" :x="x" :y="y">{{ k + 1 }}</text>
      </template>
    </svg>
    <ol class="steps">
      <li
        v-for="(step, k) in steps"
        :key="k"
        v-reveal="k"
        :class="PLACES[k]?.[0]"
        :style="{ '--dy': PLACES[k]?.[1], '--sh': PLACES[k]?.[2] }"
      >
        <span class="n">{{ k + 1 }}</span>
        <div>
          <b>{{ step.title }}</b>
          <p>{{ step.text }}</p>
        </div>
      </li>
    </ol>
    <p class="loop">{{ t('method.loop') }}</p>
  </div>
</template>

<style scoped>
/* Mobile et tablette : frise verticale, puis la ligne remonte par la gauche jusqu'à la première étape */
.cycle {
  position: relative;
  padding-left: var(--space-5);
}
.cycle::after {
  content: '';
  position: absolute;
  left: 4px;
  width: 27px;
  top: 10px;
  bottom: 10px;
  border: var(--border-strong) solid var(--color-text);
  border-right: 0;
  border-radius: var(--radius-sm) 0 0 var(--radius-sm);
}
svg {
  display: none;
}
.steps {
  position: relative;
  list-style: none;
  margin: 0;
  padding: 0 0 0 var(--space-7);
  display: grid;
  gap: var(--space-6);
}
.steps::before {
  content: '';
  position: absolute;
  left: 7px;
  top: 8px;
  bottom: calc(-1 * (var(--space-6) + 10px));
  width: var(--border-strong);
  background: var(--color-text);
}
li {
  position: relative;
  z-index: 1;
  display: grid;
  gap: var(--space-1);
  align-content: start;
}
li::before {
  content: '';
  position: absolute;
  left: calc(-1 * var(--space-7));
  top: 2px;
  width: 16px;
  height: 16px;
  border-radius: var(--radius-pill);
  border: var(--border-strong) solid var(--color-text);
  background: var(--color-bg);
}
li:last-child::before {
  background: var(--color-action);
  border-color: var(--color-action);
}
li:first-child::after {
  content: '';
  position: absolute;
  left: calc(-1 * var(--space-7) - 7px);
  top: 5px;
  border-left: 7px solid var(--color-text);
  border-block: 5px solid transparent;
}
.n {
  font-size: var(--text-sm);
  font-weight: var(--weight-bold);
  line-height: var(--leading-none);
  color: var(--color-text-subtle);
  font-variant-numeric: tabular-nums;
}
b {
  display: block;
  font-size: var(--text-lead);
  line-height: var(--leading-snug);
}
li p {
  margin: var(--space-1) 0 0;
  max-width: 32ch;
  color: var(--color-text-muted);
}
.loop {
  margin: var(--space-6) 0 0 var(--space-7);
  font-size: var(--text-sm);
  font-weight: var(--weight-bold);
  line-height: 20px;
}

/* Bureau : l'anneau au centre, les étapes autour */
@media (min-width: 1024px) {
  .cycle {
    --D: 400px;
    --r: calc(var(--D) * 0.425);
    height: var(--D);
    padding: 0;
  }
  .cycle::after,
  .steps::before,
  li::before,
  li:first-child::after {
    display: none;
  }
  svg {
    display: block;
    position: absolute;
    left: 50%;
    top: 0;
    width: var(--D);
    height: var(--D);
    transform: translateX(-50%);
    overflow: visible;
  }
  .steps {
    position: static;
    display: block;
    padding: 0;
  }
  li {
    position: absolute;
    top: calc(50% + var(--dy) * var(--r));
    transform: translateY(-50%);
    width: calc(50% - var(--D) / 2 - var(--space-6));
  }
  li.reveal.is-pending {
    transform: translateY(calc(-50% + var(--reveal-distance)));
  }
  .droite {
    left: calc(50% + var(--D) / 2 + var(--space-5) - var(--sh) * var(--r));
  }
  .gauche {
    right: calc(50% + var(--D) / 2 + var(--space-5) - var(--sh) * var(--r));
    text-align: right;
  }
  .gauche p {
    margin-left: auto;
  }
  .n {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
  }
  .loop {
    position: absolute;
    top: 50%;
    left: 50%;
    max-width: 14ch;
    margin: 0;
    transform: translate(-50%, -50%);
    text-align: center;
    font-size: var(--text-body);
    line-height: var(--leading-snug);
  }
}
.line {
  fill: none;
  stroke: var(--color-text);
  stroke-width: 1.5;
}
.back {
  stroke-dasharray: 5 6;
}
.arrow {
  fill: var(--color-text);
}
.dot {
  fill: var(--color-bg);
  stroke: var(--color-text);
  stroke-width: 1.5;
}
.dot.last {
  fill: var(--color-action);
  stroke: var(--color-action);
}
.num {
  fill: var(--color-text);
  font: var(--weight-regular) 18px / 1 var(--font-display);
  text-anchor: middle;
  dominant-baseline: central;
}
.num.last {
  fill: var(--color-on-action);
}
</style>

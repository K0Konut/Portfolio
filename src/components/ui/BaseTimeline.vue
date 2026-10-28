<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import type { RouteLocationRaw } from 'vue-router'
import { loadScrollTrigger } from '../../composables/motion'
import BaseTag from './BaseTag.vue'
import TextLink from './TextLink.vue'

export interface TimelineItem {
  tag?: string
  date?: string
  title: string
  subtitle?: string
  text?: string
  link?: { to: RouteLocationRaw; label: string }
}

/* Frise d'étapes, de la plus ancienne à la plus récente (design system § BaseTimeline). Avec `draw`, un fil
   se trace par-dessus le premier au rythme du scroll, et chaque repère se remplit quand le fil l'atteint.
   Sans JavaScript, en mouvement réduit, sans GSAP ou sans `draw` : fil tracé et repères remplis. */
const props = withDefaults(
  defineProps<{
    items: TimelineItem[]
    /** Frise centrée alternée à partir de 1024 px */
    alternate?: boolean
    /** Fil tracé au scroll */
    draw?: boolean
  }>(),
  { alternate: true, draw: true },
)
defineSlots<{ item(props: { item: TimelineItem; index: number }): unknown }>()
const root = ref<HTMLElement>()
const live = ref(false)

// Chargement lancé dès la création, pour ne pas attendre le montage
if (props.draw) loadScrollTrigger()

let ctx: { revert(): void } | undefined
let gone = false
/** Numéro du dernier appel : un appel qui attendait GSAP pendant qu'un réglage changeait n'agit plus */
let run = 0

onMounted(animate)
// Le routeur garde la page d'une langue à l'autre : les nouvelles étapes reçoivent leurs déclencheurs ;
// `alternate` change la hauteur des étapes, donc la place des déclencheurs
watch([() => props.items, () => props.draw, () => props.alternate], animate, { flush: 'post' })
onBeforeUnmount(() => {
  gone = true
  ctx?.revert()
})

async function animate() {
  const current = ++run
  const loaded = props.draw ? await loadScrollTrigger() : undefined
  const el = root.value
  if (gone || current !== run || !el) return
  ctx?.revert()
  ctx = undefined
  for (const step of el.querySelectorAll(':scope > ol > li')) step.classList.remove('on')
  live.value = !!loaded
  if (!loaded) return
  const { gsap, ScrollTrigger } = loaded
  // Le fil et les repères partagent la même ligne : 65 % de la hauteur de l'écran
  ctx = gsap.context(() => {
    gsap.fromTo(
      '.fill',
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top 65%', end: 'bottom 65%', scrub: 0.4 },
      },
    )
    for (const step of el.querySelectorAll(':scope > ol > li')) {
      ScrollTrigger.create({
        trigger: step,
        start: 'top 65%',
        onEnter: () => step.classList.add('on'),
        onLeaveBack: () => step.classList.remove('on'),
      })
    }
  }, el)
}
</script>

<template>
  <div ref="root" :class="['timeline', { live, alternate }]">
    <span class="fill" aria-hidden="true" />
    <ol>
      <li v-for="(item, i) in items" :key="i">
        <slot name="item" :item="item" :index="i">
          <BaseTag v-if="item.tag">{{ item.tag }}</BaseTag>
          <time v-if="item.date">{{ item.date }}</time>
          <b>{{ item.title }}</b>
          <span v-if="item.subtitle">{{ item.subtitle }}</span>
          <p v-if="item.text">{{ item.text }}</p>
          <TextLink v-if="item.link" variant="standalone" :to="item.link.to" icon="arrow-right">{{
            item.link.label
          }}</TextLink>
        </slot>
      </li>
    </ol>
  </div>
</template>

<style scoped>
.timeline {
  --wire: calc(var(--timeline-dot) / 2 - var(--border-strong) / 2);
  position: relative;
  max-width: 46rem;
}
/* Le fil gris, et le fil lime qui se trace par-dessus */
.timeline::before,
.fill {
  content: '';
  position: absolute;
  left: var(--wire);
  top: var(--space-2);
  bottom: var(--space-2);
  width: var(--border-strong);
  background: var(--color-border);
}
.fill {
  background: var(--color-highlight);
  transform-origin: 50% 0;
}
ol {
  list-style: none;
  margin: 0;
  padding: 0 0 0 calc(var(--timeline-dot) + var(--space-5));
  display: grid;
  gap: var(--space-7);
}
li {
  position: relative;
  display: grid;
  gap: var(--space-2);
  justify-items: start;
}
li::before {
  content: '';
  position: absolute;
  left: calc(-1 * (var(--timeline-dot) + var(--space-5)));
  top: var(--space-1);
  width: var(--timeline-dot);
  height: var(--timeline-dot);
  border-radius: var(--radius-pill);
  border: var(--border-strong) solid var(--color-highlight);
  background: var(--color-highlight);
  transition: background-color var(--duration-fast) var(--ease-out);
}
.live li:not(.on)::before {
  background: var(--color-bg);
}
time {
  font-size: var(--text-sm);
  color: var(--color-text-subtle);
}
b {
  font-size: var(--text-lead);
  line-height: var(--leading-snug);
}
p {
  margin: 0;
  color: var(--color-text-muted);
  max-width: var(--measure);
}

/* Bureau : frise centrée alternée, le fil au milieu, une étape à gauche (texte à droite), la suivante à droite */
@media (min-width: 1024px) {
  .alternate {
    --wire: calc(50% - var(--border-strong) / 2);
    max-width: none;
  }
  .alternate ol {
    padding: 0;
  }
  .alternate li {
    width: calc(50% - var(--space-7));
  }
  .alternate li:nth-child(odd) {
    justify-self: start;
    justify-items: end;
    text-align: right;
  }
  .alternate li:nth-child(even) {
    justify-self: end;
  }
  .alternate li:nth-child(odd)::before {
    left: auto;
    right: calc(-1 * (var(--space-7) + var(--timeline-dot) / 2));
  }
  .alternate li:nth-child(even)::before {
    left: calc(-1 * (var(--space-7) + var(--timeline-dot) / 2));
  }
}
</style>

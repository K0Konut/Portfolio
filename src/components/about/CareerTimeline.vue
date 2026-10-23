<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { reducedMotion } from '../../composables/motion'
import { useLocale } from '../../composables/useLocale'
import type { TimelineStep } from '../../content/types'
import BaseTag from '../ui/BaseTag.vue'
import TextLink from '../ui/TextLink.vue'

/* Parcours de la page À propos (design system § CareerTimeline), du plus ancien au plus récent. Temps fort piloté
   par le scroll (DA §6) : un fil lime se trace par-dessus le premier, et chaque repère se remplit quand le fil
   l'atteint. Sans JavaScript, en mouvement réduit ou sans GSAP : fil tracé et repères remplis. */
const props = defineProps<{ steps: TimelineStep[] }>()
const { t } = useI18n()
const { to } = useLocale()
const root = ref<HTMLElement>()
const live = ref(false)

const reduce = !import.meta.env.SSR && reducedMotion().matches
const libraries =
  import.meta.env.SSR || reduce
    ? undefined
    : Promise.all([import('gsap'), import('gsap/ScrollTrigger')])

let loaded: Awaited<NonNullable<typeof libraries>> | undefined
let ctx: { revert(): void } | undefined
let gone = false

onMounted(async () => {
  loaded = await libraries?.catch(() => undefined)
  if (gone || !loaded) return
  loaded[0].gsap.registerPlugin(loaded[1].ScrollTrigger)
  live.value = true
  animate()
})
// D'une langue à l'autre, le routeur garde la page : les nouvelles étapes reçoivent leurs déclencheurs
watch(() => props.steps, animate, { flush: 'post' })
onBeforeUnmount(() => {
  gone = true
  ctx?.revert()
})

function animate() {
  const el = root.value
  if (!el || !loaded) return
  const [{ gsap }, { ScrollTrigger }] = loaded
  ctx?.revert()
  for (const step of el.querySelectorAll('li')) step.classList.remove('on')
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
    for (const step of el.querySelectorAll('li')) {
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
  <div ref="root" :class="['timeline', { live }]">
    <span class="fill" aria-hidden="true" />
    <ol>
      <li v-for="(step, i) in steps" :key="i">
        <BaseTag>{{ step.kind }}</BaseTag>
        <time>{{ step.dates }}</time>
        <b>{{ step.title }}</b>
        <span class="place">{{ step.place }}</span>
        <p>{{ step.text }}</p>
        <TextLink
          v-if="step.caseStudy"
          variant="standalone"
          :to="to('etude-de-cas', { slug: step.caseStudy })"
          icon="arrow-right"
          >{{ t('about.caseStudy') }}</TextLink
        >
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
  .timeline {
    --wire: calc(50% - var(--border-strong) / 2);
    max-width: none;
  }
  ol {
    padding: 0;
  }
  li {
    width: calc(50% - var(--space-7));
  }
  li:nth-child(odd) {
    justify-self: start;
    justify-items: end;
    text-align: right;
  }
  li:nth-child(even) {
    justify-self: end;
  }
  li:nth-child(odd)::before {
    left: auto;
    right: calc(-1 * (var(--space-7) + var(--timeline-dot) / 2));
  }
  li:nth-child(even)::before {
    left: calc(-1 * (var(--space-7) + var(--timeline-dot) / 2));
  }
}
</style>

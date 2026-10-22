<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { bezier, number, reducedMotion, seconds, token } from '../../composables/motion'
import { useLocale } from '../../composables/useLocale'
import { SITE } from '../../content/site'
import BaseButton from '../ui/BaseButton.vue'
import HeroName from './HeroName.vue'
import ScrollHint from './ScrollHint.vue'
import TopoBackground from './TopoBackground.vue'

/* Section d'accueil (design system § Section d'accueil, DA §6) : une seule timeline d'environ 1,5 s,
   puis l'effacement au scroll ; toutes les valeurs viennent des tokens de mouvement.
   La page porte data-intro="pending" dès le HTML pré-rendu : le contenu et l'en-tête restent cachés
   jusqu'au départ de l'entrée (3 s au plus, en secours ; rien n'est caché sans JavaScript). */
const { t } = useI18n()
const { locale, to } = useLocale()
const root = ref<HTMLElement>()
const pending = ref(true)
useHead({ htmlAttrs: { 'data-intro': computed(() => (pending.value ? 'pending' : undefined)) } })

// GSAP se télécharge pendant l'hydratation (pas d'attente supplémentaire au montage) ;
// ScrollTrigger n'est utile qu'avec les animations complètes
const reduce = !import.meta.env.SSR && reducedMotion().matches
const libraries = import.meta.env.SSR
  ? undefined
  : Promise.all([import('gsap'), reduce ? undefined : import('gsap/ScrollTrigger')])

let ctx: { revert(): void } | undefined

onMounted(async () => {
  const el = root.value
  if (!el || !libraries) return
  const [{ gsap }, trigger] = await libraries
  const ScrollTrigger = trigger?.ScrollTrigger
  if (ScrollTrigger) gsap.registerPlugin(ScrollTrigger)

  const [x1, y1, x2, y2] = bezier('--ease-out')
  const ease = (p: number) => cubicBezier(x1, y1, x2, y2, p)
  const base = seconds('--duration-base')
  const hint = seconds('--duration-hint')
  const travel = number('--hint-travel')
  const track = number('--hint-height')

  ctx = gsap.context(() => {
    const tl = gsap.timeline({ paused: true, defaults: { ease } })
    if (!ScrollTrigger) {
      tl.fromTo(
        ['.name-wrap', '.rest', '.hint'],
        { opacity: 0 },
        { opacity: 1, duration: seconds('--duration-reduced'), ease: 'none' },
      )
    } else {
      const rise = number('--reveal-distance')
      tl.fromTo(
        '.letter',
        { y: token('--letter-rise'), opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: seconds('--duration-letter'),
          stagger: seconds('--stagger-letter'),
        },
        0,
      )
        .fromTo(
          '.who, .promise',
          { y: rise, opacity: 0 },
          { y: 0, opacity: 1, duration: base, stagger: seconds('--stagger-block') },
          0.4,
        )
        .fromTo('.promise .hl', { opacity: 0 }, { opacity: 1, duration: base * 0.7 }, 0.5)
        .fromTo(
          '.actions',
          { y: rise * 0.67, opacity: 0 },
          { y: 0, opacity: 1, duration: base * 0.7 },
          0.6,
        )
        .fromTo('.hint', { opacity: 0 }, { opacity: 1, duration: 0.4 }, 1.5)
        // Deux allers du repère sur la piste, puis il s'immobilise (WCAG 2.2.2 : jamais de boucle)
        .fromTo(
          '.segment',
          { y: -travel, opacity: 0 },
          {
            keyframes: [
              { opacity: 1, duration: hint * 0.2 },
              { y: track - travel, duration: hint * 0.67, ease: 'sine.inOut' },
              { opacity: 0, duration: hint * 0.13 },
            ],
            repeat: 1,
          },
          1.6,
        )
        .set('.segment', { y: 0, opacity: 1 })

      // Au scroll : le nom descend à --hero-parallax de la vitesse et s'estompe ; le reste s'estompe d'abord.
      // Point de départ explicite : à cet instant, le contenu est encore caché par l'attente
      const parallax = number('--hero-parallax')
      gsap.fromTo(
        '.name-wrap',
        { y: 0, opacity: 1 },
        {
          y: () => el.offsetHeight * parallax,
          opacity: 0,
          ease: 'none',
          immediateRender: false,
          scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true },
        },
      )
      gsap.fromTo(
        '.rest',
        { opacity: 1 },
        {
          opacity: 0,
          ease: 'none',
          immediateRender: false,
          scrollTrigger: { trigger: el, start: 'top top', end: 'center top', scrub: true },
        },
      )
      ScrollTrigger.create({
        trigger: el,
        start: 'top+=10 top',
        once: true,
        onEnter: () => gsap.to('.hint', { opacity: 0, duration: 0.3 }),
      })
    }
    // L'entrée attend la police Bagel (300 ms au plus), pour ne pas animer une police de secours ;
    // les repères du scroll sont recalculés une fois les polices posées
    Promise.race([
      document.fonts.load('1em "Bagel Fat One"'),
      new Promise((resolve) => setTimeout(resolve, 300)),
    ]).then(() => {
      pending.value = false
      tl.play(0)
      document.fonts.ready.then(() => ScrollTrigger?.refresh())
    })
  }, el)
})
onBeforeUnmount(() => ctx?.revert())

/** Courbe de Bézier cubique (x1, y1, x2, y2) évaluée en p, comme cubic-bezier() en CSS */
function cubicBezier(x1: number, y1: number, x2: number, y2: number, p: number) {
  const at = (a: number, b: number, s: number) =>
    3 * a * s * (1 - s) ** 2 + 3 * b * s ** 2 * (1 - s) + s ** 3
  let lo = 0
  let hi = 1
  let s = p
  for (let i = 0; i < 20; i++) {
    s = (lo + hi) / 2
    if (at(x1, x2, s) < p) lo = s
    else hi = s
  }
  return at(y1, y2, s)
}
</script>

<template>
  <section ref="root" class="hero fond-violet" aria-labelledby="nom">
    <TopoBackground />
    <div class="inner">
      <div id="nom" class="name-wrap" data-intro-hide><HeroName :name="SITE.name" /></div>
      <div class="rest" data-intro-hide>
        <p class="who-lines">
          <span class="who">{{ t('hero.status') }}</span>
          <span class="who">{{ t('hero.goal') }}</span>
        </p>
        <p class="lead promise">
          {{ t('hero.promise') }} <span class="hl">{{ t('hero.promiseHighlight') }}</span>
        </p>
        <div class="actions">
          <BaseButton variant="primary" :href="SITE.cv[locale]" download icon="download">{{
            t('contact.cv')
          }}</BaseButton>
          <BaseButton :to="to('contact')">{{ t('hero.contact') }}</BaseButton>
        </div>
      </div>
    </div>
    <ScrollHint data-intro-hide />
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 100svh;
  display: grid;
  padding: calc(var(--header-height) + var(--space-6)) var(--gutter) var(--space-9);
  overflow: hidden;
}
.inner {
  position: relative;
  z-index: 1;
  display: grid;
  justify-items: center;
  align-content: center;
  gap: var(--space-5);
  text-align: center;
}
.rest {
  display: grid;
  gap: var(--space-5);
  justify-items: center;
}
.who-lines {
  margin: 0;
  font-size: var(--text-lead);
  line-height: var(--leading-snug);
  font-weight: var(--weight-medium);
  text-wrap: balance;
}
.who {
  display: block;
}
.promise {
  text-wrap: balance;
}
.promise .hl {
  display: inline-block;
}
.actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-3);
}
</style>

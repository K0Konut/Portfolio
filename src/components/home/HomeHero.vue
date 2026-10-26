<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { bezier, number, reducedMotion, seconds } from '../../composables/motion'
import { useLocale } from '../../composables/useLocale'
import { SITE } from '../../content/site'
import ScrollHint from '../animations/ScrollHint.vue'
import ScrollParallax from '../animations/ScrollParallax.vue'
import TopoBackground from '../fonds/TopoBackground.vue'
import LetterReveal from '../textes/LetterReveal.vue'
import BaseButton from '../ui/BaseButton.vue'

/* Section d'accueil (design system v1.2 §5, DA §6), assemblée de briques : TopoBackground derrière, le nom en
   LetterReveal, ScrollParallax pour l'effacement au scroll, ScrollHint. Une seule timeline d'environ 1,5 s
   orchestre l'entrée ; toutes les valeurs viennent des tokens de mouvement.
   La page porte data-intro="pending" dès le HTML pré-rendu : le contenu et l'en-tête restent cachés
   jusqu'au départ de l'entrée (3 s au plus, en secours ; rien n'est caché sans JavaScript). */
const { t } = useI18n()
const { locale, to } = useLocale()
const root = ref<HTMLElement>()
const name = ref<InstanceType<typeof LetterReveal>>()
const pending = ref(true)
useHead({ htmlAttrs: { 'data-intro': computed(() => (pending.value ? 'pending' : undefined)) } })

// GSAP se télécharge pendant l'hydratation (pas d'attente supplémentaire au montage)
const libraries = import.meta.env.SSR ? undefined : import('gsap')

let ctx: { revert(): void } | undefined
let gone = false

onMounted(async () => {
  const el = root.value
  if (!el || !libraries) return
  // Sans GSAP (réseau coupé), le contenu s'affiche tel quel
  const loaded = await libraries.catch(() => undefined)
  if (gone) return
  if (!loaded) {
    pending.value = false
    name.value?.play()
    return
  }
  const { gsap } = loaded
  const [x1, y1, x2, y2] = bezier('--ease-out')
  const ease = (p: number) => cubicBezier(x1, y1, x2, y2, p)
  const base = seconds('--duration-base')

  ctx = gsap.context(() => {
    const tl = gsap.timeline({ paused: true, defaults: { ease } })
    // Le nom entre lettre par lettre dès 0 s (LetterReveal ; en mouvement réduit, il apparaît en fondu)
    tl.call(() => name.value?.play(), [], 0)
    if (reducedMotion().matches) {
      tl.fromTo(
        '.rest',
        { opacity: 0 },
        { opacity: 1, duration: seconds('--duration-reduced'), ease: 'none' },
        0,
      )
    } else {
      const rise = number('--reveal-distance')
      tl.fromTo(
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
    }
    // L'entrée attend la police Bagel (300 ms au plus), pour ne pas animer une police de secours
    Promise.race([
      document.fonts.load('1em "Bagel Fat One"'),
      new Promise((resolve) => setTimeout(resolve, 300)),
    ]).then(() => {
      if (gone) return
      pending.value = false
      tl.play(0)
    })
  }, el)
})
onBeforeUnmount(() => {
  gone = true
  ctx?.revert()
})

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
      <ScrollParallax id="nom" class="name-wrap" data-intro-hide>
        <LetterReveal
          ref="name"
          as="h1"
          :text="SITE.name"
          start="manual"
          stack
          class="hero-name display"
        />
      </ScrollParallax>
      <ScrollParallax class="rest" data-intro-hide :speed="0" :until="0.5">
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
      </ScrollParallax>
    </div>
    <ScrollHint />
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
.hero-name {
  font-size: var(--text-hero);
  white-space: nowrap;
}
@media (max-width: 767px) {
  .hero-name {
    font-size: var(--text-hero-stacked);
  }
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

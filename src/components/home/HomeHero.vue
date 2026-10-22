<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLocale } from '../../composables/useLocale'
import { SITE } from '../../content/site'
import BaseButton from '../ui/BaseButton.vue'
import HeroName from './HeroName.vue'
import ScrollHint from './ScrollHint.vue'
import TopoBackground from './TopoBackground.vue'

/* Section d'accueil (design system § Section d'accueil, DA §6) : une seule timeline d'environ 1,5 s,
   puis l'effacement au scroll. GSAP est chargé à la demande, dans le navigateur seulement.
   « pending » cache le contenu jusqu'à ce que la timeline prenne la main (ou 3 s au plus, en secours). */
const { t } = useI18n()
const { locale, to } = useLocale()
const root = ref<HTMLElement>()
const pending = ref(true)
let revert: (() => void) | undefined

onMounted(async () => {
  const el = root.value
  if (!el) return
  const [{ gsap }, { ScrollTrigger }] = await Promise.all([
    import('gsap'),
    import('gsap/ScrollTrigger'),
  ])
  gsap.registerPlugin(ScrollTrigger)
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
  const q = (selector: string) => el.querySelector(selector)
  const header = document.querySelector('.site-header .bar')
  const name = q('.name-wrap')
  const rest = q('.rest')
  const hint = q('.hint')
  const segment = q('.hint .segment')

  const ctx = gsap.context(() => {
    const tl = gsap.timeline({ paused: true, defaults: { ease: 'power4.out' } })
    if (reduce) {
      tl.fromTo(
        [header, name, rest, hint],
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'none' },
      )
    } else {
      tl.fromTo(header, { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 0)
        .fromTo(
          el.querySelectorAll('.letter'),
          { y: '0.4em', opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.04 },
          0,
        )
        .fromTo(
          el.querySelectorAll('.who, .promise'),
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.08 },
          0.4,
        )
        .fromTo(q('.promise .hl'), { opacity: 0 }, { opacity: 1, duration: 0.5 }, 0.5)
        .fromTo(q('.actions'), { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, 0.6)
        .fromTo(hint, { opacity: 0 }, { opacity: 1, duration: 0.4 }, 1.5)
        // Deux allers du repère, puis il s'immobilise (WCAG 2.2.2 : jamais de boucle)
        .fromTo(
          segment,
          { y: -12, opacity: 0 },
          {
            keyframes: [
              { opacity: 1, duration: 0.25 },
              { y: 28, duration: 0.8, ease: 'sine.inOut' },
              { opacity: 0, duration: 0.15 },
            ],
            repeat: 1,
          },
          1.6,
        )
        .set(segment, { y: 0, opacity: 1 })

      // Au scroll : le nom descend à --hero-parallax de la vitesse et s'estompe ; le reste s'estompe d'abord.
      // Point de départ explicite : à cet instant, le contenu est encore caché par « pending »
      gsap.fromTo(
        name,
        { y: 0, opacity: 1 },
        {
          y: () => el.offsetHeight * 0.35,
          opacity: 0,
          ease: 'none',
          immediateRender: false,
          scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true },
        },
      )
      gsap.fromTo(
        rest,
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
        onEnter: () => gsap.to(hint, { opacity: 0, duration: 0.3 }),
      })
    }
    pending.value = false
    // L'entrée attend la police Bagel (300 ms au plus), pour ne pas animer une police de secours
    Promise.race([
      document.fonts.load('1em "Bagel Fat One"'),
      new Promise((resolve) => setTimeout(resolve, 300)),
    ]).then(() => tl.play(0))
    // Repères du scroll recalculés une fois les polices posées (la page a pu bouger depuis leur calcul)
    document.fonts.ready.then(() => ScrollTrigger.refresh())
  }, el)
  revert = () => ctx.revert()
})
onBeforeUnmount(() => revert?.())
</script>

<template>
  <section ref="root" :class="['hero', 'fond-violet', { pending }]" aria-labelledby="nom">
    <TopoBackground />
    <div class="inner">
      <div id="nom" class="name-wrap anim"><HeroName :name="SITE.name" /></div>
      <div class="rest anim">
        <p class="who-lines">
          <span class="who">{{ t('hero.status') }}</span>
          <span class="who">{{ t('hero.goal') }}</span>
        </p>
        <p class="promise">
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
    <ScrollHint class="anim" />
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
  margin: 0;
  max-width: var(--measure);
  font-size: var(--text-lead);
  line-height: var(--leading-snug);
  color: var(--color-text-muted);
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

<style>
/* Avant l'entrée : contenu et en-tête cachés si JavaScript est actif ; montrés au bout de 3 s en secours */
@keyframes hero-fallback {
  to {
    opacity: 1;
  }
}
.js .hero.pending .anim,
.js body:has(.hero.pending) .site-header .bar {
  opacity: 0;
  animation: hero-fallback 0s 3s forwards;
}
</style>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { loadScrollTrigger, number } from '../../composables/motion'

/* Ce qu'il enveloppe glisse plus lentement que le scroll et s'estompe pendant que sa section quitte l'écran
   (design system § ScrollParallax). Seuls transform et opacity bougent ; ScrollTrigger est chargé à la demande ;
   aucun effet en mouvement réduit. La section de référence est la plus proche section parente. */
const props = withDefaults(
  defineProps<{
    /** Vitesse de glissement, en part de la hauteur de la section (--hero-parallax par défaut) */
    speed?: number
    /** S'estompe en même temps */
    fade?: boolean
    /** Part du trajet de la section sur laquelle l'effet se fait (0,5 : la première moitié) */
    until?: number
  }>(),
  { speed: undefined, fade: true, until: 1 },
)

const el = ref<HTMLElement>()
// Téléchargement lancé dès la création, pas au montage
const libraries = loadScrollTrigger()
let ctx: { revert(): void } | undefined
let gone = false

onMounted(async () => {
  const loaded = await libraries
  const target = el.value
  if (gone || !loaded || !target) return
  const { gsap } = loaded
  const section = target.closest('section') ?? target.parentElement ?? target
  const speed = props.speed ?? number('--hero-parallax')
  ctx = gsap.context(() => {
    gsap.fromTo(
      target,
      { opacity: 1 },
      {
        // Sans glissement (vitesse 0), seule l'opacité bouge
        ...(speed ? { y: () => section.offsetHeight * speed * props.until } : {}),
        opacity: props.fade ? 0 : 1,
        ease: 'none',
        immediateRender: false,
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `top+=${section.offsetHeight * props.until} top`,
          scrub: true,
        },
      },
    )
  })
})
onBeforeUnmount(() => {
  gone = true
  ctx?.revert()
})
</script>

<template>
  <div ref="el"><slot /></div>
</template>

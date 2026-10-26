<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { fontReady } from '../../composables/motion'

/* Texte dont les lettres montent et se posent une à une (design system § LetterReveal). Le texte est en clair
   pour les lecteurs d'écran ; les lettres découpées sont dans un doublon aria-hidden. Les lettres ne sont
   cachées qu'avec JavaScript (classe .js du document) : sans script, le texte est visible d'emblée.
   Démarrage : à l'ouverture (`load`, une fois sa police prête), à l'arrivée à l'écran (`visible`),
   ou par la page (`manual`, méthode `play`). */
const props = withDefaults(
  defineProps<{
    text: string
    /** Balise de l'élément (h1, p, span…) */
    as?: string
    /** Décalage entre deux lettres (s), --stagger-letter par défaut */
    stagger?: number
    /** Délai avant la première lettre (s) */
    delay?: number
    start?: 'load' | 'visible' | 'manual'
    /** Un mot par ligne sous 768 px */
    stack?: boolean
  }>(),
  { as: 'span', stagger: undefined, delay: 0, start: 'load', stack: false },
)

const root = ref<HTMLElement>()
// `visible` : rien n'est caché dans le HTML, seulement au montage et sous la ligne de flottaison (comme v-reveal)
const pending = ref(props.start !== 'visible')
const words = computed(() => {
  let i = 0
  return props.text.split(' ').map((word) => [...word].map((letter) => ({ letter, i: i++ })))
})

/** Lance l'entrée des lettres, deux images plus tard : l'état caché doit avoir été affiché pour s'animer */
function play() {
  requestAnimationFrame(() => requestAnimationFrame(() => !gone && (pending.value = false)))
}
defineExpose({ play })

let observer: IntersectionObserver | undefined
let gone = false
onMounted(() => {
  if (props.start === 'visible') {
    const el = root.value
    if (!el || !('IntersectionObserver' in window) || el.getBoundingClientRect().top < innerHeight)
      return
    pending.value = true
    observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return
      observer?.disconnect()
      play()
    })
    observer.observe(el)
  } else if (props.start !== 'manual') {
    // La police d'abord (300 ms au plus), pour ne pas animer une police de secours
    if (root.value) fontReady(root.value).then(play)
  }
})
onBeforeUnmount(() => {
  gone = true
  observer?.disconnect()
})
</script>

<template>
  <component
    :is="as"
    ref="root"
    :class="['letters', { pending, stack, fallback: start !== 'visible' }]"
    :style="{
      '--delay': `${delay}s`,
      '--stagger': stagger === undefined ? undefined : `${stagger}s`,
    }"
  >
    <span class="sr-only">{{ text }}</span>
    <span aria-hidden="true">
      <template v-for="(word, w) in words" :key="w">
        <span class="word"
          ><span v-for="{ letter, i } in word" :key="i" class="letter" :style="{ '--i': i }">{{
            letter
          }}</span></span
        >{{ w < words.length - 1 ? ' ' : '' }}
      </template>
    </span>
  </component>
</template>

<style scoped>
.word,
.letter {
  display: inline-block;
}
.letter {
  transition:
    opacity var(--duration-letter) var(--ease-out),
    translate var(--duration-letter) var(--ease-out);
  transition-delay: calc(var(--delay) + var(--i) * var(--stagger, var(--stagger-letter)));
}
/* Caché seulement avec JavaScript ; en secours, si l'entrée n'a pas démarré au bout de 3 s (script lent ou en
   échec), le texte apparaît quand même, comme le reste de la page (base.css, data-intro-hide) */
.js .pending .letter {
  opacity: 0;
  translate: 0 var(--letter-rise);
}
.js .fallback.pending .letter {
  animation: letters-fallback 0s 3s forwards;
}
@keyframes letters-fallback {
  to {
    opacity: 1;
    translate: none;
  }
}
@media (max-width: 767px) {
  .stack .word {
    display: block;
  }
}
/* Animations réduites : tout le texte apparaît ensemble, en fondu */
@media (prefers-reduced-motion: reduce) {
  .letter {
    transition: opacity var(--duration-reduced) var(--ease-out);
    transition-delay: var(--delay);
  }
  .js .pending .letter {
    translate: none;
  }
}
</style>

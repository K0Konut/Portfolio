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
const pending = ref(true)
const words = computed(() => {
  let i = 0
  return props.text.split(' ').map((word) => [...word].map((letter) => ({ letter, i: i++ })))
})

/** Lance l'entrée des lettres */
function play() {
  pending.value = false
}
defineExpose({ play })

let observer: IntersectionObserver | undefined
let gone = false
onMounted(() => {
  if (props.start === 'visible' && root.value && 'IntersectionObserver' in window) {
    observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return
      observer?.disconnect()
      play()
    })
    observer.observe(root.value)
  } else if (props.start !== 'manual') {
    // La police d'abord (300 ms au plus), puis deux images : l'état caché doit avoir été affiché
    // pour que les lettres s'animent
    const el = root.value
    if (el)
      fontReady(el).then(() =>
        requestAnimationFrame(() => requestAnimationFrame(() => !gone && play())),
      )
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
    :class="['letters', { pending, stack }]"
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
.js .pending .letter {
  opacity: 0;
  translate: 0 var(--letter-rise);
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

<script setup lang="ts">
import { computed } from 'vue'

// Nom géant (design system § HeroName) : en clair pour les lecteurs d'écran, en lettres séparées pour l'entrée
const props = defineProps<{ name: string }>()
const words = computed(() => props.name.split(' ').map((word) => [...word]))
</script>

<template>
  <h1 class="hero-name display">
    <span class="sr-only">{{ name }}</span>
    <span aria-hidden="true">
      <template v-for="(letters, w) in words" :key="w">
        <span class="word"
          ><span v-for="(letter, i) in letters" :key="i" class="letter">{{ letter }}</span></span
        >{{ w < words.length - 1 ? ' ' : '' }}
      </template>
    </span>
  </h1>
</template>

<style scoped>
.hero-name {
  font-size: var(--text-hero);
  white-space: nowrap;
}
.word,
.letter {
  display: inline-block;
}
/* Sur deux lignes en dessous de 768 px */
@media (max-width: 767px) {
  .hero-name {
    font-size: var(--text-hero-stacked);
  }
  .word {
    display: block;
  }
}
</style>

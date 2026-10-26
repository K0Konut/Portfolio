<script setup lang="ts">
import ScrollParallax from '../../../components/animations/ScrollParallax.vue'

// L'effet suit le scroll de la page : une section, puis de quoi faire défiler dans le cadre
defineProps<{ speed?: number; fade?: boolean; until?: number }>()
</script>

<template>
  <section class="stage fond-violet">
    <ScrollParallax :speed="speed" :fade="fade" :until="until">
      <p class="display big">Faites défiler</p>
    </ScrollParallax>
  </section>
  <div class="after">
    <p>La suite de la page.</p>
  </div>
</template>

<style scoped>
.stage {
  min-height: 80vh;
  display: grid;
  place-items: center;
  border-radius: var(--radius-md);
}
.big {
  font-size: var(--text-h1);
}
.after {
  min-height: 100vh;
  padding-top: var(--space-6);
  color: var(--color-text-muted);
}
</style>

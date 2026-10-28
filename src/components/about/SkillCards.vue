<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useLocale } from '../../composables/useLocale'
import type { SkillCategory } from '../../content/types'
import DotList from '../ui/DotList.vue'
import PosterCard from '../ui/PosterCard.vue'
import TextLink from '../ui/TextLink.vue'

/* Compétences de la page À propos (design system § SkillCards) : une carte sombre par catégorie, en
   « affiches collées » sur bureau. Les cartes se posent une à une à l'arrivée à l'écran (v-reveal) ;
   la pastille violette marque les technos de ce site. */
defineProps<{ categories: SkillCategory[] }>()
const { t } = useI18n()
const { to } = useLocale()
</script>

<template>
  <div class="skills">
    <div class="cards">
      <PosterCard
        v-for="(category, i) in categories"
        :key="category.title"
        v-reveal="i"
        as="article"
        class="card"
      >
        <h3>{{ category.title }}</h3>
        <DotList :items="category.skills.map(({ name, site }) => ({ name, highlight: site }))" />
      </PosterCard>
    </div>
    <p v-reveal class="legend">
      <i aria-hidden="true" />{{ t('about.legend') }}
      <TextLink :to="to('etude-de-cas', { slug: 'ce-portfolio' })">{{
        t('about.legendLink')
      }}</TextLink>
    </p>
  </div>
</template>

<style scoped>
.skills {
  display: grid;
  gap: var(--space-6);
}
.cards {
  display: grid;
  gap: var(--space-5);
}
.card {
  display: grid;
  gap: var(--space-4);
  align-content: start;
}
h3 {
  margin: 0;
  font-family: var(--font-accent);
  font-style: italic;
  font-weight: var(--weight-regular);
  font-size: var(--text-lead);
  line-height: var(--leading-none);
  color: var(--color-highlight);
}
/* Pastille de la légende : celle d'une ligne mise en avant de DotList. La couleur porte une information */
.legend i {
  flex: none;
  width: var(--skill-dot);
  height: var(--skill-dot);
  border-radius: var(--radius-pill);
  background: var(--violet-500);
  box-shadow: 0 0 0 var(--underline) var(--neutral-50);
}
.legend {
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-3);
  font-size: var(--text-sm);
  color: var(--color-text-muted);
}

@media (min-width: 768px) {
  .cards {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
/* Bureau : cinq affiches en quinconce, chacune avec son inclinaison (multiples de --poster-tilt, nulle en
   mouvement réduit) ; droites hors bureau */
@media (min-width: 1024px) {
  .cards {
    grid-template-columns: repeat(5, minmax(0, 1fr));
    align-items: start;
    gap: var(--space-4);
  }
  .card:nth-child(even) {
    margin-top: var(--space-7);
  }
  .card:nth-child(5n + 1) {
    --tilt: var(--poster-tilt);
  }
  .card:nth-child(5n + 2) {
    --tilt: calc(var(--poster-tilt) * -0.75);
  }
  .card:nth-child(5n + 3) {
    --tilt: calc(var(--poster-tilt) * 0.5);
  }
  .card:nth-child(5n + 4) {
    --tilt: calc(var(--poster-tilt) * -1);
  }
  .card:nth-child(5n + 5) {
    --tilt: calc(var(--poster-tilt) * 0.75);
  }
}
</style>

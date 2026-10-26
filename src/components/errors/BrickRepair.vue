<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { reducedMotion, seconds } from '../../composables/motion'
import { useLocale } from '../../composables/useLocale'
import DragToSnap from '../animations/DragToSnap.vue'
import PageIntro from '../sections/PageIntro.vue'
import BaseButton from '../ui/BaseButton.vue'

/* Page 404 (design system v1.2 §5) : « Il manque une brique. » La brique tombée (DragToSnap) se glisse dans
   le trou du mur ; une fois logée, la page mène à l'accueil. Le mur, le trou et l'apparence de la brique sont
   propres à la page. */
/** Délai avant le retour à l'accueil (s) : le temps de voir le mur complet ; --duration-reduced en mouvement réduit */
const REDIRECT = 0.9

const { t } = useI18n()
const { to } = useLocale()
const router = useRouter()

const hole = ref<HTMLElement>()
const near = ref(false)
const placed = ref(false)
let timer: ReturnType<typeof setTimeout> | undefined

// La brique est logée : l'état l'annonce, puis la page mène à l'accueil
function onSnap() {
  placed.value = true
  const delay = reducedMotion().matches ? seconds('--duration-reduced') : REDIRECT
  timer = setTimeout(() => router.push(to('accueil')), delay * 1000)
}

onBeforeUnmount(() => clearTimeout(timer))
</script>

<template>
  <PageIntro :title="t('notFound.title')" class="repair" center full>
    <template #before>
      <div :class="['wall', { near, placed }]" aria-hidden="true">
        <div class="row"><i v-for="n in 5" :key="n" /></div>
        <div class="row"><i /><i /><i ref="hole" class="hole" /><i /></div>
        <div class="row"><i v-for="n in 5" :key="n" /></div>
      </div>
      <div class="ground">
        <DragToSnap
          class="brick"
          :target="hole"
          :label="t('notFound.brick')"
          @near="near = $event"
          @snap="onSnap"
        />
      </div>
    </template>
    {{ t('notFound.text') }}
    <template #after>
      <p class="status" aria-live="polite">{{ placed ? t('notFound.done') : '' }}</p>
      <div class="actions">
        <BaseButton variant="primary" :to="to('accueil')">{{ t('notFound.home') }}</BaseButton>
        <BaseButton :to="to('projets')" icon="arrow-right">{{ t('notFound.projects') }}</BaseButton>
      </div>
    </template>
  </PageIntro>
</template>

<style scoped>
.repair {
  --bw: var(--space-8);
  --bh: var(--space-6);
  overflow: hidden;
}
@media (max-width: 767px) {
  .repair {
    --bw: var(--space-7);
    --bh: var(--space-5);
  }
}
/* Mur crème de trois rangées appareillées (centrée, la rangée de quatre est décalée d'une demi-brique),
   avec un trou en pointillés */
.wall {
  display: grid;
  gap: var(--space-2);
  justify-items: center;
}
.row {
  display: flex;
  gap: var(--space-2);
}
.wall i,
.brick {
  display: block;
  width: var(--bw);
  height: var(--bh);
  border-radius: var(--radius-sm);
  background: var(--neutral-50);
}
.wall .hole {
  background: transparent;
  border: var(--border-strong) dashed var(--color-highlight);
  transition: border-color var(--duration-fast) var(--ease-out);
}
.near .hole {
  border-style: solid;
  background: color-mix(in srgb, var(--lime-500) 20%, transparent);
}
.placed .hole {
  visibility: hidden;
}
/* La brique tombée, inclinée ; elle se redresse en partie pendant le glisser, et passe en lime une fois placée.
   Animations réduites : --duration-move vaut 0, la brique se met en place d'un coup, la couleur change en fondu */
.ground {
  height: calc(var(--space-6) * 2);
  display: grid;
  place-items: center;
}
.brick {
  border: 0;
  padding: 0;
  rotate: -14deg;
  --drag-transitions:
    rotate var(--duration-move) var(--ease-out), scale var(--duration-move) var(--ease-out),
    background-color var(--duration-fast) var(--ease-out);
}
.brick.dragging {
  rotate: -4deg;
  scale: 1.06;
}
.brick.placed {
  rotate: 0deg;
  background: var(--lime-500);
}
.status {
  margin: 0;
  min-height: 1.4em;
  font-size: var(--text-sm);
  color: var(--color-text-subtle);
}
.actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-3);
}
</style>

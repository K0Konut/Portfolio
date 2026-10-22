<script setup lang="ts">
import BaseButton from '../../components/ui/BaseButton.vue'
import BaseIcon from '../../components/ui/BaseIcon.vue'
import BaseTag from '../../components/ui/BaseTag.vue'
import CopyButton from '../../components/ui/CopyButton.vue'
import { ICONS, type IconName } from '../../components/ui/icons'
import TextLink from '../../components/ui/TextLink.vue'
import DsBlock from './DsBlock.vue'

const FONDS = ['fond-nuit', 'fond-violet', 'fond-lime', 'fond-creme']
const NAMES = Object.keys(ICONS) as IconName[]
</script>

<template>
  <DsBlock
    title="Composants de base"
    intro="BaseButton, TextLink, BaseTag, BaseIcon, CopyButton et SkipLink, sur quatre fonds : les rôles changent, les composants non. Survolez, cliquez, parcourez au clavier."
  >
    <div class="grid">
      <div v-for="f in FONDS" :key="f" :class="['panel', f]">
        <p class="name">{{ f.replace('fond-', '') }}</p>
        <div class="row">
          <BaseButton variant="primary" href="#" download icon="download"
            >Télécharger le CV</BaseButton
          >
          <BaseButton variant="outline">Me contacter</BaseButton>
        </div>
        <div class="row">
          <BaseButton variant="outline" href="#" icon="arrow-right">Tous les projets</BaseButton>
          <BaseButton variant="outline" href="https://github.com/K0Konut" icon="arrow-up-right"
            >GitHub</BaseButton
          >
        </div>
        <p>
          Le code de ce portfolio est public :
          <TextLink href="https://github.com/K0Konut/Portfolio">lire le dépôt sur GitHub</TextLink>.
          Une <span class="hl">mise en valeur</span>, jamais soulignée.
        </p>
        <div class="row">
          <TextLink variant="standalone" href="#" download icon="download">CV en français</TextLink>
          <TextLink variant="standalone" href="https://www.linkedin.com">LinkedIn</TextLink>
          <TextLink variant="standalone" href="#" icon="arrow-left" icon-start
            >Tous les projets</TextLink
          >
        </div>
        <div class="row">
          <BaseTag>stage</BaseTag>
          <BaseTag>projet d’école</BaseTag>
        </div>
        <CopyButton value="costa.maskulov@exemple.fr" />
      </div>
    </div>

    <ul class="icons">
      <li v-for="n in NAMES" :key="n">
        <BaseIcon :name="n" size="md" />
        <code>{{ n }}</code>
      </li>
    </ul>
    <p class="note">
      <strong>SkipLink</strong> : rechargez la page et appuyez sur Tab, « Aller au contenu » glisse
      en haut à gauche.
    </p>
  </DsBlock>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 34rem), 1fr));
  gap: var(--space-4);
}
.panel {
  display: grid;
  gap: var(--space-4);
  align-content: start;
  padding: var(--space-6) var(--space-5);
  border-radius: var(--radius-md);
  border: var(--border-thin) solid var(--color-border);
}
.panel p {
  margin: 0;
  max-width: var(--measure);
}
.name {
  font-family: var(--font-display);
  font-size: var(--text-h3);
  line-height: var(--leading-display);
  text-transform: capitalize;
}
.row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-3) var(--space-5);
}
.icons {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(8rem, 1fr));
  gap: var(--space-4);
}
.icons li {
  display: grid;
  justify-items: center;
  gap: var(--space-2);
  padding: var(--space-4);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
}
code {
  font-size: var(--text-sm);
  color: var(--color-text-subtle);
}
.note {
  margin: 0;
  color: var(--color-text-muted);
}
</style>

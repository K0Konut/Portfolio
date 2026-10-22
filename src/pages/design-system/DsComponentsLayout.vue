<script setup lang="ts">
import ContactCard from '../../components/sections/ContactCard.vue'
import PageIntro from '../../components/sections/PageIntro.vue'
import PageSection from '../../components/sections/PageSection.vue'
import SectionWave from '../../components/sections/SectionWave.vue'
import BaseButton from '../../components/ui/BaseButton.vue'
</script>

<template>
  <!-- Pleine largeur, comme dans les pages : l'en-tête et le pied de page sont ceux de cette page -->
  <div class="ds-layout" aria-label="Composants de mise en page">
    <p class="label">
      Composants de mise en page : AppHeader, MobileMenu et LangSwitch (en haut, réduisez la fenêtre
      pour le menu), PageIntro, PageSection et SectionWave (le rythme de l’accueil), ContactCard,
      AppFooter (en bas).
    </p>
    <SectionWave :seed="9" from="nuit" to="violet" />
    <PageIntro title="En-tête de page">
      Tout ce que j’ai construit, du plus récent au plus ancien.
    </PageIntro>
    <SectionWave :seed="1" from="violet" to="nuit" />
    <PageSection title="Trois projets">
      <template #intro>La sélection du moment : trois projets, du besoin au code.</template>
      <p v-reveal="1">Contenu d’une section sur fond nuit, qui apparaît au scroll.</p>
    </PageSection>
    <SectionWave :seed="2" from="nuit" to="creme" />
    <PageSection fond="creme" title="Qui je suis">
      <p v-reveal="1">
        Partir d’une idée et la voir devenir un produit, <span class="hl">brique par brique.</span>
      </p>
    </PageSection>
    <SectionWave :seed="3" from="creme" to="vif" />
    <PageSection fond="vif" title="Section vive">
      <template #intro>Chaque projet passe par les mêmes étapes.</template>
      <div><BaseButton href="#">Voir ma méthode</BaseButton></div>
    </PageSection>
    <SectionWave :seed="4" from="vif" to="lime" />
    <ContactCard
      intro="Vous cherchez un développeur full-stack pour un stage de fin d’études ? Écrivez-moi."
    />
    <SectionWave :seed="5" from="lime" to="nuit" />
    <PageIntro title="Il manque une brique." fond="violet" center>
      Variante centrée de PageIntro, pour la 404.
      <template #actions
        ><BaseButton variant="primary" href="#">Retour à l’accueil</BaseButton></template
      >
    </PageIntro>
    <SectionWave :seed="6" from="violet" to="nuit" />
  </div>
</template>

<style scoped>
.label {
  max-width: var(--container);
  margin: 0 auto;
  padding: 0 var(--gutter) var(--space-6);
  color: var(--color-text-muted);
}
p {
  margin: 0;
}
</style>

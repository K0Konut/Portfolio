---
title: Ce portfolio
description: 'Ce site, de la méthode au code : PRD, direction artistique, design system, maquettes, puis intégration en Vue.'
date: '2026-10'
featured: true
tags: [projet perso]
type: Projet perso
role: Conception, design et développement
duration: Depuis octobre 2026, en cours
team: Seul
stack: [Vue 3, TypeScript, Vite, GSAP, Docker]
code: https://github.com/K0Konut/Portfolio
capture:
  device: browser
  image: capture.png
---

<script setup>
import StatBlock from '../../../src/components/ui/StatBlock.vue'
</script>

## Contexte

Étudiant ingénieur à l’ESIEA, je cherche un stage de fin d’études en développement full-stack.

Jusqu’ici, je me présentais avec un CV, LinkedIn et GitHub. Ces supports listent des compétences, mais ne montrent ni ma méthode, ni ma créativité, ni qui je suis : rien ne permet à un recruteur de me reconnaître.

## Besoin

Un seul support qui rende visibles la rigueur d’un ingénieur, la créativité d’un développeur web et ma personnalité.

Deux lecteurs à servir. La recruteuse RH, qui trie vite et sans bagage technique, doit comprendre le profil et récupérer le CV en un clic. Le tech lead veut lire une étude de cas, comprendre les choix et ouvrir le code.

## Contraintes

- **Budget : 0 €.** Aucun service payant.
- **Auto-hébergé.** Sur mon serveur personnel (Proxmox), dans un conteneur Docker, derrière Nginx Proxy Manager.
- **Référencement.** Des pages pré-rendues, en français et en anglais.
- **Accessibilité.** WCAG 2.2 niveau AA ; toutes les animations respectent « réduire les animations ».
- **Temps variable.** Ma disponibilité change d’une semaine à l’autre : le travail est découpé en petites étapes livrables.

## Méthode

Sept phases, dans l’ordre, chacune avec son livrable, sa branche Git et sa validation avant de passer à la suivante.

1. **PRD.** Ce qu’on construit et pourquoi.
2. **Territoire de marque.** Positionnement, valeurs, ton de voix.
3. **Direction artistique.** Couleurs, typographie, mouvement.
4. **Architecture et UX.** Arborescence, parcours, wireframes.
5. **Design system.** Tokens et composants, avec leurs états.
6. **Maquettes.** Les écrans clés, construits en code.
7. **Code.** L’intégration en Vue.

Les maquettes sont faites directement en code, avec les vrais composants : chaque choix visuel se fait sur une page où l’on bascule entre plusieurs versions, dans le navigateur.

## Choix techniques

### Un design system avant les écrans

Des composants génériques, des « briques », tous construits sur des tokens : aucune valeur en dur. Chacun a sa page dans un catalogue de développement, avec ses réglages en direct, ses états et le mode « mouvement réduit ».

<small>Compromis : plus de temps avant le premier écran, moins de retouches ensuite.</small>

### Le fond animé en WebGL natif

Les courbes de niveau de l’accueil reprennent un composant écrit pour une bibliothèque 3D, réécrit en WebGL 2 sans elle : une dépendance de moins. Image fixe en mouvement réduit, pause hors de l’écran.

<small>Compromis : un shader à maintenir soi-même.</small>

### Tout auto-hébergé

Polices servies par le site, conteneur Docker sur mon serveur, aucune mesure d’audience : aucun service tiers, pas de bandeau de consentement.

<small>Compromis : la disponibilité dépend de mon serveur.</small>

### Vue 3, Vite et TypeScript, sans Nuxt

Chaque page est pré-rendue en HTML complet avec vite-ssg, pour le référencement. Le routage bilingue, les balises `head` et le sitemap sont assemblés à la main, en petits morceaux lisibles.

<small>Compromis : plus de code maison qu’avec Nuxt.</small>

## Résultats

<div class="stats">
  <StatBlock value="7" label="étapes, du PRD au code, chacune validée avant la suivante" :index="0" />
  <StatBlock value="32" label="composants génériques, chacun dans le catalogue" :index="1" />
  <StatBlock value="105" label="décisions écrites, chacune avec sa raison" :index="2" />
  <StatBlock value="6" label="fonds de section, contre un seul dans la première direction artistique" :before="1" :after="6" :index="3" />
</div>

Les scores Lighthouse, visés à 95 ou plus sur les quatre axes, seront ajoutés à la mise en ligne.

## Enseignements

- **Comparer plutôt que décrire.** Décider devant deux à six versions affichées va plus vite que débattre sur un document.
- **Garder sa méthode.** Un assistant de design automatique a été essayé deux fois, puis retiré : il imposait son propre déroulé à un projet qui avait déjà le sien.
- **Écrire les décisions.** Une ligne et une raison par décision : on ne revient pas deux fois sur le même choix.

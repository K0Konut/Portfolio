<h1 align="center">Costa Maskulov — Portfolio</h1>

<p align="center"><strong>Créatif dans l'interface, rigoureux dans la méthode.</strong></p>

<p align="center">
  <a href="https://github.com/K0Konut/Portfolio/actions/workflows/ci.yml?query=branch%3Adev"><img src="https://github.com/K0Konut/Portfolio/actions/workflows/ci.yml/badge.svg?branch=dev" alt="CI : lint, types, tests et build sur dev"></a>
</p>

Le portfolio d'un étudiant ingénieur en génie logiciel (ESIEA Paris) qui cherche un stage de fin d'études en développement full-stack. Le site fait aussi office de preuve : sa propre conception suit un process complet, du PRD au code. Chaque étape est documentée dans [`docs/`](docs/) et validée avant la suivante.

> **État** : en construction. Le socle, le design system et toutes ses briques sont en place. Restent le contenu, les pages, la version anglaise et la mise en ligne.

---

## Sommaire

- [La méthode](#la-méthode)
- [Stack](#stack)
- [Démarrer](#démarrer)
- [Le catalogue du design system](#le-catalogue-du-design-system)
- [Organisation du code](#organisation-du-code)
- [Qualité](#qualité)
- [Contribuer : le workflow Git](#contribuer--le-workflow-git)
- [Déploiement](#déploiement)

## La méthode

Sept phases, dans l'ordre. Chacune s'appuie sur la précédente et passe par une PR relue avant la suite.

| Phase                             | Document                                                                                                     | État                                          |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------ | --------------------------------------------- |
| 1. PRD                            | [`01-prd.md`](docs/01-prd.md)                                                                                | validé                                        |
| 2. Territoire de marque           | [`02-territoire-de-marque.md`](docs/02-territoire-de-marque.md)                                              | à valider (v0.2)                              |
| 3. Direction artistique           | [`03-direction-artistique.md`](docs/03-direction-artistique.md)                                              | validé                                        |
| 4. Architecture de contenu et UX  | [`04-architecture-contenu-ux.md`](docs/04-architecture-contenu-ux.md), [wireframes](docs/04-wireframes.html) | validé                                        |
| 5. Design system                  | [`05-design-system.md`](docs/05-design-system.md)                                                            | validé (v1.2 : des briques, pas des sections) |
| 6. Maquettes                      | [`06-maquettes/`](docs/06-maquettes/)                                                                        | validé (7 écrans, bureau et mobile)           |
| 7. Architecture technique et code | [`07-architecture-technique.md`](docs/07-architecture-technique.md)                                          | en cours                                      |

Les décisions structurantes, avec leur raison, sont tenues dans [`decisions.md`](docs/decisions.md).

## Stack

| Besoin            | Choix                                                                                                               |
| ----------------- | ------------------------------------------------------------------------------------------------------------------- |
| Interface         | Vue 3.5, `<script setup lang="ts">`                                                                                 |
| Build             | Vite 8, pré-rendu statique avec vite-ssg (chaque page est un fichier HTML complet)                                  |
| Langage           | TypeScript strict                                                                                                   |
| Routes et langues | vue-router 5, vue-i18n : `/fr/...` et `/en/...`                                                                     |
| Balises `head`    | @unhead/vue (titre, Open Graph, `hreflang`)                                                                         |
| Animations        | GSAP et ScrollTrigger chargés à la demande, CSS et `IntersectionObserver`, WebGL 2 natif pour le fond topographique |
| Styles            | CSS natif : les tokens du design system en variables CSS, du CSS `scoped` par composant                             |
| Tests             | Vitest et Vue Test Utils, Playwright avec contrôle d'accessibilité axe                                              |

Pas de Nuxt, pas de framework CSS, pas de store : la solution la plus simple qui tient le cahier des charges ([architecture §1](docs/07-architecture-technique.md#1-stack)).

## Démarrer

Prérequis : **Node 24** ou plus.

```bash
npm install
npm run dev
```

Le site s'ouvre sur `http://localhost:5173`. Pour voir la version pré-rendue, comme en production :

```bash
npm run build && npm run preview
```

| Commande                          | Rôle                                                  |
| --------------------------------- | ----------------------------------------------------- |
| `npm run dev`                     | Serveur de développement, avec rechargement à chaud   |
| `npm run build`                   | Vérification des types, puis pré-rendu dans `dist/`   |
| `npm run preview`                 | Sert `dist/` en local                                 |
| `npm run lint`                    | ESLint                                                |
| `npm run format` / `format:check` | Prettier                                              |
| `npm run type-check`              | `vue-tsc`                                             |
| `npm test`                        | Tests unitaires (Vitest)                              |
| `npm run test:e2e`                | Tests de bout en bout et d'accessibilité (Playwright) |

## Le catalogue du design system

En développement, **`/design-system`** présente chaque brique, rangée par famille comme une bibliothèque de composants : fonds, textes animés, animations, composants, mise en page, site.

Chaque brique a sa page :

- une démo sur le fond de son choix, en largeur mobile, tablette ou bureau ;
- un panneau de réglages en direct, un bouton « Rejouer » et un mode « Mouvement réduit » ;
- les états (survol, focus, appuyé) côte à côte ;
- le code d'appel avec les réglages en cours, et le tableau des options.

On y trouve aussi les tokens : couleurs, fonds de section, typographie, espacements, motion, icônes. Le catalogue n'est jamais pré-rendu ni publié.

## Organisation du code

```
src/
  components/       les briques du catalogue, par famille
    fonds/          TopoBackground, SectionWave
    textes/         LetterReveal
    animations/     ScrollParallax, ScrollHint, DragToSnap
    ui/             BaseButton, TextLink, PosterCard, ProjectCard, BaseTimeline, CycleSteps…
    mise-en-page/   PageSection, PageIntro, PosterGrid, BentoGrid
    site/           AppHeader, MobileMenu, LangSwitch, AppFooter, ContactLinks…
  composables/      mouvement, liens, langue, SEO, fond topographique
  directives/       v-reveal (apparition au scroll)
  pages/            une vue par route, qui assemble les briques ; design-system/ pour le catalogue
  router/           table des routes FR / EN
  i18n/             textes de l'interface (fr.json, en.json)
  styles/           tokens.css, base.css
docs/               la méthode, phase par phase
tests/unit/         Vitest
tests/e2e/          Playwright
```

Une brique reçoit tout par ses options et ses slots. Elle ne contient aucun texte de page et ne sait pas sur quelle page elle sera : ce sont les pages qui assemblent.

## Qualité

- **Accessibilité** : WCAG 2.2 AA visé. Navigation au clavier, focus visible, contrastes vérifiés, `prefers-reduced-motion` respecté par chaque animation.
- **Performance** : objectif Lighthouse ≥ 95 sur les quatre axes. Polices auto-hébergées, GSAP et WebGL chargés après le premier affichage.
- **Intégration continue** : chaque PR vers `dev` ou `main` passe le lint, le format, les types, les tests unitaires, le pré-rendu, puis les tests de bout en bout et d'accessibilité ([`ci.yml`](.github/workflows/ci.yml)).

## Contribuer : le workflow Git

- `main` reçoit les releases, `dev` intègre le code. Jamais de commit direct sur l'une ou l'autre.
- Une branche par sujet, créée depuis `dev` à jour : `<type>/<cible>/<action>`, par exemple `feat/dev/design_system` ou `doc/dev/readme`.
- Commits [Conventional Commits](https://www.conventionalcommits.org/fr/), en français : `feat(contact): ajoute la validation du formulaire`.
- Chaque branche finit en PR vers sa cible, relue et mergée par le propriétaire.

## Déploiement

Prévu, pas encore en place ([architecture §7](docs/07-architecture-technique.md#7-hébergement-image-docker-et-intégration-continue)) :

- au merge sur `main`, une image Docker (Nginx) est publiée sur GitHub Container Registry ;
- sur le serveur, la mise en ligne se fait à la main, avec `docker compose pull && docker compose up -d`, derrière Nginx Proxy Manager.

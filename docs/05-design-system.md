# Design system — Portfolio personnel

Version 1.2 — 23/10/2026 — **statut : validé** (catalogue de briques génériques, validé par le propriétaire le 23/10/2026)

v1.2 : les composants deviennent des briques génériques rangées par famille, à la manière d'une bibliothèque (vue-bits.dev) ; les sections (`HomeHero`, `ContactCard`, `BusinessCard`, `BrickRepair`, `SkillCards`, `CaseNav`…) laissent leurs mécanismes aux briques et leur contenu aux pages (§5, composition des pages) ; nouveaux composants `LetterReveal`, `ScrollParallax`, `DragToSnap`, `PosterCard`, `PosterGrid`, `BentoGrid`, `BaseTimeline`, `CycleSteps`, `NumberedSteps`, `DotList`, `DefinitionList`, `StickyToc`, `NextLink`, `ContactLinks` ; catalogue de développement avec panneau de réglages en direct (§6).

v1.1 : report des choix validés en maquette (phase 6, `decisions.md` du 20 au 22/10/2026) : section d'accueil sans étiquette et avec fond topographique ; `ProjectCard` qui se soulève (`--card-lift` remplace `--card-hover-scale`) et disposition « affiches collées » ; `DeviceFrame` à proportions fixes et fonds de capture ; `ProcessSteps` en cycle de six étapes ; `Timeline` centrée alternée ; `MetaList` en fiche ; `SkillsWall` remplacé par `SkillCards` ; nouveaux composants `TopoBackground`, `ProjectBento`, `ContactCard`, `BusinessCard` et `BrickRepair`.

v1.0 : design system validé par le propriétaire ; briques « de ce site » du `SkillsWall` en violet clair au lieu du rose.

v0.9 : lot 5 (`MetaList`, `CaseToc`, `StatBlock`, `CaseNav`) et composition de l'étude de cas ; tokens `--toc-width`, `--stat-bar`, `--duration-bar`.

v0.8 : `SkillsMarquee` remplacé par `SkillsWall` (mur de briques) ; icônes `pause` et `play` retirées.

v0.7 : lot 4 (`Timeline`, `SkillsMarquee`) ; icônes `pause` et `play` ; `ScrollHint` confirmé.

v0.6 : lot 3 (`HeroName` et section d'accueil, `ScrollHint`, `ProcessSteps`) ; tokens `--text-hero`, `--text-hero-stacked` et motion de l'accueil.

v0.5 : six fonds de section (rôles redéfinis par fond), `Tag` renforcé (contour épais et fond teinté), `Section` réécrite, nouveau composant `SectionWave` (DA v1.2).

v0.4 : lot 2 (`Section`, `PageIntro`, `AppFooter`, `ProjectCard`, `DeviceFrame`) ; `Tag` en contour ; tokens `--header-height`, `--reveal-distance`, `--card-hover-scale`.

v0.3 : spécifications du lot 1 (`BaseButton`, `TextLink`, `Tag`, `Icon`, `CopyButton`, `SkipLink`) et tokens d'appui (`--duration-press`, `--press-scale`, `--feedback-hold`).

v0.2 : corrections issues de l'audit Impeccable du 14/10/2026 (tokens pour toutes les valeurs, zones cliquables de 44 px, rôles `--color-highlight` et `--color-header-muted`, polices auto-hébergées).

S'appuie sur la direction artistique « Affiche de nuit » et sur l'architecture v1.0 (wireframes). Les besoins viennent des wireframes et des maquettes ; les composants qui y répondent sont des briques génériques, assemblées par les pages.

---

## 1. Principes

1. **Tokens uniquement** : aucune valeur en dur dans les composants. Couleurs, tailles, espacements, rayons et durées passent par des variables CSS (`src/styles/tokens.css`).
2. **Deux niveaux de couleurs** : des teintes de base (`--violet-500`…) et des rôles (`--color-action`…). Les composants n'utilisent que les rôles ; changer une teinte ne touche aucun composant (DA §2).
3. **Plat** : pas d'ombres portées. La profondeur vient des surfaces et des couleurs de section.
4. **Accessible par défaut** : contraste AA vérifié pour chaque paire texte / fond, focus visible partout, `prefers-reduced-motion` respecté.
5. **Des briques, pas des sections** : un composant porte un mécanisme (un effet, une interaction, une disposition), jamais le contenu ni l'agencement d'une page. Les textes arrivent par des options ou des slots ; les pages assemblent les briques (§5).
6. **Réglables** : tout ce qui varie d'un usage à l'autre est une option documentée, avec une valeur par défaut tirée des tokens.
7. **Démontrables** : chaque composant a sa page dans le catalogue de développement, avec un panneau de réglages en direct (§6).

---

## 2. Tokens

### Couleurs de base

| Token | Valeur | Origine |
|---|---|---|
| `--violet-500` | `#4B3CFF` | palette du propriétaire |
| `--violet-700` | `#17105B` | palette du propriétaire |
| `--lime-500` | `#C7FF00` | palette du propriétaire |
| `--pink-500` | `#FF6BD6` | palette du propriétaire |
| `--topo-via` | `#6F63FF` | pentes du fond topographique, entre le violet vif et le rose |
| `--neutral-50` | `#F5F1E8` | palette du propriétaire |
| `--neutral-100` | `#E8E1D4` | palette du propriétaire |
| `--neutral-400` | `#A39E94` | **ajout** : métadonnées et texte discret |
| `--neutral-700` | `#474747` | palette du propriétaire |
| `--neutral-850` | `#232428` | **ajout** : surface au survol |
| `--neutral-900` | `#1A1B1E` | **ajout** : surface des cartes |
| `--neutral-950` | `#101113` | palette du propriétaire |

### Rôles

| Token | Pointe vers | Usage | Contraste vérifié |
|---|---|---|---|
| `--color-bg` | neutral-950 | Fond de page | — |
| `--color-section` | violet-700 | Sections de couleur (dont la section d'accueil) | — |
| `--color-surface` | neutral-900 | Cartes, blocs | texte 15,3:1 |
| `--color-surface-hover` | neutral-850 | Carte survolée | texte 13,8:1 |
| `--color-text` | neutral-50 | Texte principal | 16,8:1 sur fond |
| `--color-text-muted` | neutral-100 | Texte secondaire | 14,5:1 sur fond |
| `--color-text-subtle` | neutral-400 | Métadonnées, légendes | 7,1:1 sur fond · 6,2:1 sur violet |
| `--color-action` | lime-500 | Boutons principaux, liens, mots clés | 16:1 sur fond · 14,1:1 sur violet |
| `--color-highlight` | lime-500 | Mise en valeur ponctuelle : quelques mots en Fraunces italique, jamais soulignés | 16:1 sur fond · 14,1:1 sur violet |
| `--color-on-action` | neutral-950 | Texte sur lime | 16:1 |
| `--color-detail` | pink-500 | Étiquettes, petits marqueurs | 7,5:1 sur fond · 6,8:1 sur surface |
| `--color-block` | violet-500 | Contours, formes, grands titres décoratifs | jamais en texte courant |
| `--color-border` | neutral-700 | Filets et bordures décoratives | — |
| `--color-header-bg` | neutral-50 | Fond du header | — |
| `--color-header-text` | neutral-950 | Texte du header | 16,8:1 |
| `--color-header-accent` | violet-500 | Lien actif et focus dans le header | 5,5:1 |
| `--color-header-muted` | neutral-400 | Séparateurs décoratifs du header (« / » entre FR et EN), masqués aux lecteurs d'écran ; jamais en texte | 2,4:1 (décoratif) |
| `--color-focus` | lime-500 | Anneau de focus sur fond sombre | — |

**Attention** : le lime est inutilisable sur le header clair (1,1:1). Dans le header, l'accent et le focus passent en violet-500.

### Fonds de section

Chaque `PageSection` (et chaque `PosterCard`) porte un fond (DA v1.2, « Fonds de section »). Le fond **redéfinit les rôles** pour tout ce qu'il contient : les composants n'utilisent que les rôles, ils s'adaptent donc sans variante. En CSS : une classe `fond-<nom>` sur la section, qui réaffecte les variables de rôle.

| Rôle | Nuit | Violet | Violet vif | Lime | Rose | Crème |
|---|---|---|---|---|---|---|
| fond de la section | neutral-950 | violet-700 | violet-500 | lime-500 | pink-500 | neutral-50 |
| `--color-text` | neutral-50 | neutral-50 | neutral-50 | neutral-950 | neutral-950 | neutral-950 |
| `--color-text-muted` | neutral-100 | neutral-100 | neutral-50 | neutral-950 | neutral-950 | neutral-950 |
| `--color-text-subtle` | neutral-400 | neutral-100 | neutral-50 | neutral-700 | neutral-950 | neutral-700 |
| `--tag-tint` | 14 % | 14 % | 0 | 0 | 0 | 0 |
| `--color-action` | lime-500 | lime-500 | lime-500 | neutral-950 | neutral-950 | neutral-950 |
| `--color-on-action` | neutral-950 | neutral-950 | neutral-950 | lime-500 | pink-500 | lime-500 |
| `--color-highlight` | lime-500 | lime-500 | lime-500 | violet-500 | violet-700 | violet-500 |
| `--color-detail` | pink-500 | pink-500 | neutral-50 | violet-500 | violet-700 | violet-500 |
| `--color-focus` | lime-500 | lime-500 | lime-500 | neutral-950 | neutral-950 | neutral-950 |

Contrastes les plus faibles, tous conformes AA : texte sur violet vif 5,5:1 (sections courtes seulement), violet-500 sur lime 5,2:1, neutral-700 sur lime 7,9:1 et sur crème 8,2:1. Sur rose, le texte discret reste en neutral-950 (neutral-700 n'y fait que 3,7:1). Sur violet, il passe en neutral-100 : du gris sur une couleur paraît terne. Le fond teinté des étiquettes n'existe que sur les fonds sombres : sur les autres, il ferait passer leur texte sous 4,5:1.

Sur les fonds clairs, l'action devient noire : un lien `inline` est noir et souligné, le bouton `primary` est noir avec un texte lime (ou rose sur fond rose).

`--color-action` et `--color-highlight` pointent vers la même teinte, mais restent deux rôles : on pourra changer la couleur des mises en valeur sans toucher aux boutons. Un lien est toujours souligné, une mise en valeur jamais (DA §2, règle 1).

### Typographie

| Token | Valeur |
|---|---|
| `--font-display` | `'Bagel Fat One'`, repli arrondi système |
| `--font-accent` | `'Fraunces'` italique (`SOFT` 100, `WONK` 1) |
| `--font-body` | `'Manrope'`, repli système |
| `--font-mono` | `'JetBrains Mono'`, repli monospace |
| `--text-hero` | `clamp(5.5rem, 12vw, 9.5rem)` · 88 → 152 px · nom de la section d'accueil sur une ligne (≥ 768 px), environ 90 % de la largeur |
| `--text-hero-stacked` | `19vw` · nom sur deux lignes (< 768 px), « Maskulov » occupe environ 90 % de la largeur |
| `--text-display` | `clamp(3.5rem, 1.5rem + 9vw, 6rem)` · 56 → 96 px |
| `--text-h1` | `clamp(2.5rem, 1.6rem + 4vw, 4rem)` · 40 → 64 px |
| `--text-h2` | `clamp(1.875rem, 1.4rem + 2vw, 2.5rem)` · 30 → 40 px |
| `--text-h3` | `clamp(1.5rem, 1.3rem + 1vw, 1.75rem)` · 24 → 28 px |
| `--text-body` | `clamp(1rem, 0.95rem + 0.25vw, 1.125rem)` · 16 → 18 px |
| `--text-sm` | `0.875rem` · 14 px |
| `--text-ui` | `1rem` · 16 px · navigation, boutons, sélecteur de langue |
| `--text-lead` | `clamp(1.25rem, 1.1rem + 0.6vw, 1.5rem)` · 20 → 24 px · promesse, accroches |
| `--text-logo` | `clamp(1.125rem, 1rem + 0.5vw, 1.375rem)` · 18 → 22 px · nom dans le header |
| `--text-menu` | `3.25rem` · 52 px · liens du menu mobile |
| `--leading-none` | `1` · boutons, logo |
| `--leading-display` | `0.95` |
| `--leading-snug` | `1.3` · petits libellés, légendes |
| `--leading-body` | `1.6` |
| `--weight-regular` / `-medium` / `-bold` | `400` · `500` · `700` |
| `--tracking-label` | `0.05em` · libellés en capitales |

Règle ajoutée : les titres de cartes de projet (`--text-h3`) sont en Bagel. Bagel reste interdit pour le texte courant, les boutons et la navigation de l'en-tête ; seule exception, les liens du menu mobile (`--text-menu`, DA §3).

Règle ajoutée : aucune taille hors échelle. Tout texte passe par un token `--text-*`, et rien ne descend sous `--text-sm` (14 px).

### Polices

Auto-hébergées, aucune dépendance à Google Fonts en production. Fichiers `woff2`, sous-ensemble latin, rangés dans `public/fonts/` avec leurs licences (SIL Open Font License).

| Fichier | Contenu |
|---|---|
| `bagel-fat-one-latin.woff2` | Bagel Fat One, graisse unique |
| `fraunces-italic-latin.woff2` | Fraunces italique seule, `SOFT` 100 et `WONK` 1 figés, graisse 400, taille optique variable |
| `manrope-latin.woff2` | Manrope variable, graisses 400 à 700 |
| `jetbrains-mono-latin.woff2` | JetBrains Mono variable, graisses 400 à 500 |

Les `@font-face` (avec `font-display: swap`) seront écrits en phase 7, une fois la stack choisie.

### Espacements, rayons, mise en page

| Token | Valeur |
|---|---|
| `--space-1` → `--space-10` | 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128 px |
| `--space-section` | `clamp(4rem, 10vw, 8rem)` |
| `--gutter` | `clamp(1rem, 4vw, 3rem)` |
| `--container` | `1240px` |
| `--toc-width` | `13rem` · colonne du sommaire collant des études de cas |
| `--stat-bar` | `12px` · épaisseur des barres avant / après de `StatBlock` |
| `--measure` | `52ch` · largeur max du texte courant, environ 70 caractères en Manrope (sous les 80 recommandés) |
| `--radius-sm` / `-md` / `-lg` / `-pill` | 8 · 16 · 28 px · 999 px |
| `--border-thin` / `--border-strong` | 1 px · 1,5 px |
| `--underline` | 2 px · soulignement des liens |
| `--focus-width` / `--focus-offset` | 2 px · 3 px |
| `--target-min` | 44 px · zone cliquable minimale, sur toutes les tailles d'écran |
| `--tag-tint` | 14 % · opacité du fond teinté des étiquettes |
| `--header-height` | 60 px · hauteur du header (zone cliquable de 44 px + marges), réservée en haut des pages |
| Points de rupture | 768 px (tablette) · 1024 px (bureau) · constantes : CSS n'accepte pas de variables dans les media queries |
| `--icon-sm` / `--icon-md` | 18 px · 24 px |
| `--timeline-dot` | 14 px · repère d'une étape de la frise |
| `--skill-dot` | 10 px · pastille de `DotList` |
| `--icon-stroke` | 2,5 · épaisseur du trait des icônes |

### Motion

| Token | Valeur | Usage |
|---|---|---|
| `--ease-out` | `cubic-bezier(0.22, 1, 0.36, 1)` | Toutes les animations (sensation fluide) |
| `--duration-fast` | `250ms` | Survol, clic |
| `--duration-base` | `700ms` | Apparitions |
| `--stagger-letter` | `40ms` | Nom lettre par lettre |
| `--stagger-block` | `80ms` | Blocs successifs |
| `--duration-reduced` | `300ms` | Fondus quand les animations sont réduites |
| `--hover-lift` | `3px` | Bouton qui monte au survol |
| `--hover-nudge` | `4px` | Flèche qui avance au survol |
| `--duration-press` | `120ms` | Retour au clic (appui) |
| `--press-scale` | `0.98` | Bouton enfoncé au clic |
| `--feedback-hold` | `2s` | Durée d'affichage d'une confirmation (« Adresse copiée ») |
| `--reveal-distance` | `24px` | Montée d'un bloc qui apparaît au scroll |
| `--card-lift` | `8px` | Carte qui se soulève au survol ou au focus |
| `--duration-letter` | `600ms` | Montée d'une lettre du nom |
| `--letter-rise` | `0.4em` | Hauteur dont chaque lettre monte avant de se poser |
| `--hero-parallax` | `0.35` | Le nom descend à 35 % de la vitesse du scroll en quittant l'écran |
| `--stagger-brick` | `60ms` | Étapes de la méthode, posées brique par brique |
| `--stagger-bar` | `150ms` | Barre « après » d'un résultat chiffré, après l'« avant » |
| `--hint-travel` | `12px` | Course du repère de l'indicateur de scroll |
| `--duration-hint` | `1200ms` | Un aller de l'indicateur de scroll |
| `--duration-bar` | `900ms` | Barres de `StatBlock` qui se remplissent |

Avec `prefers-reduced-motion: reduce`, les durées de déplacement tombent à 0 et seules les opacités restent (`--duration-reduced`).

---

## 3. Catalogue des composants

Rangés par famille, comme une bibliothèque de composants (référence : vue-bits.dev). Chaque composant est une brique générique : il reçoit son contenu par des options (props) et des emplacements (slots), ne contient aucun texte de page et ne sait pas sur quelle page il sera. Les pages les assemblent (§5).

### Fonds

| Composant | Rôle | Options principales | Vient de |
|---|---|---|---|
| `TopoBackground` | Courbes de niveau animées (WebGL), derrière une section | `from`, `to` (teintes), `speed`, `density`, `fade` (estompe au centre) | `TopoBackground` |
| `SectionWave` | Vague organique entre deux sections de fonds différents | `seed`, `from`, `to` (fonds), `transparent` (le dessus laisse voir le fond animé de la section du dessus) | `SectionWave` |

### Textes animés

| Composant | Rôle | Options principales | Vient de |
|---|---|---|---|
| `LetterReveal` | Texte dont les lettres montent et se posent une à une | `text`, `as` (balise), `stagger`, `delay`, `start` (`load`, `visible`, `manual`), `stack` (un mot par ligne sous 768 px) | `HeroName` |

### Animations

| Composant | Rôle | Options principales | Vient de |
|---|---|---|---|
| `v-reveal` (directive) | Apparition au scroll : monte de `--reveal-distance` et apparaît, une fois | rang du bloc (décalage) | existe |
| `ScrollParallax` | Ce qu'il enveloppe descend plus lentement que le scroll et s'estompe en quittant l'écran | `speed`, `fade` | effet de scroll de la section d'accueil |
| `ScrollHint` | Trait discret qui indique que la page continue | `delay`, `passes` (allers, jamais en boucle) | `ScrollHint` |
| `DragToSnap` | Élément à glisser vers une cible, où il se loge (souris, doigt, clavier) | `reach`, `disabled` ; événements `near`, `snap` ; la cible est passée par l'option `target` | `BrickRepair` |

### Composants

| Composant | Rôle | Options principales | Slots | Vient de |
|---|---|---|---|---|
| `BaseButton` | Bouton ou lien-bouton | `variant` (`primary`, `outline`), `icon`, `to`, `href`, `download`, `compact` | défaut | existe |
| `TextLink` | Lien texte souligné | `variant` (`inline`, `standalone`), `icon`, `iconStart`, `to`, `href` | défaut | existe |
| `BaseTag` | Étiquette | — | défaut | existe |
| `BaseIcon` | Icône | `name`, `size` | — | existe |
| `CopyButton` | Texte à copier, avec confirmation | `value`, `small` | — | existe |
| `PosterCard` | Carte « affiche » : surface d'un fond donné, inclinée ou non, qui peut se soulever | `fond`, `tilt` (multiple de `--poster-tilt`), `lift`, `as` | défaut | cartes de `ContactCard`, `SkillCards`, `BusinessCard` |
| `ProjectCard` | Carte de projet : capture, étiquettes, titre, phrase, stack | `project` | — | existe |
| `DeviceFrame` | Cadre navigateur ou téléphone autour d'une capture | `device`, `src`, `label`, `stage` | — | existe |
| `DotList` | Liste à pastilles ; certaines lignes mises en avant | `items` (`name`, `highlight`) | — | listes de `SkillCards` |
| `DefinitionList` | Fiche : un libellé et une valeur par ligne | `items` (`label`, `value`, `note`) | — | `MetaList` |
| `StatBlock` | Résultat chiffré, avec barres avant / après | `value`, `label`, `before`, `after` | — | existe |
| `BaseTimeline` | Frise d'étapes, centrée alternée sur bureau, fil tracé au scroll | `items`, `alternate`, `draw` | `item` (une étape) | `CareerTimeline` |
| `CycleSteps` | Étapes d'un cycle : anneau sur bureau, frise en boucle sur mobile | `steps` (`title`, `text`) | `center` (phrase du retour) | `ProcessSteps` variante `cycle` |
| `NumberedSteps` | Étapes numérotées reliées par un filet | `steps` (`title`, `text`) | — | `ProcessSteps` variante `detail` |
| `StickyToc` | Sommaire collant qui suit le bloc en cours | `items` (`id`, `label`), `label` | — | `CaseToc` |
| `NextLink` | Grand lien vers la suite (libellé, titre, flèche) | `label`, `title`, `to` | — | lien principal de `CaseNav` |

### Mise en page

| Composant | Rôle | Options principales | Slots | Vient de |
|---|---|---|---|---|
| `PageSection` | Section : fond, conteneur, titre et introduction | `fond`, `title`, `labelledby` | défaut, `intro` | existe |
| `PageIntro` | Haut de page : `h1`, phrase, actions | `title`, `fond`, `center`, `full` | défaut, `before`, `actions`, `after` | existe |
| `PosterGrid` | Grille « affiches collées » : décalages et inclinaisons selon la place | `columns` (3 ou 5) | défaut | `ProjectPosters`, grille de `SkillCards` |
| `BentoGrid` | Grille bento : le premier en grand, une tuile large ; teinte de fond de capture selon la place ; lueur et inclinaison au pointeur en option | `glow`, `reach`, `tilt` | défaut | `ProjectBento` |

### Site

Propres à ce site (navigation, coordonnées) : ce ne sont pas des briques génériques, mais ils restent dans le catalogue pour être vérifiés.

| Composant | Rôle | Vient de |
|---|---|---|
| `AppHeader`, `MobileMenu`, `LangSwitch`, `AppFooter`, `SkipLink` | Navigation, langue, pied de page | existent |
| `ContactLinks` | Adresse à copier, CV, LinkedIn et GitHub, depuis `SITE` ; option `cvLabel` | blocs de `ContactCard` et `BusinessCard` |

### Ce qui n'est plus un composant

`HomeHero`, `ContactCard`, `BusinessCard`, `BrickRepair`, `SkillCards`, `CaseNav`, `ProjectPosters`, `ProjectBento`, `CareerTimeline`, `MetaList`, `CaseToc`, `ProcessSteps`, `HeroName` : leurs mécanismes passent dans les briques ci-dessus, leur contenu et leur disposition dans les pages (§5).

---

## 4. Spécifications

Chaque composant : rôle, options, états, accessibilité, motion. Les valeurs viennent des tokens (§2). Une option sans valeur par défaut indiquée est obligatoire.

### `AppHeader`

Repris du header existant du propriétaire, adapté à la DA.

- **Forme** : barre claire (`--color-header-bg`), fixée en haut et centrée, largeur max `--container`, coins inférieurs arrondis (`--radius-lg`). Elle « pend » du haut de l'écran, au-dessus de tout le contenu.
- **Contenu** : à gauche, le nom en Bagel (`--text-logo`, logo provisoire, lien vers l'accueil) ; à droite, Projets · À propos · Contact (Manrope 500, `--text-ui`) et `LangSwitch`. Le « / » entre FR et EN est en `--color-header-muted`, avec `aria-hidden="true"`.
- **Zones cliquables** : 44 × 44 px minimum (`--target-min`) pour chaque lien, FR, EN, le bouton « Menu » et le bouton « Fermer », sur bureau comme sur mobile. Le texte garde sa taille ; c'est la zone autour qui grandit.
- **États des liens**
  - Repos : `--color-header-text`.
  - Survol : soulignement violet-500 qui se trace de gauche à droite (`--duration-fast`).
  - Page active : soulignement violet-500 permanent, `aria-current="page"`.
  - Focus : anneau violet-500 de 2 px.
- **Mobile (< 768 px)** : nom + bouton « Menu » (icône). Le menu (`MobileMenu`) s'ouvre en plein écran, sur fond `--color-section` (violet), avec les liens en Bagel très grands (`--text-menu`). C'est la seule exception à la règle « pas de Bagel dans la navigation » (DA §3), validée par le propriétaire.
- **Apparition** : en même temps que le nom de la section d'accueil (fondu + léger glissement depuis le haut, `--duration-base`).
- **Au scroll** : reste visible en permanence.
- **Accessibilité** : `<header>` + `<nav aria-label="Navigation principale">` ; `SkipLink` en premier élément focusable ; bouton du menu avec `aria-expanded` et `aria-controls` ; menu ouvert : focus piégé, `Échap` ferme et rend le focus au bouton.

### `BaseButton`

- **Rôle** : déclencher une action ou mener à une page importante (CV, contact, tous les projets, projet suivant).
- **Élément** : `<a>` quand il mène quelque part (avec `download` pour le CV), `<button type="button">` quand il agit sur la page. Jamais un `<div>` cliquable.
- **Options** : `variant` (`primary`, `outline` par défaut) ; `icon` (`arrow-right`, `download`, `arrow-up-right`, `github`) ; `to` (route) ou `href` ; `download` ; `compact` (hauteur `--target-min`, pour `CopyButton`).
- **Variantes**
  - `primary` : fond `--color-action`, texte `--color-on-action`. Une seule par écran visible : c'est l'action principale.
  - `outline` : transparent, bordure `--border-strong` et texte `--color-text`.
- **Taille unique** : Manrope `--weight-bold`, `--text-ui`, `--leading-none` ; marges `--space-4` × `--space-5` ; hauteur ≥ `--target-min` ; rayon `--radius-pill`.
- **Icône optionnelle, à droite** (`--icon-sm`) : `arrow-right` pour aller vers une page, `download` pour le CV, `arrow-up-right` pour un site externe, `github` pour le code d'un projet. Pas d'icône décorative.
- **États**
  - Survol : `primary` passe en fond `--color-text` ; `outline` se remplit en `--color-text` avec texte `--color-bg`. Le bouton monte de `--hover-lift`. L'icône avance de `--hover-nudge` dans son sens (droite, bas pour `download`, diagonale pour `arrow-up-right` ; le logo `github` ne bouge pas). Durée `--duration-fast`, courbe `--ease-out`.
  - Clic : `scale(var(--press-scale))` en `--duration-press`.
  - Focus : anneau `--focus-width` en `--color-focus`, décalé de `--focus-offset`.
  - Pas d'état désactivé ni de chargement : aucune action de la V1 n'en a besoin.
- **Animations réduites** : ni montée, ni avancée de l'icône, ni enfoncement ; les changements de couleur restent.

### `TextLink`

- **Rôle** : lien texte. Toujours souligné, pour ne jamais se confondre avec une mise en valeur (DA §2, règle 1).
- **Options** : `variant` (`inline` par défaut, `standalone`) ; `icon`, `iconStart` (icône avant le texte) ; `to` ou `href`.
- **Variantes**
  - `inline` (dans un paragraphe) : texte `--color-action`, soulignement de 1 px à `0.2em` sous le texte. Survol et focus : le soulignement passe à `--underline` (2 px), sans animation, pour rester correct sur un lien qui passe à la ligne.
  - `standalone` (liens isolés : pied de page, listes) : texte `--color-text`, soulignement de 1 px. Survol et focus : texte en `--color-action` et trait de `--underline` qui se trace de gauche à droite (`scaleX`, `--duration-move`).
- **Lien externe** (`href` en `http`) : icône `arrow-up-right` (`--icon-sm`) après le texte, `target="_blank"`, `rel="noopener"`, et la mention « (nouvel onglet) » lisible par les lecteurs d'écran seulement.
- **Lien visité** : même apparence.
- **Animations réduites** : le trait apparaît sans se tracer ; le changement de couleur reste.

### `BaseTag`

- **Rôle** : étiquette d'information rose (poste visé, type de projet, type d'étape). Jamais cliquable en V1.
- **Style** : contour épais. Bordure `--border-strong` et texte `--color-detail`, fond teinté de la même couleur à `--tag-tint` (`color-mix`), sur les fonds sombres seulement.
- **Commun** : Manrope `--weight-medium`, `--text-sm`, `--leading-none` ; marges `--space-2` × `--space-3` ; rayon `--radius-pill` ; en minuscules.
- **Règle** : une à deux étiquettes par carte au plus. La stack technique n'est pas en étiquettes roses (le rose reste rare).

### `BaseIcon`

- **Bibliothèque** : Lucide (DA §5), copiée en SVG local (licence ISC) : on n'embarque que les icônes qui servent. Logos GitHub et LinkedIn : tracés Lucide actuels, en SVG local.
- **Options** : `name` (`arrow-right`, `arrow-left`, `arrow-up-right`, `download`, `copy`, `check`, `menu`, `x`, `mail`, `github`, `linkedin`) ; `size` (`sm` par défaut, `md`).
- **Rendu** : `fill="none"`, `stroke="currentColor"`, trait `--icon-stroke`, extrémités et angles arrondis.
- **Accessibilité** : `aria-hidden="true"`. Une icône seule dans un bouton ou un lien a un nom accessible (`aria-label` sur le bouton ou le lien, pas sur le SVG).

### `CopyButton`

- **Rôle** : copier un texte (l'adresse mail) en un clic.
- **Options** : `value` (le texte) ; `small` (texte en taille courante, pied de page).
- **Composition** : le texte affiché en clair et sélectionnable, puis un `BaseButton` `outline` `compact` avec l'icône `copy` et « Copier ».
- **Succès** : l'icône `copy` cède la place à `check` (fondu croisé, et `check` qui grandit de 0,6 à 1 en `--duration-fast`) ; le texte devient « Adresse copiée » ; retour à l'état initial après `--feedback-hold`. Le message est annoncé aux lecteurs d'écran (`aria-live="polite"`).
- **Échec** (presse-papiers refusé) : le texte est sélectionné et le bouton affiche « Sélectionnée : Ctrl + C ».
- **Animations réduites** : fondu croisé seul.

### `SkipLink`

- **Rôle** : « Aller au contenu », premier élément focusable de chaque page, vers `<main id="contenu">`.
- **Repos** : hors de l'écran (mais lisible par les lecteurs d'écran).
- **Focus** : apparaît en haut à gauche, au-dessus du header ; fond `--color-action`, texte `--color-on-action`, Manrope `--weight-bold`, rayon `--radius-pill`, hauteur ≥ `--target-min`. Il glisse depuis le haut en `--duration-fast`.
- **Animations réduites** : apparition en fondu.

### `PageSection`

- **Rôle** : conteneur de chaque section de page. `<section>` relié à son titre (`aria-labelledby`).
- **Options** : `fond` (`nuit` par défaut, `violet`, `vif`, `lime`, `rose`, `creme`) ; `title` (le `h2`, facultatif) ; `labelledby` (quand le titre est dans le contenu). Slots : défaut, `intro` (la phrase sous le titre).
- **Mise en page** : contenu centré, largeur max `--container`, marges latérales `--gutter`, marges verticales `--space-section`.
- **Fond** : réaffecte les rôles (voir « Fonds de section »). Règles (DA v1.2) : deux sections qui se suivent n'ont jamais le même fond ; une seule section `lime` ou `rose` par page ; `vif` pour les sections courtes ; les lectures longues restent sur `nuit`.
- **Frontière** : chaque changement de fond est marqué par une `SectionWave`.
- **Titre** : `h2` en Bagel `--text-h2`, aligné à gauche ; introduction en `--text-lead`, avec au plus une mise en valeur.

### `SectionWave`

- **Rôle** : casser la frontière droite entre deux sections de fonds différents (DA v1.2).
- **Options** : `seed` (graine du tirage), `from` et `to` (fonds des deux sections).
- **Rendu** : un SVG décoratif (`aria-hidden="true"`) entre les deux sections. Son fond est celui de la section suivante ; la vague, de la couleur de la section précédente, en descend.
- **Forme** : un bord lissé, somme de trois ondulations dont la longueur, l'amplitude et la phase sont tirées au sort (longueurs d'onde 300 à 560, 130 à 220 et 60 à 90 px ; amplitudes 60 à 100 %, 22 à 40 % et 4 à 9 %). Amplitude de base 12 à 21 px, réduite jusqu'à 60 % sur les écrans étroits.
- **Tirage** : même graine, même vague ; recalculée à la largeur réelle de l'écran, avec un rendu de référence à 1440 px servi avant le calcul.
- **Pas d'animation**.

### `PageIntro`

- **Rôle** : haut de page : titre de page, une phrase, des actions.
- **Options** : `title` (le `h1`) ; `fond` (`violet` par défaut) ; `center` (contenu centré) ; `full` (toute la hauteur de l'écran, contenu centré verticalement). Slots : défaut (la phrase), `before` (au-dessus du titre), `actions` (boutons), `after` (sous la phrase).
- **Contenu** : `h1` en Bagel `--text-h1` ; la phrase en Manrope `--text-lead`, `--color-text-muted`.
- **Mise en page** : alignée à gauche par défaut ; marge haute `--header-height` + `--space-8` pour passer sous le header fixe.
- **Apparition** : le titre, la phrase puis les actions, avec `v-reveal` (`--stagger-block`).

### `AppFooter`

- **Rôle** : CV, contact et liens du site sur toutes les pages.
- **Colonnes** (3 sur bureau, empilées sur mobile) ; titres en Manrope `--weight-bold`, `--text-sm`, `--color-text-subtle` :
  - **CV** : « CV en français » et « CV en anglais », liens `standalone` avec l'icône `download`.
  - **Contact** : l'adresse avec `CopyButton`, LinkedIn et GitHub.
  - **Ce site** : « Code du site » (externe), « Mentions légales », « Confidentialité ».
- **Dernière ligne** : « © 2026 Costa Maskulov », `--text-sm`, `--color-text-subtle`.
- **Pas d'animation**.

### `ContactLinks`

- **Rôle** : les coordonnées du propriétaire, au même format partout : l'adresse avec `CopyButton`, puis le CV de la langue de la page (`BaseButton` `primary`, icône `download`), LinkedIn et GitHub (`TextLink` `standalone` externes). Valeurs lues dans `SITE`.
- **Options** : `cvLabel` (« Télécharger le CV » par défaut, « Le CV » sur la carte de visite) ; `addressLabel` (libellé au-dessus de l'adresse, facultatif).
- **Mise en page** : l'adresse sur sa ligne, les liens en ligne à la suite (`--space-3` × `--space-5`), qui passent à la ligne.

### `PosterCard`

- **Rôle** : la carte « affiche » de la DA (§5) : une surface d'un fond de section, posée sur une autre, éventuellement inclinée, qui se soulève au survol.
- **Options** : `fond` (`nuit` par défaut ; réaffecte les rôles comme une section) ; `tilt` (multiple de `--poster-tilt`, 0 par défaut ; appliqué à partir de 1024 px seulement) ; `lift` (se soulève de `--card-lift` et se redresse au survol ou au focus d'un élément intérieur, vrai par défaut) ; `as` (balise, `div` par défaut, `article` pour un contenu autonome).
- **Style** : rayon `--radius-md`, marges intérieures `clamp(--space-5, 8 %, --space-7)` (en part de la largeur de la place : serrées dans une grille de cinq, larges pour une carte seule). Pas d'ombre (principe « plat »).
- **Apparition** : compatible avec `v-reveal` sur le même élément (les transitions d'apparition et de soulèvement se cumulent).
- **Animations réduites** : `--poster-tilt` et `--card-lift` valent 0 : carte droite, sans soulèvement.

### `ProjectCard`

- **Rôle** : donner envie d'ouvrir une étude de cas.
- **Option** : `project` (résumé du projet : slug, titre, étiquettes, phrase, stack, capture).
- **Contenu, dans l'ordre** : `DeviceFrame` avec la capture ; une ou deux `BaseTag` ; titre `h3` en Bagel `--text-h3` ; une phrase en `--color-text-muted` ; la stack en `--text-sm` et `--color-text-subtle`.
- **Lien** : un seul lien, sur le titre, étendu à toute la carte : toute la carte est cliquable, et le lecteur d'écran n'entend qu'un lien.
- **Style** : fond `--color-surface`, rayon `--radius-md`, marges `--space-5`.
- **États** : survol et focus, fond `--color-surface-hover` (`--duration-fast`) ; focus, anneau `--color-focus` autour de toute la carte. Le soulèvement et l'inclinaison viennent de la grille (`PosterGrid`), l'inclinaison au pointeur de `BentoGrid`.

### `DeviceFrame`

- **Rôle** : mettre en scène une capture (DA §5).
- **Options** : `device` (`browser`, `phone`) ; `src` (image, facultative) ; `label` (texte de l'écran provisoire) ; `stage` (teinte du fond de capture, sinon `--color-section` ou celle posée par la grille).
- **Formats** : **1440 × 900** px pour `browser` (16:10), **390 × 844** px pour `phone`. L'image remplit l'écran (`object-fit: cover`, calée en haut), jamais déformée.
- **Proportions fixes** : la zone de fond prend la forme de la carte ; l'appareil garde ses proportions et monte du bas de la zone, coupé d'au plus 15 % (`browser`) ou 25 % (`phone`). Zone en `container-type: size`, largeur de l'appareil en `cqw` et `cqh`.
- **Style** : cadre `--color-surface`, bordure `--border-thin` `--color-border`, rayon `--radius-md` (navigateur) ou `--radius-lg` (téléphone) ; trois points en `--color-border`.
- **Image** : dimensions déclarées, `loading="lazy"` hors de l'écran d'ouverture ; `alt=""` dans une carte, un texte descriptif dans une étude de cas.
- **Sans capture** : écran en aplat `--neutral-850` avec le `label` en Bagel `--neutral-400`.

### `DotList`

- **Rôle** : une liste courte (technologies) où certaines lignes sont mises en avant par une pastille.
- **Option** : `items` (`name`, `highlight`).
- **Rendu** : `<ul>` ; chaque ligne en Manrope `--weight-bold`, précédée d'une pastille de `--skill-dot` : `--neutral-700`, ou violet vif cernée de `--neutral-50` (`--underline`) quand `highlight`. La couleur porte une information : la page affiche une légende.

### `DefinitionList`

- **Rôle** : une fiche d'informations, d'un coup d'œil.
- **Option** : `items` (`label`, `value`, `note` : précision en dessous, facultative).
- **Structure** : `<dl>` ; une information par ligne, libellé à gauche (6rem, `--text-sm`, `--color-text-subtle`), valeur à droite en Manrope `--weight-bold` ; un filet `--border-thin` `--color-border` sous chaque ligne. La `note` en `--text-sm`, `--weight-regular`, `--color-text-muted`.

### `StatBlock`

- **Rôle** : un résultat chiffré, prouvé (« un fait, un chiffre plutôt qu'un adjectif »).
- **Options** : `value`, `label` ; `before` et `after` (nombres, facultatifs) pour une comparaison ; `index` (rang, pour le décalage d'apparition).
- **Contenu** : la valeur en Bagel `--text-h1` ; le libellé en `--text-sm`, `--color-text-muted` ; avec `before` et `after`, deux barres de `--stat-bar` proportionnelles, « avant » en `--color-border`, « après » en `--color-highlight`, chacune avec sa valeur en clair.
- **Animation** : les barres se remplissent une fois à l'arrivée à l'écran (`scaleX`, `--duration-bar`, `--ease-out`), l'« après » `--stagger-bar` après l'« avant ». Pas de compteur qui défile.
- **Accessibilité** : les valeurs sont du texte ; les barres sont décoratives.
- **Animations réduites** : barres déjà remplies.

### `BaseTimeline`

- **Rôle** : une suite d'étapes dans le temps, du plus ancien au plus récent.
- **Options** : `items` (`tag`, `date`, `title`, `subtitle`, `text`, `link` : `to` et `label`, tous facultatifs sauf `title`) ; `alternate` (frise centrée alternée sur bureau, vrai par défaut) ; `draw` (fil tracé au scroll, vrai par défaut). Slot `item` pour remplacer le contenu d'une étape.
- **Structure** : `<ol>`, chaque étape avec un repère rond de `--timeline-dot` sur un fil (`--border-strong`, `--color-border`). Contenu par défaut : `BaseTag`, date (`--text-sm`, `--color-text-subtle`), titre (Manrope `--weight-bold`, `--text-lead`), sous-titre, texte (`--color-text-muted`), `TextLink` `standalone`.
- **Disposition** : avec `alternate`, à partir de 1024 px, le fil au milieu, une étape à gauche (texte aligné à droite), la suivante à droite, chacune sur une demi-largeur moins `--space-7`. Sinon, et sous 1024 px, le fil à gauche.
- **Au scroll** (`draw`) : un second fil en `--color-highlight` se trace au rythme du scroll (ligne à 65 % de l'écran) ; quand il atteint une étape, son repère se remplit (`--duration-fast`). Pas d'épinglage. GSAP et ScrollTrigger sont chargés à la demande.
- **Animations réduites, sans JavaScript ou sans `draw`** : fil tracé, repères remplis.

### `CycleSteps`

- **Rôle** : des étapes qui forment un cycle (la méthode : besoin → déploiement, puis un nouveau tour).
- **Options** : `steps` (`title`, `text`), en nombre pair (aucune étape en bas de l’anneau). Slot `center` : la phrase du retour (« Les retours relancent un tour. »).
- **Bureau (≥ 1024 px)** : un anneau (SVG, `aria-hidden`) de 400 px, les étapes numérotées dessus, réparties dans le sens horaire depuis le haut ; des arcs fléchés de l'une à l'autre ; l'arc de la dernière vers la première en pointillés. Les textes à droite pour la première moitié, à gauche pour la seconde, alignés vers l'anneau ; la phrase du retour au centre. La dernière étape a un repère plein `--color-action`.
- **Mobile et tablette** : une frise verticale (repères ronds reliés par un fil), puis une ligne qui remonte par la gauche jusqu'à la première étape, avec la phrase du retour en bas.
- **Accessibilité** : `<ol>` numérotée ; l'anneau est décoratif.
- **Apparition** : étape par étape (`v-reveal`, `--stagger-brick`). **Animations réduites** : fondu de l'ensemble.

### `NumberedSteps`

- **Rôle** : des étapes détaillées, numérotées.
- **Option** : `steps` (`title`, `text`).
- **Rendu** : `<ol>` ; pour chaque étape, le numéro en Bagel `--text-h3` et `--color-block` (grand texte décoratif), le nom en Manrope `--weight-bold` `--text-lead`, la phrase en `--color-text-muted` ; un filet vertical `--color-border` relie les numéros.
- **Apparition** : étape par étape (`--stagger-brick`). **Animations réduites** : fondu.

### `StickyToc`

- **Rôle** : sommaire collant d'une page longue, sur bureau seulement.
- **Options** : `items` (`id`, `label`) ; `label` (nom accessible de la navigation, « Sommaire » par défaut).
- **Structure** : `<nav aria-label>` puis une liste ordonnée de liens vers les blocs. Collant à `--header-height` + `--space-5` du haut ; masqué sous 1024 px.
- **États** : lien en `--color-text-subtle` ; survol en `--color-text` ; bloc en cours en `--color-text`, `--weight-bold`, avec un trait `--underline` `--color-highlight` à gauche et `aria-current="location"`. Bloc en cours : le dernier dont le haut a passé le premier tiers de l'écran (`IntersectionObserver`) ; suivi recalculé quand `items` change.
- **Zones cliquables** : chaque lien fait au moins `--target-min` de haut.

### `NextLink`

- **Rôle** : un grand lien vers la suite (le projet suivant).
- **Options** : `label` (« Projet suivant »), `title`, `to`.
- **Rendu** : le libellé en `--text-sm` `--weight-bold` ; le titre en Bagel `--text-h2`, suivi de l'icône `arrow-right` en `--icon-md`.
- **Survol et focus** : la flèche avance de `--hover-nudge` et le titre se souligne (`--underline`, tracé en `--duration-move`).

### `PosterGrid`

- **Rôle** : disposer des cartes en « affiches collées » (DA §5).
- **Option** : `columns` (3 par défaut, ou 5).
- **Disposition** : une colonne sur mobile, deux à partir de 768 px, `columns` à partir de 1024 px. Sur bureau, chaque enfant reçoit `--tilt`, multiple de `--poster-tilt` selon sa place (-2°, 1,5°, -1°, puis 2° et -1,5° en 5 colonnes) et un décalage vertical (3 colonnes : `--space-5`, `--space-8`, 0 ; 5 colonnes : une sur deux de `--space-7`). Droites hors bureau.
- **Survol** : l'enfant se soulève de `--card-lift` et se redresse (classe `.poster`) ; appui à mi-hauteur en `--duration-press`.
- **Apparition** : les enfants se posent un à un (`v-reveal`, `--stagger-block`). **Animations réduites** : fondu, cartes droites, sans soulèvement.

### `BentoGrid`

- **Rôle** : une grille bento : le premier élément en grand.
- **Options** : `glow` (lueur et inclinaison au pointeur, faux par défaut) ; `reach` (portée de la lueur, 320 px) ; `tilt` (inclinaison maximale, 3°).
- **Grille** : bureau, 3 colonnes : le premier en 2 × 2, puis deux à droite, puis un simple et un large (deux colonnes, contenu côte à côte) ; tablette, 2 colonnes, le premier sur toute la largeur ; mobile, une colonne. Au-delà de cinq, les suivants se rangent à la suite.
- **Fond de capture** (DA §5) : chaque cellule pose `--stage` selon sa place : lime pour la première, puis violet foncé, rose, gris (`--neutral-700`), violet foncé, puis un cycle de quatre ; deux voisines n'ont jamais la même teinte, en 1, 2 ou 3 colonnes, et jamais de lime à côté de la première. Jamais de violet vif.
- **Lueur** (`glow`, souris seulement) : le bord et l'intérieur des cellules proches du pointeur s'allument (dégradé rose puis violet vif, halo violet vif à 30 %), d'autant plus que le pointeur est près ; la cellule survolée s'incline vers lui. Une écriture par image ; mesures sur la cellule, qui ne s'incline pas.
- **Enfants** : chaque enfant est rangé dans une cellule ; la grande cellule étire sa première ligne (le média, `DeviceFrame`) et agrandit son titre `h3`, la cellule large met le média à gauche.
- **Animations réduites** : pas d'inclinaison ; la lueur reste.

### `TopoBackground`

- **Rôle** : des courbes de niveau qui ondulent lentement derrière une section (DA §6). WebGL 2 natif, sans bibliothèque.
- **Options** : `from`, `via` et `to` (noms des tokens de couleur des creux, des pentes et des hauteurs : `violet-500`, `topo-via` et `pink-500` par défaut) ; `speed` (1, modifiable sans redémarrage) ; `density` (nombre de courbes, 1,4) ; `fade` (estompe au centre, derrière le contenu, vrai par défaut).
- **Comportement** : apparaît en fondu ; ne réagit pas au curseur ; se met en pause hors de l'écran et quand l'onglet est caché.
- **Accessibilité** : décoratif. **Animations réduites** : image fixe. Sans WebGL : le fond de la section seul.

### `LetterReveal`

- **Rôle** : un texte affiche dont les lettres montent et se posent une à une (le nom de la section d'accueil).
- **Options** : `text` ; `as` (balise, `span` par défaut) ; `stagger` (`--stagger-letter`) ; `delay` ; `start` (`load` à l'ouverture, `visible` à l'arrivée à l'écran, `manual` via la méthode exposée `play`) ; `stack` (chaque mot passe à la ligne sous 768 px).
- **Rendu** : animation en CSS (une transition par lettre, décalée de son rang) ; les lettres ne sont cachées qu'avec JavaScript (classe `.js` du document).
- **Mouvement** : chaque lettre monte de `--letter-rise` et se pose en `--duration-letter`, décalée de `stagger`, courbe `--ease-out`. Démarre quand la police Bagel est prête (300 ms d'attente au plus).
- **Accessibilité** : le texte en clair pour les lecteurs d'écran ; les lettres découpées dans un doublon `aria-hidden`. Sans JavaScript, le texte est visible d'emblée.
- **Animations réduites** : fondu de l'ensemble (`--duration-reduced`).

### `ScrollParallax`

- **Rôle** : faire glisser plus lentement ce qu'il enveloppe pendant que sa section quitte l'écran.
- **Options** : `speed` (`--hero-parallax` par défaut) ; `fade` (s'estompe en même temps, vrai par défaut) ; `until` (part du trajet sur laquelle l'estompe se fait, 1 par défaut).
- **Rendu** : seuls `transform` et `opacity` bougent ; piloté par ScrollTrigger, chargé à la demande.
- **Animations réduites** : aucun effet.

### `ScrollHint`

- **Rôle** : indiquer, très discrètement, que la page continue (DA §6).
- **Options** : `delay` (1,5 s) ; `passes` (2).
- **Forme** : un trait vertical fin (`--border-strong`, `--hint-height`, `--color-text-muted`) ; un segment `--color-highlight` le parcourt de `--hint-travel`.
- **Mouvement** (en CSS, sans script) : apparaît après `delay`, fait `passes` allers (`--duration-hint` chacun), puis s'immobilise : il ne boucle jamais (WCAG 2.2.2). Disparaît en fondu dès le premier scroll. Il se place en bas de la section qui le contient.
- **Accessibilité** : décoratif. **Animations réduites** : trait immobile.

### `DragToSnap`

- **Rôle** : un élément à glisser jusqu'à une cible, où il se loge (la brique de la 404).
- **Options** : `target` (l'élément cible) ; `reach` (distance de capture, 40 px) ; `label` (nom accessible du bouton) ; `disabled`. Slot défaut : l'apparence de l'élément. Événements : `near` (vrai ou faux, quand l'élément entre ou sort de la portée de la cible) ; `snap` (l'élément s'est logé).
- **Interaction** : glisser à la souris ou au doigt (Pointer Events, `touch-action: none`, bouton principal d'un seul pointeur) ; relâché dans la portée, l'élément se loge au centre de la cible ; relâché ailleurs, ou glisser interrompu par le navigateur, il revient à sa place. La position de la cible est mesurée une fois au début du glisser, depuis le point de repos (immobile).
- **Clavier et appui bref** : l'élément est un `button` ; Entrée, Espace ou un appui sans glisser le logent directement.
- **États** : repos, `dragging` (pendant le glisser), `placed` (logé). Le composant ne porte que le déplacement (propriété `translate`, en `--duration-move`) ; l'apparence vient de la page, par le slot, qui reçoit `dragging` et `placed` (inclinaison, couleur et leurs transitions).
- **Animations réduites** : mise en place sans transition (`--duration-move`).

---

## 5. Composition des pages

Les pages assemblent les briques. Un assemblage repris sur plusieurs pages (la prise de contact) vit dans `src/pages/blocs/` : il ne contient que des briques du catalogue et du contenu, et n'est pas lui-même dans le catalogue.

### Rythme des fonds

Accueil `violet` (section d'accueil) → `nuit` (projets) → `creme` (qui je suis) → `vif` (ma façon de travailler) → `lime` (prise de contact). Projets `violet` → `nuit` → `lime`. Étude de cas `violet` → `nuit` → `rose`. À propos `violet` → `creme` → `nuit` → `violet` → `nuit` → `lime`. Contact et 404 `violet`. Le pied de page (`nuit`) suit toujours une section d'une autre couleur. Une `SectionWave` à chaque changement.

### Bloc « Parlons-en » (accueil, Projets, À propos)

`PageSection` `lime` ; à gauche, « Parlons-en » en Bagel (`h2`, `clamp(3rem, 1.5rem + 7vw, 6rem)`) et une phrase propre à la page ; à droite sur bureau (colonnes 5/6), une `PosterCard` `nuit`, `tilt` 1, qui contient `ContactLinks` avec le libellé « Mon adresse ».

### Accueil

- **Section d'accueil** (DA §6) : `PageSection` `violet`, hauteur `100svh`, contenu centré, `TopoBackground` derrière. Dans l'ordre : le nom (`LetterReveal`, `as="h1"`, dans un `ScrollParallax`) ; « Étudiant ingénieur à l'ESIEA » et « Je cherche un stage de fin d'études full-stack » (Manrope `--text-lead` `--weight-medium`) ; la promesse « Créatif dans l'interface, rigoureux dans la méthode. » (mise en valeur sur la seconde moitié) ; « Télécharger le CV » (`primary`, `download`) et « Me contacter » (`outline`) ; `ScrollHint`.
- **Entrée** (une seule timeline, environ 1,5 s) : 0 s, le header descend ; 0 → 1,1 s, les lettres du nom ; 0,4 s, les lignes de statut puis la promesse ; 0,6 s, les boutons ; 1,5 s, `ScrollHint`. CV et contact lisibles avant 1 s. Au scroll, la promesse et les boutons s'estompent sur la première moitié (`ScrollParallax` `speed` 0, `until` 0,5).
- **Projets** : `PageSection` `nuit` ; `PosterGrid` (3 colonnes) de trois `ProjectCard` ; « Tous les projets » (`TextLink` `standalone`) aligné à droite.
- **Qui je suis** : `PageSection` `creme`.
- **Ma façon de travailler** : `PageSection` `vif` ; `CycleSteps` avec les six étapes de la méthode.
- **Parlons-en**.

### Projets

`PageIntro` ; `PageSection` `nuit` avec `BentoGrid` `glow` de `ProjectCard`, du plus récent au plus ancien ; Parlons-en.

### Étude de cas

- **En-tête** (`violet`) : `BaseTag` (type de projet) ; `h1` en Bagel `--text-h1` ; une phrase ; `DefinitionList` (type, rôle, durée, équipe, stack ; pour un code privé, la ligne « Code » : « Code privé » avec sa raison en `note`, jamais de bouton désactivé), à droite du titre sur bureau (colonnes 7/5) ; « Code » et « Démo » (`BaseButton` `outline`) ; la capture principale dans un `DeviceFrame` large.
- **Corps** (`nuit`) : sur bureau, `StickyToc` à gauche (`--toc-width`), les blocs à droite ; sur mobile, une colonne. Chaque bloc (contexte, besoin, contraintes, méthode, choix techniques, résultats, enseignements) a un `h2` Bagel `--text-h2`, un `id` et `scroll-margin-top` égal à `--header-height` + `--space-5`. Texte limité à `--measure`. Temps forts : les `StatBlock` (1 à 3 par ligne) ; au plus un autre bloc animé.
- **Fin** (`rose`) : `NextLink` vers le projet suivant (après le dernier, le premier) et `TextLink` `standalone` « Tous les projets » avec `arrow-left`.

### À propos

`PageIntro` ; « Mon histoire » (`creme`) ; « Mon parcours » (`nuit`) : `BaseTimeline` (`alternate`, `draw`) ; « Compétences » (`violet`) : `PosterGrid` (5 colonnes) de `PosterCard` `nuit` en `article`, chacune avec la catégorie en Fraunces italique `--color-highlight` (`h3`) et une `DotList` (technos de ce site en `highlight`), puis la légende « Pastille violette : les technos de ce site » et un lien vers l'étude de cas du portfolio ; « Ma façon de travailler » (`nuit`) : `NumberedSteps`, puis « Puis les retours de chaque mise en ligne relancent un tour. », avec à droite sur bureau un encadré « En équipe », collant ; Parlons-en.

### Contact

`PageIntro` `center` `full` : « Contact » et sa phrase ; slot `after` : une `PosterCard` `creme` sans inclinaison ni soulèvement, au format carte de visite (1,75:1, 40rem au plus ; hauteur du contenu sous 768 px) : le nom en Bagel, « Étudiant ingénieur · stage de fin d'études full-stack », puis `ContactLinks` (`cvLabel` « Le CV »).

### 404

`PageIntro` `center` `full` : « Il manque une brique. » et « Erreur 404 : cette page n'existe pas, ou plus. Replacez la brique pour revenir à l'accueil. » ; slot `before` : un mur crème de trois rangées appareillées (5, 4 et 5 briques de `--space-8` × `--space-6`, `--space-7` × `--space-5` sous 768 px), avec un trou en pointillés `--color-highlight`, puis la brique (`DragToSnap`, cible : le trou) inclinée de -14°, redressée à -4° pendant le glisser, lime une fois logée ; le trou s'allume quand `near`. Slot `after` : la ligne d'état (`aria-live`, « Le mur est complet. Retour à l'accueil… » au `snap`) et les boutons « Retour à l'accueil » (`primary`) et « Voir les projets » (`outline`, `arrow-right`). Au `snap`, la page mène à l'accueil après 0,9 s, y compris en mouvement réduit : le temps que l'état soit annoncé.

---

## 6. Catalogue de développement (`/design-system`)

- **Disponible en développement seulement** : jamais pré-rendu, jamais dans l'image de production (architecture technique §5). Son avenir après la V1 sera décidé plus tard.
- **Navigation** : une colonne à gauche, les tokens puis les familles du §3 (Fonds, Textes animés, Animations, Composants, Mise en page, Site) ; une page par composant (`/design-system/<composant>`).
- **Page d'un composant** :
  - **Démo** : le composant seul, sur un fond au choix (les six fonds de section), dans un cadre redimensionnable pour voir ses passages entre mobile, tablette et bureau.
  - **Panneau de réglages en direct** : un contrôle par option (champ de texte, nombre ou curseur, liste, case à cocher, fond), qui met la démo à jour immédiatement ; « Rejouer » pour les animations ; « Mouvement réduit » pour voir la version réduite sans changer le réglage du système.
  - **États** (composants interactifs) : repos, survol, focus, appuyé, côte à côte, sans passer la souris.
  - **Code** : l'appel du composant avec les réglages en cours, à copier.
  - **Options** : tableau nom, type, valeur par défaut, description ; slots et événements.
- **Une description par composant** (options, contrôles, valeurs de démo), à côté de la page du catalogue : le panneau et le tableau en sont tirés, sans rien écrire à la main.

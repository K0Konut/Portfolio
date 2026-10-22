# Design system — Portfolio personnel

Version 1.1 — 22/10/2026 — **statut : validé** (mis à jour après les maquettes de la phase 6 ; les nouveaux composants sont montrés dans `docs/06-maquettes/` en attendant la vitrine Vue)

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

S'appuie sur la direction artistique v1.0 « Affiche de nuit » et sur l'architecture v1.0 (wireframes). Les composants listés ici viennent des wireframes : pas de catalogue générique.

---

## 1. Principes

1. **Tokens uniquement** : aucune valeur en dur dans les composants. Couleurs, tailles, espacements, rayons et durées passent par des variables CSS (`src/styles/tokens.css`).
2. **Deux niveaux de couleurs** : des teintes de base (`--violet-500`…) et des rôles (`--color-action`…). Les composants n'utilisent que les rôles ; changer une teinte ne touche aucun composant (DA §2).
3. **Plat** : pas d'ombres portées. La profondeur vient des surfaces et des couleurs de section.
4. **Accessible par défaut** : contraste AA vérifié pour chaque paire texte / fond, focus visible partout, `prefers-reduced-motion` respecté.

---

## 2. Tokens

### Couleurs de base

| Token | Valeur | Origine |
|---|---|---|
| `--violet-500` | `#4B3CFF` | palette du propriétaire |
| `--violet-700` | `#17105B` | palette du propriétaire |
| `--lime-500` | `#C7FF00` | palette du propriétaire |
| `--pink-500` | `#FF6BD6` | palette du propriétaire |
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

Chaque `Section` porte un fond (DA v1.2, « Fonds de section »). Le fond **redéfinit les rôles** pour tout ce qu'il contient : les composants n'utilisent que les rôles, ils s'adaptent donc sans variante. En CSS : une classe `fond-<nom>` sur la section, qui réaffecte les variables de rôle.

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

## 3. Inventaire des composants

| Composant | Rôle | Pages |
|---|---|---|
| `AppHeader` | Header fixe : nom, navigation, langue | toutes |
| `LangSwitch` | Bascule FR / EN vers la page équivalente | header |
| `MobileMenu` | Menu plein écran sur mobile | header |
| `AppFooter` | CV FR / EN, mail, LinkedIn, GitHub, légal, code du site | toutes |
| `SkipLink` | « Aller au contenu », visible au focus | toutes |
| `PageIntro` | Haut de page : titre + phrase d'introduction | Projets, À propos, Contact, 404 |
| `Section` | Conteneur de section ; six fonds (nuit, violet, vif, lime, rose, crème) | toutes |
| `SectionWave` | Vague organique entre deux sections de fonds différents | toutes |
| `HeroName` | Nom géant (`--text-hero`), entrée lettre par lettre, effacement au scroll | Accueil |
| `TopoBackground` | Courbes de niveau animées (WebGL) derrière la section d'accueil | Accueil |
| `ScrollHint` | Indicateur de scroll très discret | Accueil |
| `BaseButton` | Bouton / lien-bouton : `primary` (lime), `outline` | toutes |
| `TextLink` | Lien texte avec soulignement animé | toutes |
| `CopyButton` | Copie le mail, confirme « Adresse copiée » | Accueil, Projets, À propos, Contact |
| `ContactCard` | Section « Parlons-en » : carte sombre inclinée (adresse, CV, LinkedIn, GitHub) | Accueil, Projets, À propos |
| `BusinessCard` | Carte de visite crème de la page Contact | Contact |
| `Tag` | Étiquette rose (poste, type de projet) | Accueil, Projets, études de cas |
| `ProjectCard` | Capture, titre, type, stack, phrase | Accueil |
| `ProjectBento` | Grille bento des projets, lueur au pointeur | Projets |
| `DeviceFrame` | Cadre navigateur / téléphone pour mettre en scène une capture | cartes, études de cas |
| `ProcessSteps` | Les 6 étapes de la méthode, en cycle | Accueil, À propos |
| `Timeline` + `TimelineItem` | Parcours scolaire et professionnel | À propos |
| `SkillCards` | Compétences en affiches collées, une carte par catégorie ; pastille violette pour les technos du site | À propos |
| `MetaList` | Type, rôle, durée, stack d'une étude de cas | études de cas |
| `CaseToc` | Sommaire collant (bureau uniquement) | études de cas |
| `StatBlock` | Résultat chiffré | études de cas |
| `CaseNav` | Retour à la liste / projet suivant | études de cas |
| `BrickRepair` | 404 : la brique tombée à replacer dans le mur, qui ramène à l'accueil | 404 |
| `Icon` | Icône au contour épais et arrondi (Lucide ou Tabler) | partout |

---

## 4. Spécifications

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
- **Mobile (< 768 px)** : nom + bouton « Menu » (icône). Le menu s'ouvre en plein écran, sur fond `--color-section` (violet), avec les liens en Bagel très grands (`--text-menu`) : c'est l'occasion de retrouver l'affiche de la section d'accueil. C'est la seule exception à la règle « pas de Bagel dans la navigation » (DA §3), validée par le propriétaire.
- **Apparition** : en même temps que le nom de la section d'accueil (fondu + léger glissement depuis le haut, `--duration-base`).
- **Au scroll** : reste visible en permanence.
- **Accessibilité** : `<header>` + `<nav aria-label="Navigation principale">` ; `SkipLink` en premier élément focusable ; bouton du menu avec `aria-expanded` et `aria-controls` ; menu ouvert : focus piégé, `Échap` ferme et rend le focus au bouton.

### `BaseButton`

- **Rôle** : déclencher une action ou mener à une page importante (CV, contact, tous les projets, projet suivant).
- **Élément** : `<a>` quand il mène quelque part (avec `download` pour le CV), `<button type="button">` quand il agit sur la page. Jamais un `<div>` cliquable.
- **Variantes**
  - `primary` : fond `--color-action`, texte `--color-on-action`. Une seule par écran visible : c'est l'action principale (le CV sur l'accueil).
  - `outline` : transparent, bordure `--border-strong` et texte `--color-text`.
- **Taille unique** : Manrope `--weight-bold`, `--text-ui`, `--leading-none` ; marges `--space-4` × `--space-5` ; hauteur ≥ `--target-min` ; rayon `--radius-pill`.
- **Icône optionnelle, à droite** (`--icon-sm`) : `arrow-right` pour aller vers une page, `download` pour le CV, `arrow-up-right` pour un site externe. Pas d'icône décorative.
- **États**
  - Survol : `primary` passe en fond `--color-text` ; `outline` se remplit en `--color-text` avec texte `--color-bg`. Le bouton monte de `--hover-lift`. L'icône avance de `--hover-nudge` dans son sens (droite, bas pour `download`, diagonale pour `arrow-up-right`). Durée `--duration-fast`, courbe `--ease-out`.
  - Clic : `scale(var(--press-scale))` en `--duration-press`.
  - Focus : anneau `--focus-width` en `--color-focus`, décalé de `--focus-offset`.
  - Pas d'état désactivé ni de chargement : aucune action de la V1 n'en a besoin.
- **Sur section violette** : mêmes styles, contrastes vérifiés (lime 14,1:1, texte 14,8:1).
- **Animations réduites** : ni montée, ni avancée de l'icône, ni enfoncement ; les changements de couleur restent.

### `TextLink`

- **Rôle** : lien texte. Toujours souligné, pour ne jamais se confondre avec une mise en valeur (DA §2, règle 1).
- **Variantes**
  - `inline` (dans un paragraphe) : texte `--color-action`, soulignement de 1 px à `0.2em` sous le texte. Survol et focus : le soulignement passe à `--underline` (2 px), sans animation, pour rester correct sur un lien qui passe à la ligne.
  - `standalone` (liens isolés : pied de page, listes) : texte `--color-text`, soulignement de 1 px. Survol et focus : texte en `--color-action` et trait de `--underline` qui se trace de gauche à droite (`scaleX`, `--duration-fast`).
- **Lien externe** : icône `arrow-up-right` (`--icon-sm`) après le texte, `target="_blank"`, `rel="noopener"`, et la mention « (nouvel onglet) » lisible par les lecteurs d'écran seulement.
- **Lien visité** : même apparence.
- **Animations réduites** : le trait apparaît sans se tracer ; le changement de couleur reste.

### `Tag`

- **Rôle** : étiquette d'information rose (poste visé, type de projet). Jamais cliquable en V1 (les filtres arrivent en V2).
- **Style** : contour épais. Bordure `--border-strong` et texte `--color-detail`, fond teinté de la même couleur à `--tag-tint` (`color-mix`), sur les fonds sombres seulement. Le contour fin se perdait sur le violet ; un fond plein, répété sur chaque carte, rendrait la couleur omniprésente.
- **Commun** : Manrope `--weight-medium`, `--text-sm`, `--leading-none` ; marges `--space-2` × `--space-3` ; rayon `--radius-pill` ; en minuscules (pas de capitales).
- **Règle** : une à deux étiquettes par carte au plus. La stack technique n'est pas en étiquettes roses (le rose reste rare) : elle s'écrit en texte discret dans `ProjectCard`.

### `Icon`

- **Bibliothèque** : Lucide (DA §5). Les icônes sont copiées en SVG local (licence ISC) plutôt qu'importées : on n'embarque que celles qui servent.
- **Logos GitHub et LinkedIn** : Lucide a déprécié ses logos de marques ; on garde ses tracés actuels, dans le même style, en SVG local.
- **Jeu de la V1** : `arrow-right`, `arrow-left`, `arrow-up-right`, `download`, `copy`, `check`, `menu`, `x`, `mail`, `github`, `linkedin`.
- **Rendu** : `fill="none"`, `stroke="currentColor"`, trait `--icon-stroke`, extrémités et angles arrondis ; taille `--icon-sm` dans un bouton ou un lien, `--icon-md` seule.
- **Accessibilité** : `aria-hidden="true"` par défaut. Une icône seule dans un bouton ou un lien a un nom accessible (`aria-label` sur le bouton ou le lien, pas sur le SVG).

### `CopyButton`

- **Rôle** : copier l'adresse mail en un clic (page Contact, pied de page).
- **Composition** : l'adresse affichée en clair et sélectionnable, puis un bouton `outline` compact (hauteur `--target-min`) avec l'icône `copy` et le texte « Copier ».
- **Succès** : l'icône `copy` cède la place à `check` (fondu croisé, et `check` qui grandit de 0,6 à 1 en `--duration-fast`) ; le texte devient « Adresse copiée » ; retour à l'état initial après `--feedback-hold`. Le message est annoncé aux lecteurs d'écran (`aria-live="polite"`).
- **Échec** (presse-papiers refusé) : l'adresse est sélectionnée et le texte devient « Sélectionnée : Ctrl + C ».
- **Animations réduites** : fondu croisé seul.

### `SkipLink`

- **Rôle** : « Aller au contenu », premier élément focusable de chaque page, vers `<main id="contenu">`.
- **Repos** : hors de l'écran (mais lisible par les lecteurs d'écran).
- **Focus** : apparaît en haut à gauche, au-dessus du header ; fond `--color-action`, texte `--color-on-action`, Manrope `--weight-bold`, rayon `--radius-pill`, hauteur ≥ `--target-min`. Il glisse depuis le haut en `--duration-fast`.
- **Animations réduites** : apparition en fondu.

### `Section`

- **Rôle** : conteneur de chaque section de page. `<section>` relié à son titre (`aria-labelledby`).
- **Mise en page** : contenu centré, largeur max `--container`, marges latérales `--gutter`, marges verticales `--space-section`.
- **Fond** : une propriété parmi `nuit` (par défaut), `violet`, `vif`, `lime`, `rose`, `creme`, qui réaffecte les rôles (voir « Fonds de section »).
- **Règles** (DA v1.2) : deux sections qui se suivent n'ont jamais le même fond ; une seule section `lime` ou `rose` par page ; `vif` pour les sections courtes ; les lectures longues restent sur `nuit`.
- **Rythme de l'accueil** : `violet` (section d'accueil) → `nuit` (projets) → `creme` (qui je suis) → `vif` (ma façon de travailler) → `lime` (prise de contact) → `nuit` (pied de page).
- **Rythme des autres pages** (maquettes, phase 6) : Projets `violet` → `nuit` → `lime` (« Parlons-en ») ; étude de cas `violet` → `nuit` → `rose` (`CaseNav`) ; À propos `violet` → `creme` → `nuit` → `violet` → `nuit` → `lime` ; Contact et 404 `violet`. Le pied de page (`nuit`) suit toujours une section d'une autre couleur.
- **Frontière** : chaque changement de fond est marqué par une `SectionWave` en bas de la section.
- **Titre** : `h2` en Bagel `--text-h2`, aligné à gauche ; une phrase d'introduction optionnelle en `--text-lead`, avec au plus une mise en valeur.
- **Apparition au scroll** (DA §6, cas par défaut) : chaque bloc monte de `--reveal-distance` et apparaît en `--duration-base`, décalé de `--stagger-block`, une seule fois. Le contenu est visible sans JavaScript : l'état caché n'est posé que par le script, et seulement sous la ligne de flottaison.
- **Animations réduites** : fondu seul (`--duration-reduced`).

### `SectionWave`

- **Rôle** : casser la frontière droite entre deux sections de fonds différents (DA v1.2, « Ruptures entre sections »).
- **Rendu** : un SVG décoratif (`aria-hidden="true"`) placé entre les deux sections. Son fond est celui de la section suivante ; la vague, de la couleur de la section précédente, en descend.
- **Forme** : un bord lissé, somme de trois ondulations dont la longueur, l'amplitude et la phase sont tirées au sort :
  - longueur d'onde 300 à 560 px, amplitude 60 à 100 % ;
  - longueur d'onde 130 à 220 px, amplitude 22 à 40 % ;
  - longueur d'onde 60 à 90 px, amplitude 4 à 9 %.
- **Amplitude de base** : 12 à 21 px, réduite jusqu'à 60 % sur les écrans étroits ; hauteur du SVG d'environ 3,2 fois l'amplitude.
- **Tirage** : une graine par frontière (son rang dans la page). Même graine, même vague : le dessin est stable d'une visite à l'autre et différent d'une frontière à l'autre. Il est recalculé à la largeur réelle de l'écran (pas de déformation) ; un rendu de référence à 1440 px est servi avant le calcul, pour éviter tout saut de mise en page.
- **Pas d'animation** : la vague est immobile.

### `PageIntro`

- **Rôle** : haut des pages Projets, À propos, Contact et 404 : titre de page et une phrase.
- **Contenu** : `h1` en Bagel `--text-h1` ; une phrase en Manrope `--text-lead`, couleur `--color-text-muted`, avec au plus une mise en valeur ; boutons optionnels (404).
- **Mise en page** : alignée à gauche (la section d'accueil, elle, est centrée : le contraste les distingue) ; marge haute `--header-height` + `--space-8` pour passer sous le header fixe.
- **Variante** `center` : pour la 404 seulement, titre, phrase et boutons centrés.
- **Apparition** : à l'ouverture, le titre puis la phrase, comme une apparition au scroll (`--stagger-block`).

### `AppFooter`

- **Rôle** : CV, contact et liens du site sur toutes les pages (architecture §1).
- **Fond** : `--color-bg`, séparé du contenu par un filet `--border-thin` en `--color-border`.
- **Colonnes** (3 sur bureau, empilées sur mobile) ; titres en Manrope `--weight-bold`, `--text-sm`, `--color-text-subtle`, sans capitales :
  - **CV** : « CV en français » et « CV en anglais », liens `standalone` avec l'icône `download` et l'attribut `download`.
  - **Contact** : l'adresse mail avec `CopyButton`, puis LinkedIn et GitHub (liens `standalone` externes).
  - **Ce site** : « Code du site » (externe), « Mentions légales », « Confidentialité ».
- **Dernière ligne** : « © 2026 Costa Maskulov », en `--text-sm` et `--color-text-subtle`.
- **Pas d'animation** : le pied de page est un repère, il reste calme.

### `ProjectCard`

- **Rôle** : donner envie d'ouvrir une étude de cas, sur l'accueil (la sélection du moment, 3 cartes). La page Projets utilise `ProjectBento`.
- **Contenu, dans l'ordre** : `DeviceFrame` avec la capture ; une ou deux `Tag` (type de projet) ; titre `h3` en Bagel `--text-h3` ; une phrase en `--color-text-muted` ; la stack en `--text-sm` et `--color-text-subtle`, séparée par des points médians.
- **Lien** : un seul lien, sur le titre, étendu à toute la carte (pseudo-élément) : toute la carte est cliquable, et le lecteur d'écran n'entend qu'un lien.
- **Style** : fond `--color-surface`, rayon `--radius-md`, marges intérieures `--space-5` ; pas d'ombre (principe « plat »).
- **Disposition « affiches collées »** (accueil, à partir de 1024 px, 3 colonnes) : les cartes sont décalées en hauteur (`--space-5`, `--space-8`, 0) et inclinées de -2°, 1,5° et -1°. Sur mobile et tablette, elles sont droites.
- **États**
  - Survol et focus : la carte entière se soulève de `--card-lift`, se redresse et son fond passe en `--color-surface-hover` (`--duration-fast`, `--ease-out`). La capture ne grossit pas.
  - Focus : anneau `--color-focus` autour de toute la carte.
- **Grille** : 1 colonne sur mobile, 2 à partir de 768 px, 3 à partir de 1024 px ; écart `--space-5`. Le lien « Tous les projets » est aligné à droite, sous la grille.
- **Animations réduites** : pas de soulèvement ; le changement de fond reste.

### `ProjectBento`

- **Rôle** : la liste complète sur la page Projets, du plus récent au plus ancien.
- **Grille** (bureau, 3 colonnes, 5 tuiles) : le projet le plus récent en grand (2 × 2), deux tuiles à droite, puis une tuile simple et une tuile large (capture à gauche, texte à droite). Deux colonnes à partir de 768 px (la première tuile sur toute la largeur), une sur mobile. Au-delà de cinq projets, prévoir la place de la sixième tuile.
- **Tuile** : comme une `ProjectCard` (même contenu, même lien étendu, fond `--color-surface`, rayon `--radius-md`, droite).
- **Lueur au pointeur** : à la souris seulement, le bord et l'intérieur des tuiles proches du pointeur s'allument (dégradé radial rose puis violet vif sur le bord, halo violet vif à 30 % à l'intérieur), d'autant plus que le pointeur est près (rayon 320 px). La tuile survolée s'incline de 3° au plus vers le pointeur. Seuls `opacity`, des variables CSS et `transform` changent, une fois par image.
- **Fond de capture** (DA §5) : lime, violet foncé (violet-700) ou rose selon la place de la tuile, pour que deux voisines n'aient jamais la même teinte ; la grande tuile en lime. Jamais de violet vif. Si une quatrième teinte devient nécessaire : crème ou fond sombre.
- **Animations réduites** : pas d'inclinaison ; la lueur (changement de couleur) reste.

### `DeviceFrame`

- **Rôle** : mettre en scène une capture (DA §5), dans les cartes et les études de cas.
- **Variantes** : `browser` (barre avec trois points neutres et une adresse) et `phone` (corps arrondi). Un écran d'ordinateur utilise `browser`.
- **Formats de capture** : une seule image par projet, **1440 × 900** px pour `browser` (16:10), **390 × 844** px pour `phone`. L'image remplit l'écran de l'appareil (`object-fit: cover`, calée en haut) : elle n'est jamais déformée.
- **Proportions fixes** : la zone de fond (`--color-section`, ou la teinte de fond de capture) prend la forme de la tuile ou de la carte ; l'appareil garde ses proportions et « monte » du bas de la zone, coupé d'au plus 15 % (`browser`) ou 25 % (`phone`). Dans une zone plus haute que l'appareil, le fond reste au-dessus. En CSS : zone en `container-type: size`, largeur de l'appareil calculée en unités `cqw` et `cqh`.
- **Style** : le cadre est en `--color-surface`, bordure `--border-thin` en `--color-border`, rayon `--radius-md` (navigateur) ou `--radius-lg` (téléphone). Les trois points restent en `--color-border` : pas de rouge-jaune-vert.
- **Image** : dimensions déclarées (pas de saut de mise en page), `loading="lazy"` hors de l'écran d'ouverture. Dans une carte, `alt=""` (le titre suffit) ; dans une étude de cas, un texte qui décrit ce que montre l'écran.
- **Sans capture** : l'écran de l'appareil devient un aplat neutre (`--neutral-850`) avec le nom du projet en Bagel `--neutral-400`, en attendant la vraie image (pas de violet, pour ne pas faire violet sur violet).

### Section d'accueil et `HeroName`

- **Composition** (DA §6) : `Section` au fond `violet` avec `TopoBackground` derrière, hauteur minimale `100svh`, contenu centré. Dans l'ordre : le nom (`HeroName`, `h1`) ; deux lignes en Manrope `--text-lead` `--weight-medium`, « Étudiant ingénieur à l'ESIEA » puis « Je cherche un stage de fin d'études full-stack » ; la promesse ; les boutons « Télécharger le CV » (`primary`, icône `download`) et « Me contacter » (`outline`) ; puis `ScrollHint`. Plus d'étiquette au-dessus du nom. En bas, une `SectionWave` vers la section suivante.
- **Nom** : Bagel, `--leading-display`. Sur une ligne et en `--text-hero` à partir de 768 px ; sur deux lignes (« Costa », « Maskulov ») et en `--text-hero-stacked` en dessous.
- **Promesse** : Manrope `--text-lead`, « Créatif dans l'interface, » puis « rigoureux dans la méthode. » en mise en valeur (Fraunces, `--color-highlight`).
- **Accessibilité** : le `h1` contient le nom en clair pour les lecteurs d'écran ; les lettres découpées pour l'animation sont dans un doublon `aria-hidden`. Les boutons restent cliquables et focalisables pendant toute l'entrée (on anime l'opacité, jamais `visibility` ni `pointer-events`).
- **Entrée à l'ouverture** (une seule timeline, environ 1,5 s, `--ease-out`) :
  - 0 s : le header glisse depuis le haut et apparaît (`--duration-base`).
  - 0 → 1,1 s : chaque lettre monte de `--letter-rise` et se pose en `--duration-letter`, décalée de `--stagger-letter`.
  - 0,4 s : les deux lignes de statut puis la promesse montent de `--reveal-distance` et apparaissent ; la mise en valeur suit 0,1 s après.
  - 0,6 s : les boutons apparaissent. CV et contact sont lisibles avant 1 s.
  - 1,5 s : `ScrollHint` apparaît.
  - L'entrée démarre quand la police Bagel est prête (au plus 300 ms d'attente) pour ne pas animer une police de secours. Sans JavaScript, tout est visible d'emblée.
- **Au scroll** (piloté par le scroll, DA §6) : pendant que la section quitte l'écran, le nom descend à `--hero-parallax` de la vitesse du scroll et s'estompe ; la promesse et les boutons s'estompent sur la première moitié. Seuls `transform` et `opacity` bougent.
- **Animations réduites** : tout apparaît ensemble en fondu (`--duration-reduced`) ; ni montée des lettres, ni effet au scroll.
- **Technique** : timeline et effet de scroll avec GSAP (ScrollTrigger) ; choix définitif en phase 7.

### `TopoBackground`

- **Rôle** : le fond de la section d'accueil, des courbes de niveau qui ondulent lentement (DA §6). Adaptation du composant « Topography » (ogl) en WebGL 2 natif, sans bibliothèque.
- **Teinte** : du violet vif vers le rose, sur le fond violet ; les lignes s'estompent au centre, derrière le nom et la promesse.
- **Comportement** : apparaît en fondu ; ne réagit pas au curseur ; se met en pause hors de l'écran et quand l'onglet est caché.
- **Accessibilité** : décoratif (`aria-hidden="true"`).
- **Animations réduites** : image fixe. Sans WebGL : le fond violet seul.

### `ScrollHint`

- **Rôle** : indiquer, très discrètement, que la page continue (DA §6).
- **Forme** : un trait vertical fin (`--border-strong`, 40 px, en `--color-text-muted`) centré en bas de la section d'accueil, à `--space-6` du bas (plus la zone de sécurité de l'écran). Un petit segment `--color-highlight` le parcourt de `--hint-travel`.
- **Mouvement** : apparaît à 1,5 s, fait deux allers (`--duration-hint` chacun), puis s'immobilise : il ne boucle jamais (WCAG 2.2.2). Disparaît en fondu dès le premier scroll et ne revient pas.
- **Accessibilité** : décoratif (`aria-hidden="true"`).
- **Animations réduites** : trait immobile, sans segment qui bouge.
- **Statut** : conservé (validé par le propriétaire le 14/10/2026).

### `ProcessSteps`

- **Rôle** : montrer la méthode d'ingénieur, formulée côté technique, en 6 étapes : besoin, conception, architecture, développement, tests, déploiement. C'est un cycle : les retours de chaque mise en ligne relancent un tour. Liste ordonnée (`<ol>`), numérotée.
- **Phrases** : besoin, comprendre le problème et les utilisateurs avant de choisir une techno · conception, marque, interface et parcours, validés avant la première ligne de code · architecture, choisir la stack, modéliser les données, définir l'API · développement, front et back, par petites étapes, versionnées sur Git · tests, tests automatisés, accessibilité et performance mesurées · déploiement, en ligne dans des conteneurs Docker, sur mon propre serveur.
- **Variante `cycle`** (accueil, fond `vif`)
  - Bureau (≥ 1024 px) : un anneau (SVG, `aria-hidden`) de 400 px, les 6 étapes numérotées dessus, de 30° en 30° + 60° dans le sens horaire depuis le haut ; des arcs fléchés de l'une à l'autre ; l'arc de 6 vers 1 en pointillés (le retour). Les textes à droite (1 à 3) et à gauche (4 à 6), alignés vers l'anneau. Au centre : « Les retours relancent un tour. » La dernière étape a un repère plein `--color-action`.
  - Mobile et tablette : une frise verticale (repères ronds reliés par un fil), puis une ligne qui remonte par la gauche jusqu'à la première étape, avec la même phrase en bas.
- **Variante `detail`** (À propos, fond `nuit`) : une liste verticale ; pour chaque étape, le numéro en Bagel `--text-h3` et `--color-block` (grand texte décoratif, 3,05:1), le nom en Manrope `--weight-bold` `--text-lead`, et la phrase en `--color-text-muted`. Un filet vertical `--color-border` relie les numéros. Sous la liste : « Puis les retours de chaque mise en ligne relancent un tour. » À droite sur bureau, un encadré « En équipe » (sprints, daily), collant pendant la lecture.
- **Apparition** : étape par étape, chacune monte de `--reveal-distance` et apparaît, décalée de `--stagger-brick`.
- **Animations réduites** : fondu de l'ensemble.

### `Timeline` et `TimelineItem`

- **Rôle** : le parcours scolaire et professionnel sur la page À propos (lycée, école, stages, jobs étudiants).
- **Ordre** : du plus ancien au plus récent, comme un récit (la page Projets, elle, va du plus récent au plus ancien).
- **Structure** : une liste ordonnée (`<ol>`), avec pour chaque étape un repère rond de `--timeline-dot` sur un fil (`--border-strong`, `--color-border`).
- **Disposition** : sur bureau (≥ 1024 px), frise **centrée alternée** : le fil au milieu, une étape à gauche (texte aligné à droite), la suivante à droite, chacune sur une demi-largeur moins `--space-7`. Sur mobile et tablette, le fil passe à gauche et toutes les étapes sont à droite.
- **Contenu d'une étape** : une `Tag` (école, stage ou job étudiant) ; les dates en `--text-sm` et `--color-text-subtle` (`<time>`) ; le titre en Manrope `--weight-bold` `--text-lead` ; le lieu et le rôle ; une ou deux lignes en `--color-text-muted` ; si une étude de cas existe, un `TextLink` `standalone` vers elle.
- **Au scroll** (temps fort piloté par le scroll, DA §6) : un second fil en `--color-highlight` se trace par-dessus le premier au rythme du scroll ; quand il atteint une étape, son repère se remplit (`--duration-fast`). Pas d'épinglage : la lecture n'est jamais bloquée.
- **Animations réduites** : fil déjà tracé, repères déjà remplis.

### `SkillCards`

- **Rôle** : montrer les technologies par catégorie (architecture §4, liste validée). Remplace le mur de briques (`SkillsWall`) le 22/10/2026.
- **Structure** : une carte (`article`) par catégorie : « front », « back », « UI / UX », « outils et déploiement », « méthode ». La catégorie en Fraunces italique `--color-highlight` (`h3`), puis une liste (`<ul>`) des technologies en Manrope `--weight-bold`.
- **Carte** : fond `nuit` (rôles du fond nuit), rayon `--radius-md`, marges `--space-5`.
- **Disposition « affiches collées »** (bureau, 5 colonnes) : cartes inclinées de -2°, 1,5°, -1°, 2° et -1,5°, une sur deux décalée vers le bas de `--space-7`. Deux colonnes à partir de 768 px, une sur mobile ; droites hors bureau.
- **Technos de ce site** : une pastille ronde violet vif cernée de `--neutral-50` devant leur nom (les autres : pastille `--neutral-700`), avec une légende « Pastille violette : les technos de ce site » et un lien vers l'étude de cas du portfolio. La couleur porte une information, pas un décor.
- **Fond conseillé** : `violet` (page À propos).
- **Pose** : quand les cartes arrivent à l'écran, elles montent de `--reveal-distance` et se posent une à une, décalées de `--stagger-block`. C'est le moment animé de la page À propos. Au survol, la carte se soulève de `--card-lift` et se redresse.
- **Animations réduites** : fondu de l'ensemble, pas de soulèvement.

### Étude de cas : composition

- **Rythme des fonds** : en-tête `violet` (rappel de l'affiche) → corps `nuit` (lecture longue, DA v1.2) → `CaseNav` en `rose` (la section vive de la page, qui invite au projet suivant). Une `SectionWave` à chaque changement.
- **En-tête** : `Tag` (type de projet) ; titre `h1` en Bagel `--text-h1` ; une phrase en `--text-lead` ; `MetaList` ; liens « Code » (`outline`, icône `github`) et « Démo » (`outline`, icône `arrow-up-right`) ; capture principale dans un `DeviceFrame` large.
- **Corps** : sur bureau (≥ 1024 px), deux colonnes : `CaseToc` à gauche (`--toc-width`), les blocs à droite. Sur mobile, une colonne et pas de sommaire. Chaque bloc (contexte, besoin, contraintes, méthode, choix techniques, résultats, enseignements) a un `h2` en Bagel `--text-h2`, un `id`, et `scroll-margin-top` égal à `--header-height` + `--space-5` pour ne pas passer sous le header fixe. Texte limité à `--measure`.
- **Temps forts** (DA §6, 1 ou 2 par étude) : les barres de `StatBlock` ; au plus un autre bloc animé au scroll.

### `MetaList`

- **Rôle** : les métadonnées d'un projet, d'un coup d'œil.
- **Structure** : une liste de définitions (`<dl>`) : type, rôle, durée, équipe, stack.
- **Mise en page en fiche** : une information par ligne, libellé à gauche (6rem, `--text-sm`, `--color-text-subtle`), valeur à droite en Manrope `--weight-bold` ; un filet `--border-thin` en `--color-border` sous chaque ligne. Sur bureau, la fiche est à droite du titre de l'étude de cas (colonnes 7/5) ; sur mobile, sous le titre.
- **Code privé** (stage au CNAM) : pas de bouton « Code » désactivé ; à la place, la mention « Code privé » dans la liste, avec la raison en une phrase.

### `CaseToc`

- **Rôle** : sommaire collant de l'étude de cas, sur bureau seulement (architecture §6).
- **Structure** : `<nav aria-label="Sommaire">` puis une liste ordonnée de liens vers les blocs. Collant (`position: sticky`) à `--header-height` + `--space-5` du haut.
- **États** : lien en `--color-text-subtle` ; survol en `--color-text` ; bloc en cours de lecture en `--color-text`, `--weight-bold`, avec un trait `--underline` en `--color-highlight` à gauche, et `aria-current="location"`. Le bloc en cours est suivi par un `IntersectionObserver`.
- **Zones cliquables** : chaque lien fait au moins `--target-min` de haut.
- **Défilement** : le clic mène au bloc ; défilement doux seulement sans `prefers-reduced-motion`.

### `StatBlock`

- **Rôle** : un résultat chiffré, prouvé (ton de voix : « un fait, un chiffre plutôt qu'un adjectif »).
- **Contenu** : la valeur en Bagel `--text-h1` (grand chiffre décoratif) ; un libellé en `--text-sm` et `--color-text-muted` ; si la valeur compare un avant et un après, deux barres de `--stat-bar` d'épaisseur, proportionnelles aux valeurs : « avant » en `--color-border`, « après » en `--color-highlight`, chacune avec sa valeur en clair.
- **Mise en page** : 1 à 3 par ligne ; pas de carte autour (le chiffre suffit).
- **Animation** : les barres se remplissent une fois (`scaleX`, `--duration-bar`, `--ease-out`) à l'arrivée à l'écran, l'« après » `--stagger-bar` après l'« avant ». Pas de compteur qui défile : motif trop vu, et un chiffre qui change est illisible.
- **Accessibilité** : les valeurs sont du texte ; les barres sont décoratives (`aria-hidden`).
- **Animations réduites** : barres déjà remplies.

### `CaseNav`

- **Rôle** : la fin d'une étude de cas : passer au projet suivant ou revenir à la liste.
- **Contenu** : un grand lien « Projet suivant » (libellé en `--text-sm`, titre du projet en Bagel `--text-h2`, icône `arrow-right` en `--icon-md`) ; à côté, un `TextLink` `standalone` « Tous les projets » avec `arrow-left`.
- **Ordre** : le projet suivant dans la liste (du plus récent au plus ancien) ; après le dernier, retour au premier.
- **Survol** : la flèche avance de `--hover-nudge` et le titre se souligne (`--underline`).
- **Fond** : `rose` (la section vive de la page).

---

### `ContactCard` (section « Parlons-en »)

- **Rôle** : la prise de contact en fin de page (accueil, Projets, À propos), sur fond `lime`, la section vive de la page.
- **Composition** : à gauche, « Parlons-en » en Bagel (`h2`) et une phrase adaptée à la page ; à droite sur bureau, une carte sombre (fond `nuit`, rayon `--radius-md`) : « Mon adresse », l'adresse avec `CopyButton`, puis « Télécharger le CV » (`primary`), LinkedIn et GitHub (liens `standalone` externes).
- **Carte** : inclinée de -2° sur bureau ; au survol ou quand un de ses éléments a le focus, elle se soulève de `--card-lift` et se redresse. Droite sur mobile et tablette.
- **Animations réduites** : carte droite, sans soulèvement.

### `BusinessCard` (page Contact)

- **Rôle** : la page Contact entière tient sur une carte de visite.
- **Composition** : section `violet` plein écran ; au-dessus, « Contact » (`h1`, Bagel `--text-h1`) et une phrase, centrés ; puis une carte fond `creme`, rayon `--radius-md`, au format carte de visite (1,75:1, jusqu'à 40rem de large) : le nom en Bagel, « Étudiant ingénieur · stage de fin d'études full-stack », l'adresse avec `CopyButton`, « Le CV » (`primary`), LinkedIn et GitHub.
- **Carte** : droite et immobile, sans effet au survol (seuls ses liens et boutons réagissent). Sur mobile, elle prend la hauteur de son contenu.

### `BrickRepair` (page 404)

- **Rôle** : rendre la 404 utile et dans le ton : « Il manque une brique. » La brique replacée ramène à l'accueil.
- **Composition** : section `violet` plein écran, centrée (`PageIntro` variante `center`) ; un petit mur crème de trois rangées appareillées, avec un trou en pointillés `--color-highlight` ; sous le mur, la brique tombée (inclinée de -14°) ; puis le titre en Bagel `--text-h1`, une phrase qui invite à replacer la brique, une ligne d'état (`aria-live`) et les boutons « Retour à l'accueil » (`primary`) et « Voir les projets » (`outline`).
- **Interaction** : glisser la brique (souris ou doigt, Pointer Events, `touch-action: none`) ; elle se redresse en partie pendant le glisser, et le trou s'allume quand elle en approche (rayon 40 px). Relâchée près du trou, elle s'y loge, passe en lime, la ligne d'état annonce « Le mur est complet. Retour à l'accueil… », puis la page mène à l'accueil (0,9 s). Relâchée ailleurs, ou si le navigateur interrompt le glisser, elle revient à sa place.
- **Clavier** : la brique est un `button` (« Replacer la brique et revenir à l'accueil ») ; Entrée ou Espace la met en place.
- **Animations réduites** : pas de mouvement, mise en place immédiate, redirection après 0,3 s.

## 5. Vitrine

Source : `docs/05-vitrine-design-system.html`, publiée en artifact « Vitrine du design system » à partir de ce fichier. Elle montre les tokens et les composants de la v1.0, avec leurs états réels. Les composants ajoutés ou modifiés en v1.1 sont montrés dans les maquettes (`docs/06-maquettes/`) ; la vitrine sera reconstruite comme route `/design-system` en développement (phase 7), avec tous les composants à jour.

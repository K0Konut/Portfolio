# Design system — Portfolio personnel

Version 0.4 — 14/10/2026 — **statut : en cours** (lots 1 et 2 spécifiés : briques de base et structure ; lots 3 à 5 à suivre)

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

`--color-action` et `--color-highlight` pointent vers la même teinte, mais restent deux rôles : on pourra changer la couleur des mises en valeur sans toucher aux boutons. Un lien est toujours souligné, une mise en valeur jamais (DA §2, règle 1).

### Typographie

| Token | Valeur |
|---|---|
| `--font-display` | `'Bagel Fat One'`, repli arrondi système |
| `--font-accent` | `'Fraunces'` italique (`SOFT` 100, `WONK` 1) |
| `--font-body` | `'Manrope'`, repli système |
| `--font-mono` | `'JetBrains Mono'`, repli monospace |
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
| `--radius-sm` / `-md` / `-lg` / `-pill` | 8 · 16 · 28 px · 999 px |
| `--border-thin` / `--border-strong` | 1 px · 1,5 px |
| `--underline` | 2 px · soulignement des liens |
| `--focus-width` / `--focus-offset` | 2 px · 3 px |
| `--target-min` | 44 px · zone cliquable minimale, sur toutes les tailles d'écran |
| `--header-height` | 60 px · hauteur du header (zone cliquable de 44 px + marges), réservée en haut des pages |
| Points de rupture | 768 px (tablette) · 1024 px (bureau) · constantes : CSS n'accepte pas de variables dans les media queries |
| `--icon-sm` / `--icon-md` | 18 px · 24 px |
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
| `--card-hover-scale` | `1.03` | Capture qui grossit au survol d'une carte |

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
| `Section` | Conteneur de section ; variantes `default` et `color` (violette) | toutes |
| `HeroName` | Nom géant, entrée lettre par lettre, effacement au scroll | Accueil |
| `ScrollHint` | Indicateur de scroll très discret | Accueil |
| `BaseButton` | Bouton / lien-bouton : `primary` (lime), `outline` | toutes |
| `TextLink` | Lien texte avec soulignement animé | toutes |
| `CopyButton` | Copie le mail, confirme « Adresse copiée » | Contact, pied de page |
| `Tag` | Étiquette rose (poste, type de projet) | Accueil, Projets, études de cas |
| `ProjectCard` | Capture, titre, type, stack, phrase | Accueil, Projets |
| `DeviceFrame` | Cadre navigateur / téléphone pour mettre en scène une capture | cartes, études de cas |
| `ProcessSteps` | Les 7 étapes de la méthode | Accueil, À propos |
| `Timeline` + `TimelineItem` | Parcours scolaire et professionnel | À propos |
| `SkillsMarquee` | Bandeau défilant de compétences, accessible | À propos |
| `MetaList` | Type, rôle, durée, stack d'une étude de cas | études de cas |
| `CaseToc` | Sommaire collant (bureau uniquement) | études de cas |
| `StatBlock` | Résultat chiffré | études de cas |
| `CaseNav` | Retour à la liste / projet suivant | études de cas |
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
- **Style** : contour. Bordure `--border-thin` et texte `--color-detail`, fond transparent (choix du propriétaire : un fond rose plein, répété sur chaque carte, rendrait le rose omniprésent).
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
- **Variantes**
  - `default` : fond `--color-bg`.
  - `color` : fond `--color-section` (violet) sur toute la largeur. Mêmes rôles de texte, contrastes vérifiés sur violet.
- **Rythme** : jamais deux sections `color` à la suite. Sur l'accueil : la section d'accueil et la prise de contact, qui referme la page sur le violet de l'affiche.
- **Titre** : `h2` en Bagel `--text-h2`, aligné à gauche ; une phrase d'introduction optionnelle en `--text-lead`, avec au plus une mise en valeur.
- **Apparition au scroll** (DA §6, cas par défaut) : chaque bloc monte de `--reveal-distance` et apparaît en `--duration-base`, décalé de `--stagger-block`, une seule fois. Le contenu est visible sans JavaScript : l'état caché n'est posé que par le script, et seulement sous la ligne de flottaison.
- **Animations réduites** : fondu seul (`--duration-reduced`).

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

- **Rôle** : donner envie d'ouvrir une étude de cas (accueil : 3 cartes ; Projets : toutes, de la plus récente à la plus ancienne).
- **Contenu, dans l'ordre** : `DeviceFrame` avec la capture ; une ou deux `Tag` (type de projet) ; titre `h3` en Bagel `--text-h3` ; une phrase en `--color-text-muted` ; la stack en `--text-sm` et `--color-text-subtle`, séparée par des points médians.
- **Lien** : un seul lien, sur le titre, étendu à toute la carte (pseudo-élément) : toute la carte est cliquable, et le lecteur d'écran n'entend qu'un lien.
- **Style** : fond `--color-surface`, rayon `--radius-md`, marges intérieures `--space-5` ; pas d'ombre (principe « plat »).
- **États**
  - Survol : fond `--color-surface-hover` ; la capture grossit à `--card-hover-scale` dans son cadre (`--duration-base`, `--ease-out`).
  - Focus : anneau `--color-focus` autour de toute la carte.
- **Grille** : 1 colonne sur mobile, 2 à partir de 768 px, 3 à partir de 1024 px ; écart `--space-5`.
- **Animations réduites** : la capture ne grossit pas ; le changement de fond reste.

### `DeviceFrame`

- **Rôle** : mettre en scène une capture (DA §5), dans les cartes et les études de cas.
- **Variantes** : `browser` (barre avec trois points neutres et une adresse) et `phone` (corps arrondi). Un écran d'ordinateur utilise `browser`.
- **Style** : la capture est posée sur un fond `--color-section` ; le cadre est en `--color-surface`, bordure `--border-thin` en `--color-border`, rayon `--radius-md` (navigateur) ou `--radius-lg` (téléphone). Les trois points restent en `--color-border` : pas de rouge-jaune-vert.
- **Image** : dimensions déclarées (pas de saut de mise en page), `loading="lazy"` hors de l'écran d'ouverture. Dans une carte, `alt=""` (le titre suffit) ; dans une étude de cas, un texte qui décrit ce que montre l'écran.
- **Sans capture** : l'écran de l'appareil devient un aplat `--color-block` avec le nom du projet en Bagel `--color-text` (5,5:1), en attendant la vraie image.

### Composants restants

À spécifier par lots : accueil (`HeroName`, `ScrollHint`, `ProcessSteps`), À propos (`Timeline`, `SkillsMarquee`), étude de cas (`MetaList`, `CaseToc`, `StatBlock`, `CaseNav`).

---

## 5. Vitrine

Source : `docs/05-vitrine-design-system.html`, publiée en artifact « Vitrine du design system » à partir de ce fichier. Elle montre les tokens et chaque composant spécifié, avec ses états réels. Complétée lot par lot ; elle deviendra la route `/design-system` en développement (phase 7).

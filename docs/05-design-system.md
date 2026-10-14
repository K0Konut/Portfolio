# Design system — Portfolio personnel

Version 0.7 — 14/10/2026 — **statut : en cours** (lots 1 à 4 spécifiés ; lot 5 à suivre)

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
| `--card-hover-scale` | `1.03` | Capture qui grossit au survol d'une carte |
| `--duration-letter` | `600ms` | Montée d'une lettre du nom |
| `--letter-rise` | `0.4em` | Hauteur dont chaque lettre monte avant de se poser |
| `--hero-parallax` | `0.35` | Le nom descend à 35 % de la vitesse du scroll en quittant l'écran |
| `--stagger-brick` | `60ms` | Étapes de la méthode, posées brique par brique |
| `--hint-travel` | `12px` | Course du repère de l'indicateur de scroll |
| `--duration-hint` | `1200ms` | Un aller de l'indicateur de scroll |
| `--marquee-duration` | `40s` | Un tour complet du bandeau de compétences (vitesse constante, `linear`) |

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
- **Style** : contour épais. Bordure `--border-strong` et texte `--color-detail`, fond teinté de la même couleur à `--tag-tint` (`color-mix`), sur les fonds sombres seulement. Le contour fin se perdait sur le violet ; un fond plein, répété sur chaque carte, rendrait la couleur omniprésente.
- **Commun** : Manrope `--weight-medium`, `--text-sm`, `--leading-none` ; marges `--space-2` × `--space-3` ; rayon `--radius-pill` ; en minuscules (pas de capitales).
- **Règle** : une à deux étiquettes par carte au plus. La stack technique n'est pas en étiquettes roses (le rose reste rare) : elle s'écrit en texte discret dans `ProjectCard`.

### `Icon`

- **Bibliothèque** : Lucide (DA §5). Les icônes sont copiées en SVG local (licence ISC) plutôt qu'importées : on n'embarque que celles qui servent.
- **Logos GitHub et LinkedIn** : Lucide a déprécié ses logos de marques ; on garde ses tracés actuels, dans le même style, en SVG local.
- **Jeu de la V1** : `arrow-right`, `arrow-left`, `arrow-up-right`, `download`, `copy`, `check`, `menu`, `x`, `mail`, `github`, `linkedin`, `pause`, `play`.
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

### Section d'accueil et `HeroName`

- **Composition** (DA §6) : `Section` au fond `violet`, hauteur minimale `100svh`, contenu centré. Dans l'ordre : `Tag` « développeur full-stack » (le poste), le nom (`HeroName`, `h1`), la promesse, les boutons « Télécharger le CV » (`primary`, icône `download`) et « Me contacter » (`outline`), puis `ScrollHint`. En bas, une `SectionWave` vers la section suivante.
- **Nom** : Bagel, `--leading-display`. Sur une ligne et en `--text-hero` à partir de 768 px ; sur deux lignes (« Costa », « Maskulov ») et en `--text-hero-stacked` en dessous.
- **Promesse** : Manrope `--text-lead`, « Créatif dans l'interface, » puis « rigoureux dans la méthode. » en mise en valeur (Fraunces, `--color-highlight`).
- **Accessibilité** : le `h1` contient le nom en clair pour les lecteurs d'écran ; les lettres découpées pour l'animation sont dans un doublon `aria-hidden`. Les boutons restent cliquables et focalisables pendant toute l'entrée (on anime l'opacité, jamais `visibility` ni `pointer-events`).
- **Entrée à l'ouverture** (une seule timeline, environ 1,5 s, `--ease-out`) :
  - 0 s : le header glisse depuis le haut et apparaît (`--duration-base`) ; l'étiquette apparaît.
  - 0 → 1,1 s : chaque lettre monte de `--letter-rise` et se pose en `--duration-letter`, décalée de `--stagger-letter`.
  - 0,4 s : la promesse monte de `--reveal-distance` et apparaît ; la mise en valeur suit 0,1 s après.
  - 0,6 s : les boutons apparaissent. CV et contact sont lisibles avant 1 s.
  - 1,5 s : `ScrollHint` apparaît.
  - L'entrée démarre quand la police Bagel est prête (au plus 300 ms d'attente) pour ne pas animer une police de secours. Sans JavaScript, tout est visible d'emblée.
- **Au scroll** (piloté par le scroll, DA §6) : pendant que la section quitte l'écran, le nom descend à `--hero-parallax` de la vitesse du scroll et s'estompe ; la promesse et les boutons s'estompent sur la première moitié. Seuls `transform` et `opacity` bougent.
- **Animations réduites** : tout apparaît ensemble en fondu (`--duration-reduced`) ; ni montée des lettres, ni effet au scroll.
- **Technique** : timeline et effet de scroll avec GSAP (ScrollTrigger) ; choix définitif en phase 7.

### `ScrollHint`

- **Rôle** : indiquer, très discrètement, que la page continue (DA §6).
- **Forme** : un trait vertical fin (`--border-strong`, 40 px, en `--color-text-muted`) centré en bas de la section d'accueil, à `--space-6` du bas (plus la zone de sécurité de l'écran). Un petit segment `--color-highlight` le parcourt de `--hint-travel`.
- **Mouvement** : apparaît à 1,5 s, fait deux allers (`--duration-hint` chacun), puis s'immobilise : il ne boucle jamais (WCAG 2.2.2). Disparaît en fondu dès le premier scroll et ne revient pas.
- **Accessibilité** : décoratif (`aria-hidden="true"`).
- **Animations réduites** : trait immobile, sans segment qui bouge.
- **Statut** : conservé (validé par le propriétaire le 14/10/2026).

### `ProcessSteps`

- **Rôle** : montrer la méthode d'ingénieur en 7 étapes : PRD, marque, direction artistique, architecture et UX, design system, maquettes, code. C'est une vraie séquence : liste ordonnée (`<ol>`), numérotée.
- **Variante `compact`** (accueil, fond `vif`) : une rangée de briques (7 colonnes à partir de 1024 px, puis la grille passe à la ligne). Chaque brique : contour `--border-strong` en `--color-text`, rayon `--radius-sm`, numéro en `--text-sm` et `--color-text-subtle`, nom de l'étape en Manrope `--weight-bold`. La dernière brique, « Code », est pleine (`--color-action`, texte `--color-on-action`) : c'est le produit fini.
- **Variante `detail`** (À propos, fond `nuit`) : une liste verticale ; pour chaque étape, le numéro en Bagel `--text-h3` et `--color-block` (grand texte décoratif, 3,05:1), le nom en Manrope `--weight-bold` `--text-lead`, et une phrase en `--color-text-muted`. Un filet vertical `--color-border` relie les numéros.
- **Phrases de la variante `detail`** : PRD, ce qu'on construit et pourquoi · marque, comment se positionner · direction artistique, à quoi ça ressemble et comment ça bouge · architecture et UX, comment c'est organisé et parcouru · design system, avec quelles briques · maquettes, à quoi ressemblent les écrans clés · code, comment c'est construit.
- **Apparition** : brique par brique, chacune monte de `--reveal-distance` et apparaît, décalée de `--stagger-brick` (7 × 60 ms, sous le budget de 500 ms).
- **Animations réduites** : fondu de l'ensemble.

### `Timeline` et `TimelineItem`

- **Rôle** : le parcours scolaire et professionnel sur la page À propos (lycée, école, stages, jobs étudiants).
- **Ordre** : du plus ancien au plus récent, comme un récit (la page Projets, elle, va du plus récent au plus ancien).
- **Structure** : une liste ordonnée (`<ol>`). Un fil vertical à gauche (`--border-strong`, `--color-border`) et, pour chaque étape, un repère rond de `--timeline-dot`.
- **Contenu d'une étape** : une `Tag` (école, stage ou job étudiant) ; les dates en `--text-sm` et `--color-text-subtle` (`<time>`) ; le titre en Manrope `--weight-bold` `--text-lead` ; le lieu et le rôle ; une ou deux lignes en `--color-text-muted` ; si une étude de cas existe, un `TextLink` `standalone` vers elle.
- **Au scroll** (temps fort piloté par le scroll, DA §6) : un second fil en `--color-highlight` se trace par-dessus le premier au rythme du scroll ; quand il atteint une étape, son repère se remplit (`--duration-fast`). Pas d'épinglage : la lecture n'est jamais bloquée.
- **Animations réduites** : fil déjà tracé, repères déjà remplis.

### `SkillsMarquee`

- **Rôle** : faire défiler les technologies par catégorie (architecture §4, liste validée).
- **Rendu** : une bande qui défile de droite à gauche, en continu, à vitesse constante (`--marquee-duration`). Chaque catégorie s'annonce en Fraunces italique `--color-highlight` (« front », « back », « UI / UX », « outils et déploiement », « méthode »), suivie de ses technologies en Manrope `--weight-bold` `--text-h3`, séparées par des points médians.
- **Pause** (WCAG 2.2.2, niveau A) : un bouton visible « Mettre en pause » / « Reprendre », avec les icônes `pause` et `play`, à côté du bandeau. Le défilement s'arrête aussi au survol et quand le focus est dans le bandeau.
- **Accessibilité** : une vraie liste (`<ul>`) par catégorie ; la copie qui sert à boucler est en `aria-hidden`. Le bouton porte `aria-pressed`.
- **Animations réduites** : pas de défilement ; les technologies s'affichent en liste fixe, passant à la ligne.
- **Technique** : animation CSS `translateX(-50%)` sur une piste qui contient deux copies ; seul `transform` bouge.

### Composants restants

À spécifier : étude de cas (`MetaList`, `CaseToc`, `StatBlock`, `CaseNav`).

---

## 5. Vitrine

Source : `docs/05-vitrine-design-system.html`, publiée en artifact « Vitrine du design system » à partir de ce fichier. Elle montre les tokens et chaque composant spécifié, avec ses états réels. Complétée lot par lot ; elle deviendra la route `/design-system` en développement (phase 7).

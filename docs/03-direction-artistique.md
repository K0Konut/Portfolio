# Direction artistique — Portfolio personnel

Version 1.0 — 14/10/2026 — **statut : validé** (logo et terminal mis de côté ; section d'accueil à confirmer en maquettes)

S'appuie sur le territoire de marque v0.2 : identité forte et reconnaissable, base sérieuse et structurée, quelques prises de risque bien placées, jamais ludique pour le plaisir. Promesse : « Créatif dans l'interface, rigoureux dans la méthode. »

---

## 1. Direction nommée

**Affiche de nuit.**

Un site gris sombre rythmé de sections de couleur, dont la section d'accueil est construite comme une affiche : le nom géant en Bagel au centre, la promesse en relais. Les mises en valeur en Fraunces italique et les touches de lime et de rose apportent la prise de risque ; Manrope et la règle des rôles de couleur gardent l'ensemble sérieux.

---

## 2. Couleurs

**Statut : validé** (les teintes pourront évoluer, les rôles restent).

### Principe : les rôles sont fixes, les teintes peuvent changer

La palette est organisée par **rôles**. Les valeurs hexadécimales peuvent évoluer plus tard sans toucher aux composants, tant que chaque rôle garde sa fonction. En code, cela se traduira par des tokens sémantiques (`--color-bg`, `--color-action`…) qui pointent vers des teintes de base.

### Palette de base

| Teinte | Hex |
|---|---|
| violet/500 | `#4B3CFF` |
| violet/700 | `#17105B` |
| lime/500 | `#C7FF00` |
| pink/500 | `#FF6BD6` |
| neutral/50 | `#F5F1E8` |
| neutral/100 | `#E8E1D4` |
| neutral/700 | `#474747` |
| neutral/950 | `#101113` |

### Rôles (mis à jour le 14/10/2026 : fond gris sombre, sections de couleur)

Le fond de page n'est plus le violet profond : le site est gris sombre, rythmé par des **sections de couleur**. Les rôles restent ; seule la teinte du fond change.

| Rôle | Teinte | Usage | Contraste sur le fond |
|---|---|---|---|
| **Fond** | neutral/950 | Fond de page par défaut | — |
| **Sections de couleur** | à préciser (candidats : violet/700, violet/500) | Sections pleines qui rythment les pages | — |
| **Surface** | gris un peu plus clair que le fond, à définir en design system | Cartes et blocs posés sur le fond | — |
| **Action** | lime/500 | Uniquement l'action : boutons principaux, liens, mots clés. Texte sur lime : neutral/950 | 16:1 |
| **Détail** | pink/500 | Touche rare : étiquettes, petits marqueurs | 7,5:1 |
| **Bloc / trait** | violet/500 | Contours, formes, grands titres décoratifs | 3:1 (jamais en texte courant) |
| **Texte** | neutral/50 | Texte principal | 16,8:1 |
| **Texte secondaire** | neutral/100 | Sous-titres, métadonnées | 14,5:1 |
| **Séparateur** | neutral/700 | Bordures et filets uniquement | 2:1 (jamais en texte) |

Contrastes sur les sections violet/700 (pour mémoire) : lime 14,1:1, rose 6,6:1, neutral/50 14,8:1.

### Règles

1. **Le lime est réservé à l'action.** S'il apparaît partout, il ne guide plus l'œil vers le CV et le contact.
2. **Le rose reste rare** : c'est la prise de risque, pas une couleur de fond.
3. **Pas de texte violet/500 ni neutral/700** sur fond sombre : contraste insuffisant (WCAG AA exige 4,5:1 pour le texte courant, 3:1 pour le grand texte et les éléments graphiques).
4. Texte clair posé sur un bloc violet/500 : autorisé (neutral/50 à 5,5:1).

### Point de vigilance

Un fond violet sur tout le site peut fatiguer sur les études de cas longues. À tester en maquette ; parade possible : zones de lecture longue sur la surface neutral/950.

---

## 3. Typographie

**Statut : validé.** Toutes les polices sont gratuites (Google Fonts) et seront auto-hébergées.

### Familles et rôles

| Rôle | Police | Pourquoi |
|---|---|---|
| **Titres** | Bagel Fat One | Très grosse, épaisse, arrondie : la signature visuelle, le côté créatif |
| **Mise en valeur** | Fraunces italique (axes `SOFT` 100, `WONK` 1) | Touche humaine et soignée, contrepoids élégant à Bagel : le soin du détail |
| **Texte** | Manrope (400, 500, 700) | Sobre et très lisible : c'est elle qui garde le site sérieux |
| **Terminal / code** | JetBrains Mono | Monospace lisible pour le terminal décoratif et les extraits de code |

Le contraste entre une grotesque ronde et grasse (Bagel) et une italique à empattements fine (Fraunces) est la signature typographique du site.

### Règles d'usage

1. **Bagel uniquement pour les grands titres** : nom, titres de pages, titres de sections. Jamais pour le texte courant, les boutons, la navigation ni les formulaires (Manrope).
2. **Une seule graisse pour Bagel** : la hiérarchie des titres se fait par la taille.
3. **Fraunces reste rare** : quelques mots ou une phrase par section, jamais une information essentielle (le visiteur doit pouvoir s'en passer).
4. **Le texte courant est toujours en Manrope**, à 16 px minimum.

### Échelle (indicative, ajustée en design system)

| Niveau | Police | Taille desktop | Taille mobile |
|---|---|---|---|
| Display (nom) | Bagel | ~96 px | ~56 px |
| Titre de page | Bagel | ~64 px | ~40 px |
| Titre de section | Bagel | ~40 px | ~30 px |
| Mise en valeur | Fraunces italique | 1,25 × le texte voisin | idem |
| Texte | Manrope 400 | 18 px | 16 px |
| Petit texte, étiquettes | Manrope 500 | 14 px | 14 px |
| Terminal | JetBrains Mono | 14 px | 13 px |

Tailles fluides (`clamp()`) entre mobile et desktop. Interlignage : ~0,95 pour Bagel, ~1,6 pour Manrope.

### Points techniques à vérifier

- **Accents et majuscules accentuées** dans Bagel (À, É) : à tester en maquette.
- **Poids des fichiers** : Fraunces est une police variable lourde. Ne charger que l'italique et le sous-ensemble latin ; `font-display: swap` partout.

## 4. Logo

Reporté : le propriétaire n'a pas encore défini ce qu'il veut. Monogramme envisagé, à partir des initiales.

Pistes explorées le 14/10/2026, sans choix : bloc lime, « Signature » (C en Bagel + m en Fraunces italique), briques décalées, curseur de terminal. En attendant, le nom écrit en Bagel tient lieu de logo dans les maquettes.

## 5. Imagerie et iconographie

- **Captures de projets : mises en scène.** Chaque capture est posée dans un cadre d'appareil (navigateur, écran ou téléphone selon le projet) sur un fond de la palette. Pour le stage au CNAM, captures autorisées, code privé.
- **Photo du propriétaire : aucune.** La personnalité passe par le texte, le ton et le design, y compris sur la page À propos.
- **Icônes : contour épais et arrondi**, d'après la référence fournie par le propriétaire (icône GitHub au trait). Caractéristiques : trait seul, sans remplissage ; épaisseur régulière et généreuse ; extrémités et angles arrondis. Ce style répond à la rondeur de Bagel.
  - Bibliothèques gratuites dans ce style : Lucide (référence la plus proche) ou Tabler Icons, toutes deux avec un paquet Vue.
  - Réglage : trait ~2 à 2,5 px à 24 px, `stroke-linecap` et `stroke-linejoin` arrondis.
  - Couleur selon les rôles : texte par défaut, lime pour une action.
  - Logos de marques (GitHub, LinkedIn) : vérifier leur disponibilité dans la bibliothèque choisie en design system ; sinon, les redessiner dans le même style.

## 6. Motion

### Cadre

- **Ambition : haute.** Section d'accueil immersive et travaillée, scroll animé, boutons qui réagissent.
- **Sensation : fluide.** Des mouvements doux, glissés, qui ralentissent en arrivant.
- **Zones animées** : section d'accueil, apparition au scroll, survol et clic.
- **Pas d'animation** : transitions entre les pages, réaction au curseur (pas de curseur personnalisé, pas de boutons magnétiques, pas d'éléments qui suivent la souris).

### Règle du scroll (selon la situation)

| Situation | Type d'animation |
|---|---|
| Par défaut (sections, blocs de texte) | Apparition simple : le bloc glisse et apparaît en entrant dans l'écran, puis ne bouge plus |
| Section d'accueil, parcours, temps forts des études de cas | Pilotée par le scroll : parallaxe, sections fixées le temps d'une animation |
| Projets sur la page d'accueil | 3 projets seulement, avec une apparition simple ; pas de défilement horizontal. Les autres projets sont sur une page dédiée |

### Durées et courbes de référence

| Usage | Durée | Courbe |
|---|---|---|
| Survol, clic, petits éléments | ~250 ms | `cubic-bezier(0.22, 1, 0.36, 1)` |
| Apparition d'un bloc au scroll | ~700 ms, décalage ~80 ms entre éléments | `cubic-bezier(0.22, 1, 0.36, 1)` |
| Animations pilotées par le scroll | suivent la position du scroll | linéaire sur la progression, lissée |

Valeurs indicatives, à ajuster en maquette.

### Section d'accueil (définie par questions le 14/10/2026)

**Intention** : marquer les esprits. Le nom est la star, la promesse le relais.

**Contenu (minimal)** : nom, poste, promesse, deux boutons (CV, contact). Rien d'autre.

**Mise en page**
- Plein écran.
- Section de couleur violette (violet/700), qui tranche avec le gris sombre du reste du site.
- Composition centrée.
- Nom géant en Bagel, sur presque toute la largeur ; promesse forte juste en dessous (Manrope + Fraunces italique) ; boutons sous la promesse.

**Entrée à l'ouverture (~1,5 s au total)**

| Moment | Ce qui se passe |
|---|---|
| 0 → ~1,1 s | Le nom apparaît **lettre par lettre**, en décalé : chaque lettre monte légèrement et se pose, de façon fluide (~600 ms par lettre, ~40 ms d'écart) |
| ~0,4 s | La promesse glisse et apparaît, la partie en Fraunces juste après |
| ~0,6 s | Les boutons apparaissent : CV et contact sont utilisables en moins d'une seconde |
| ~1,5 s | Dernières lettres posées, entrée terminée |

**En-tête** : le propriétaire a déjà un en-tête qui lui plaît (à récupérer en design system). Il reste fixé en haut en permanence et apparaît en même temps que le nom, à l'ouverture.

**Indicateur de scroll** : très discret (un petit signe en bas de l'écran, qui disparaît dès le premier scroll), ou supprimé si la maquette montre qu'il est superflu.

**Au scroll** : la section s'efface. Le nom ralentit légèrement par rapport au scroll et s'estompe pendant que la section suivante monte.

**Réduire les animations** : tout apparaît d'un simple fondu (~300 ms), sans déplacement ni effacement au scroll.

**Mis de côté** : terminal. Pistes explorées en prototype et non retenues : briques, traversée du « o », bandeaux, carte lime. Objet 3D : candidat V2.

### Règles non négociables (PRD)

1. **L'essentiel ne patiente jamais** : nom, promesse et bouton CV lisibles en moins d'une seconde, même si l'animation continue autour.
2. **`prefers-reduced-motion`** : tout apparaît par un simple fondu, sans déplacement ; les animations pilotées par le scroll et le défilement horizontal sont désactivés.
3. **Performance** : animer uniquement `transform` et `opacity` ; Core Web Vitals préservés.

## 7. Terminal

Mis de côté le 14/10/2026 pour ne pas bloquer le projet : la section d'accueil se conçoit sans lui. Il pourra revenir plus tard, dans l'accueil ou ailleurs. Style s'il revient : surface neutral/950, cadre violet/500, marqueurs lime et rose, JetBrains Mono.

# Architecture technique — Portfolio personnel

Version 1.6 — 10/11/2026 — **statut : validé** (v1.6 : §4 alignée sur la structure créée dans Dashility ; v1.5 : contenu lu dans Dashility au build, §4 réécrite ; v1.4 : analytics par Dashility, contenu annoncé dans Dashility ; v1.3 : mise en ligne automatique à chaque release, le serveur récupère l'image ; v1.1 : composants rangés par famille du catalogue et étape 2 bis, briques génériques ; v1.2 : parcours et compétences en TypeScript, vérification du contenu à la mise en ligne)

S'appuie sur le PRD v0.2 (contraintes §7), l'architecture de contenu v1.1, le design system v1.1 et les maquettes validées (`docs/06-maquettes/`). Choix du propriétaire du 22/10/2026 : Vue + Vite avec pré-rendu (pas de Nuxt), pas d'analytics en V1 (remplacé le 09/11/2026 par Dashility, §9), déploiement par GitHub Actions et image Docker.

---

## 1. Stack

| Besoin | Choix | Pourquoi |
|---|---|---|
| Interface | **Vue 3.5**, `<script setup lang="ts">` | Imposé par le PRD ; déjà en place dans le dépôt |
| Outil de build | **Vite 8** | Déjà en place ; rapide ; base de tout le reste |
| Langage | **TypeScript strict** (`strict`, `noUncheckedIndexedAccess`) | Erreurs trouvées à la compilation ; contenu typé |
| Routage | **vue-router 5** | Routes `/fr/...` et `/en/...`, pages de projet dynamiques |
| Pré-rendu | **vite-ssg** | Chaque page devient un fichier HTML complet au build : le SEO lit le contenu sans JavaScript (PRD). Compatible Vite 8 et vue-router 5 |
| Balises `head` | **@unhead/vue** | Titre, description, Open Graph, `hreflang`, `noindex`, page par page, écrits dans le HTML pré-rendu |
| Textes de l'interface FR / EN | **vue-i18n** | Boutons, libellés, messages ; le contenu long vit dans les fichiers de contenu (§4) |
| Contenu | **Dashility** (CMS du propriétaire), lu au build par son API publique, copié dans le dépôt en JSON (§4) | Ajouter un projet sans ouvrir l'éditeur de code (PRD v0.3) ; le site reste statique |
| Animations | **GSAP + ScrollTrigger** pour la section d'accueil et la frise ; **CSS + `IntersectionObserver`** pour le reste ; **WebGL 2 natif** pour le fond topographique | Repris tels quels des maquettes validées ; GSAP chargé à la demande, uniquement dans le navigateur |
| Images | Captures optimisées au build (AVIF et WebP, plusieurs tailles), via `vite-imagetools` | Une seule capture par projet à fournir (DA §5), le site sert la bonne taille |
| Styles | **CSS natif** : tokens du design system en variables CSS, CSS `scoped` par composant | Les tokens existent déjà ; pas de framework CSS à apprendre ni à surcharger |
| État partagé | **Aucun store** (pas de Pinia) : composables | Site de contenu, presque sans état ; le PRD demande la solution la plus simple |

Pas de Nuxt : choix du propriétaire. Le routage, le pré-rendu, l'i18n, le sitemap et les balises `head` sont assemblés à la main avec les briques ci-dessus (§5 et §6) ; c'est plus de code maison, mais chaque morceau reste petit et lisible.

## 2. Structure des dossiers

```
content/<langue>/<type>.json copie du contenu de Dashility (§4), écrite par `npm run contenu`
public/
  fonts/                     polices auto-hébergées (déjà en place)
  medias/<id>/               images du contenu, téléchargées avec la copie (§4)
  cv/                        CV FR et EN (PDF), téléchargés avec la copie
  favicon.svg                (robots.txt est écrit au build, §5)
src/
  main.ts                    point d'entrée vite-ssg
  router/pages.ts            table des pages FR / EN (pré-rendu, sitemap, SEO)
  router/routes.ts           routes du routeur, tirées de la table
  i18n/  fr.json  en.json    textes de l'interface
  content/                   chargement et types du contenu (§4)
  styles/
    tokens.css               tokens du design system v1.2
    base.css                 reset, typo, fonds de section (`fond-*`)
  composables/               useReveal, useReducedMotion, useCopy,
                             useTopography, useSeo, useLocale…
  components/                briques du catalogue (design system v1.2 §3), par famille
    fonds/                   TopoBackground, SectionWave
    textes/                  LetterReveal
    animations/              ScrollParallax, ScrollHint, DragToSnap
    ui/                      BaseButton, TextLink, BaseTag, BaseIcon, CopyButton, PosterCard,
                             ProjectCard, DeviceFrame, DotList, DefinitionList, StatBlock,
                             BaseTimeline, CycleSteps, NumberedSteps, StickyToc, NextLink
    mise-en-page/            PageSection, PageIntro, PosterGrid, BentoGrid
    site/                    AppHeader, MobileMenu, LangSwitch, AppFooter, SkipLink, ContactLinks
  pages/                     une vue par route (Accueil, Projets, EtudeDeCas…), qui assemble les briques
    blocs/                   assemblages repris sur plusieurs pages (Parlons-en)
    design-system/           catalogue de développement : une page et une description par composant
tests/
  unit/                      Vitest + Vue Test Utils
  e2e/                       Playwright (+ contrôle d'accessibilité axe)
scripts/                     copie du contenu (contenu.ts), vérification du contenu, CSP
docker/  nginx.conf, compose.yml   image de production et lancement sur le serveur (§7)
.github/workflows/           intégration continue et image (§7)
```

Règles du PRD reprises : un composant par fichier, `PascalCase`, `useXxx` pour les composables, un composant au-delà d'environ 200 lignes se découpe, tokens uniquement (aucune valeur en dur).

## 3. Routes et langues

| Page | FR | EN |
|---|---|---|
| Accueil | `/fr` | `/en` |
| Projets | `/fr/projets` | `/en/projects` |
| Étude de cas | `/fr/projets/:slug` | `/en/projects/:slug` |
| À propos | `/fr/a-propos` | `/en/about` |
| Contact | `/fr/contact` | `/en/contact` |
| Mentions légales | `/fr/mentions-legales` | `/en/legal-notice` |
| Confidentialité | `/fr/confidentialite` | `/en/privacy` |
| 404 | `/fr/404` | `/en/404` |

- **Une table de routes** décrit chaque page une fois, avec son chemin dans les deux langues ; `LangSwitch` et les balises `hreflang` s'en servent pour mener à la page équivalente (architecture §2).
- **Racine `/`** : Nginx redirige (302) vers `/fr` ou `/en` selon la langue du navigateur (`Accept-Language`), `/fr` par défaut. La réponse porte `Vary: Accept-Language` et `Cache-Control: no-store`, pour qu'aucun cache (navigateur, Nginx Proxy Manager) ne renvoie un visiteur vers la langue d'un autre. Fonctionne sans JavaScript ; `hreflang="x-default"` pointe vers `/fr`. (Question laissée ouverte par l'architecture §2, tranchée ici.)
- **Pages de projet** : vite-ssg génère une page par projet et par langue où il existe (copie du contenu, §4). Un projet sans version anglaise n'a que sa page française : `LangSwitch` mène alors à la page Projets anglaise, et la page n'a pas de `hreflang` anglais.
- **404** : Nginx sert `/fr/404.html` pour une adresse inconnue sous `/fr`, `/en/404.html` sous `/en`, avec le code HTTP 404.

## 4. Contenu : Dashility

Le contenu est saisi dans Dashility (PRD v0.3), l'espace « Portfolio » de `https://dashility.costamask.dev`. Le site le lit **au build**, jamais pendant une visite : il reste statique, et une panne de Dashility n'a aucun effet sur le site en ligne. Les libellés courts de l'interface (menus, boutons, titres de sections) restent dans `src/i18n/`.

**Les types de contenu** (à créer dans Structure ; la clé de chaque champ est figée dans Dashility et lue par le site, elle doit être saisie telle quelle) :

| Type (clé) | Sorte | Champs : clé, type, obligatoire, traduisible |
|---|---|---|
| Projets (`projets`) | collection | `type` choix `perso` `ecole` `entreprise` `client`, obl. · `titre` texte, obl., trad. · `accroche` texte, obl., trad. · `code`, `demo` liens · `code_prive` texte, trad. (raison quand le code n'est pas public) · `role`, `equipe` textes, obl., trad. · `periode` période au mois, avec « en cours », obl. · `stack` liste de valeurs, obl. · `a_la_une` oui / non · `capture` image, obl. (alt. trad.) · `cadre` choix `navigateur` `telephone`, obl. · `contexte`, `besoin` textes riches, obl., trad. · `contraintes` groupe (`titre` texte, `description` texte riche), trad. · `methode_intro` texte, trad. · `methode` groupe (`titre` texte, `description` texte riche), trad. · `choix` groupe (`titre` texte, `description` texte riche, `compromis` texte), trad. · `resultats` groupe (`valeur`, `libelle` textes, trad. ; `avant`, `apres` nombres) · `conclusion` texte riche, trad. · `enseignements` groupe (`titre` texte, `description` texte riche), trad. |
| Parcours (`parcours`) | collection | `etiquette` choix `lycee` `ecole` `echange` `stage` `job`, obl. · `periode` période au mois, obl. · `titre`, `lieu`, `texte` textes, obl., trad. · `etude_de_cas` texte (slug d'un projet) |
| Compétences (`competences`) | page unique | `categories` groupe (`titre` texte, trad. ; `competences` liste de valeurs, trad.) |
| Qui je suis, Mon histoire, Mentions légales, Confidentialité (`qui-je-suis`, `mon-histoire`, `mentions-legales`, `confidentialite`) | pages uniques | `texte` texte riche, obl., trad. |
| Coordonnées (`coordonnees`) | page unique | `email` texte, obl. · `linkedin`, `github`, `depot` liens, obl. |
| CV (`cv`) | page unique | `fichier` PDF, obl., trad. |

Le slug d'un projet donne son adresse (`/fr/projets/<slug>`), commun aux deux langues. Les libellés des choix (« projet perso », « stage »…) se saisissent dans Dashility, dans les deux langues.

**La copie du contenu** (`scripts/contenu.ts`, `npm run contenu`) :
- lit chaque type dans chaque langue (`GET /api/v1/content/:type?locale=fr|en`, clé `dly_…` dans `DASHILITY_KEY`) et l'écrit tel quel dans `content/<langue>/<type>.json` ;
- télécharge les images (variantes WebP et AVIF) dans `public/medias/<id>/` et les CV dans `public/cv/cv-<langue>.pdf`, puis remplace leurs adresses par ces chemins locaux : la CSP `img-src 'self'` ne change pas, et les adresses du CV restent celles d'aujourd'hui ;
- supprime les médias qui ne servent plus.

La copie est **versionnée dans le dépôt** : le développement et le CI des PR la lisent, sans clé ni réseau. Elle se rafraîchit à la main (`npm run contenu`, clé dans `.env.local`, ignoré par Git) et part dans une PR comme le reste. La mise en ligne, elle, lit toujours Dashility en direct (§7).

**Le chargement** (`src/content/`) : les chargeurs lisent ces JSON et les convertissent dans les types du site (`Project`, `TimelineStep`, `SkillCategory`), en vérifiant leur forme : un champ manquant ou renommé dans Structure fait échouer le build, avec le type et le champ en cause, au lieu de publier une page vide.
- **Étude de cas** : une section par champ rempli, dans l'ordre du gabarit (contexte, besoin, contraintes, méthode, choix techniques, résultats, enseignements), avec les mêmes briques qu'aujourd'hui (`NumberedSteps`, `StatBlock`…). Les titres des sections viennent de `src/i18n/` ; le sommaire (`StickyToc`) liste les sections présentes.
- **Texte riche** : Dashility le renvoie en HTML, construit à partir d'une liste fermée de balises, texte échappé et liens en `http(s)` ou `mailto` seulement ; le site l'insère tel quel (`v-html`) dans `.prose`. La mise en avant arrive en `<mark>`, stylée comme l'actuel `.hl`.
- **Périodes** : mises en forme dans la langue de la page (« oct. 2026 – en cours », « sept. 2020 – juil. 2022 »). Les projets sont triés du plus récent au plus ancien (fin de période, « en cours » d'abord), le parcours du plus ancien au plus récent.
- **Accueil** : les trois premiers projets marqués « À la une ».
- **Compétences** : la mise en avant des technos utilisées par ce site reste une liste dans le code (elle décrit le code du site, pas son contenu).
- **Anglais** : Dashility ne renvoie en anglais que les entrées dont la version anglaise est complète. Ce qui manque n'apparaît pas sur le site anglais (choix du propriétaire, 09/11/2026), sans bloquer la mise en ligne.

**Vérification à la mise en ligne** (`check-content`) : `VITE_SITE_URL` présent, les deux CV présents, chaque type de contenu non vide en français, et aucun « à compléter » dans la copie.

## 5. SEO et balises `head`

- **HTML complet** pour chaque page, généré au build (vite-ssg).
- **Par page** (`useSeo`) : titre (architecture §5), description, `lang` du document, balises Open Graph (image : la capture du projet pour une étude de cas, une image générique sinon), `canonical`, `hreflang` FR, EN et `x-default`.
- **`noindex`** : mentions légales, confidentialité et 404 (architecture §5).
- **Sitemap** : `sitemap.xml` écrit à la fin du build à partir de la table de routes (`src/router/sitemap.ts`), avec les deux langues liées ; `robots.txt` le référence. Sans `VITE_SITE_URL` (développement, CI), seul `robots.txt` est écrit.
- **Page `/design-system`** : la route n'est ajoutée qu'en développement (`import.meta.env.DEV`), donc absente du pré-rendu, du sitemap et de l'image de production ; un test de l'intégration continue vérifie qu'aucun fichier `design-system` n'existe dans le build.

## 6. Interface et animations

- **Tokens** : `tokens.css` reprend le design system v1.1 (couleurs, rôles, fonds de section, typographie, espacements, rayons, motion) ; les composants n'utilisent que des variables.
- **Composants** : ceux du design system v1.1, construits à partir des maquettes, qui fixent le rendu, les états et les animations.
- **Mouvement réduit** : `useReducedMotion` suit `prefers-reduced-motion` en direct ; chaque animation applique les règles du design system (fondu ou rien). Le CSS a la même garde.
- **GSAP** : importé dynamiquement dans `onMounted`, uniquement sur l'accueil et la page À propos ; jamais exécuté pendant le pré-rendu.
- **Fond topographique** : composable `useTopography` (WebGL 2), démarré après le premier affichage, en pause hors de l'écran ; image fixe en mouvement réduit ou sans WebGL.
- **Pas de JavaScript indispensable à la lecture** : sans script, tout le texte et les liens sont là ; les animations, la copie du mail et le glisser de la 404 s'ajoutent par-dessus.

## 7. Hébergement, image Docker et intégration continue

**Environnements**

| Environnement | Commande | Usage |
|---|---|---|
| Développement | `npm run dev` | Travail quotidien (rechargement à chaud) |
| Aperçu | `npm run build && npm run preview` | Vérifier la version pré-rendue, comme en production |
| Production | Conteneur Docker sur le serveur | Le site en ligne |

**Image Docker** (multi-étapes) : une étape Node construit le site (`npm ci`, `check-content`, pré-rendu, puis `scripts/csp.ts` qui écrit la configuration Nginx avec les empreintes des scripts en ligne dans la CSP), une étape `nginx:alpine` ne contient que les fichiers statiques et `docker/nginx.conf`. Nginx sert :
- la redirection de `/` selon la langue, les 404 par langue ;
- des en-têtes de cache : fichiers à empreinte (JS, CSS, polices, images) en cache d'un an, HTML sans cache ;
- des en-têtes de sécurité : `Content-Security-Policy` (scripts et styles du site seulement, aucune ressource tierce ; `connect-src` autorise en plus `https://dashility.costamask.dev`, où partent les analytics, §9). Si le pré-rendu laisse des `<script>` ou `<style>` en ligne dans le HTML (état initial de vite-ssg, balises de @unhead/vue), un script de build calcule leur empreinte SHA-256 et l'ajoute à la politique écrite dans la configuration Nginx, sans `unsafe-inline` pour les scripts. Les composants posent des variables CSS dans l'attribut `style` (décalages d'apparition, inclinaisons), d'où `style-src-attr 'unsafe-inline'`, sans risque d'exécution de code. Les tests de bout en bout tournent sur `vite preview`, sans cette politique : elle a été vérifiée à la main dans Chromium sur l'image (05/11/2026, aucune violation sur les 14 pages) et reste à vérifier ainsi quand le HTML change de forme ; `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`. Le HTTPS et HSTS restent gérés par Nginx Proxy Manager, devant le conteneur.

**GitHub Actions**

| Déclencheur | Étapes |
|---|---|
| PR vers `dev` ou `main` | Installation, lint, vérification des types (`vue-tsc`), tests unitaires, build, tests de bout en bout et d'accessibilité sur la version construite, Lighthouse CI (seuil 95 sur les quatre axes, PRD §3) |
| Merge sur `main` (release), `deploiement.yml` | Les mêmes vérifications (`ci.yml` et `lint.yml` appelés), puis copie du contenu depuis Dashility (`npm run contenu`), construction de l'image et publication sur GitHub Container Registry (`ghcr.io/k0konut/portfolio`), étiquetée `latest` et avec l'empreinte du commit, puis mise en ligne |
| Publication dans Dashility (`repository_dispatch`, `dashility-publish`), même fichier | Copie du contenu, image et publication, **sans relancer les tests** : le code de `main` les a déjà passés. Objectif : en ligne moins de 5 minutes après « Publier » |

**Secrets GitHub** : `DASHILITY_KEY` (clé de lecture de l'espace Portfolio), lu seulement par l'étape de copie du contenu, hors de l'image Docker. Dans Dashility, l'URL de déploiement de l'espace est `https://api.github.com/repos/K0Konut/Portfolio/dispatches`, avec un jeton GitHub à grain fin limité à ce dépôt (permission « Contents » en écriture, la seule qui autorise `repository_dispatch`).

**Mise en ligne** : automatique à chaque release mergée sur `main` et à chaque publication dans Dashility (le merge de la PR de release par le propriétaire vaut confirmation). `deploiement.yml` publie l'image sur GHCR (paquet public) ; le serveur vient la chercher lui-même : une tâche cron de l'utilisateur `costa`, toutes les minutes (5 minutes jusqu'au 09/11/2026 ; une minute pour tenir les 5 minutes entre « Publier » et la mise en ligne), lance `docker compose up -d --pull always --quiet-pull` dans `/srv/docker/Projects/costamask`, ce qui ne recrée le conteneur `costamask-site` que si l'image `latest` a changé. GitHub n'a donc aucun accès au serveur (pas de runner, pas de clé SSH) et le dépôt peut être public. Le conteneur tourne sur le réseau `npm` de Nginx Proxy Manager, qui sert `www.costamask.dev` (HTTPS, HSTS) et redirige `costamask.dev` vers `www`. Journal : `journalctl -t costamask-deploy`. Retour arrière : `IMAGE_TAG=<commit>` dans le `.env` de ce dossier (retirer la ligne pour revenir à `latest`). `docker/compose.yml` est copié à la main dans ce dossier quand il change.

## 8. Qualité

- **Lint et format** : ESLint (configuration plate, `eslint-plugin-vue`, `typescript-eslint`) et Prettier ; `npm run lint` et `npm run format`.
- **Tests unitaires** (Vitest + Vue Test Utils) : chargeur de contenu (champs obligatoires, tri, `featured`), table de routes et équivalences de langue, `CopyButton` (copie, repli par sélection), logique de `DragToSnap` (dépôt près de la cible, retour, clavier), composables de mouvement réduit.
- **Tests de bout en bout** (Playwright) : les parcours du PRD — P1, télécharger le CV en un clic depuis l'accueil ; P2, ouvrir une étude de cas, passer au projet suivant, ouvrir la page Contact et copier le mail ; changer de langue sur une page de projet ; replacer la brique de la 404 au clavier.
- **Accessibilité** : contrôle axe sur chaque page dans les tests de bout en bout ; WCAG 2.2 AA (PRD) ; vérification manuelle du clavier et du lecteur d'écran avant chaque release.
- **Performance** : Lighthouse CI ≥ 95 sur les quatre axes ; polices préchargées (Bagel Fat One, Manrope) en `font-display: swap` ; images aux dimensions déclarées ; JavaScript découpé par page ; GSAP et WebGL chargés après le premier affichage.

## 9. Analytics : Dashility

- **Script** : le paquet npm `@dashility/client` (moins de 2 Ko compressé), appelé dans `main.ts` côté navigateur seulement, jamais pendant le pré-rendu. L'identifiant public de l'espace (`pk_…`) et l'adresse de collecte (`https://dashility.costamask.dev/api/e`) sont dans `SITE` (`src/content/site.ts`) : ils sont publics, ce ne sont pas des secrets.
- **Mesures** : une vue au chargement puis à chaque navigation (le chemin et, à la première vue, le domaine de provenance s'il est externe) ; un téléchargement de CV à chaque clic sur un lien qui porte `data-dashility-cv` (accueil, page Contact, pied de page). Indicateurs du PRD couverts : téléchargements du CV, études de cas ouvertes. Les prises de contact et le temps passé ne sont pas mesurés.
- **Vie privée** : aucun cookie, aucune adresse IP ni navigateur enregistrés, conservation 6 mois ; page Confidentialité mise à jour dans les deux langues. Rien n'est envoyé en local (`localhost`), pendant les tests (`navigator.webdriver`) ni depuis un navigateur marqué par le lien `?dashility-ignore=1` (les visites du propriétaire).
- **Panne** : si Dashility est hors ligne, l'envoi échoue en silence ; le site n'en dépend pas pour s'afficher.

## 9 bis. Ce qui n'est pas en V1

- **Formulaire de contact**, filtres de projets, terminal interactif : V2 (PRD).

## 10. Risques

| Risque | Effet | Parade |
|---|---|---|
| vite-ssg et vue-router 5 (version majeure récente) | Pré-rendu ou routes dynamiques qui cassent | Premier chantier : un squelette qui pré-rend une page FR, une EN et une étude de cas, avant tout le reste |
| Assemblage maison (i18n, sitemap, `head`) | Oublis (une page sans `hreflang`, une route absente du sitemap) | Tout part d'une seule table de routes ; tests unitaires sur cette table |
| WebGL sur des appareils faibles | Saccades, batterie | Démarrage différé, pause hors écran, image fixe en repli ; mesure dans Lighthouse |
| Contenu incomplet à la mise en ligne | Page vide ou CV manquant | Dashility exige les champs obligatoires à la publication ; `check-content` bloque le build de production |
| Champ renommé ou supprimé dans Structure | Section absente ou build cassé | Les chargeurs vérifient la forme du JSON et font échouer le build en nommant le champ ; le site en ligne garde la version précédente |
| Dashility hors ligne au moment d'un build | Pas de mise en ligne | Le site en ligne n'est pas touché ; relancer le déploiement depuis Dashility |
| Serveur personnel | Indisponibilité | Risque accepté par le propriétaire (PRD) ; retour arrière par étiquette d'image |
| Analytics par Dashility, projet du propriétaire | Mesures perdues si Dashility est hors ligne | Le site s'affiche sans lui ; pertes acceptées au volume d'un portfolio |

## 11. Ordre de construction

Trois temps, validés par le propriétaire : le socle, puis les composants, puis les pages qui les assemblent. Chaque composant est construit et vérifié une seule fois, puis réutilisé partout. Une branche et une PR vers `dev` par étape (git-workflow).

**1. Le socle**
- `chore/dev/socle` : dépendances, TypeScript strict, ESLint, Prettier, Vitest, Playwright, intégration continue des PR ; squelette vite-ssg avec une page FR, une EN et une route dynamique pré-rendues (lève le premier risque, §10) ; table de routes.

**2. Les composants**, par lots, chacun montré avec ses états sur la page `/design-system` (en développement seulement, jamais publiée), qui remplace la vitrine HTML du design system :
- `feat/dev/tokens_et_base` : `tokens.css`, `base.css`, fonds de section, polices, page `/design-system`.
- `feat/dev/composants_base` : `BaseButton`, `TextLink`, `Tag`, `Icon`, `CopyButton`, `SkipLink`.
- `feat/dev/composants_mise_en_page` : `AppHeader`, `MobileMenu`, `LangSwitch`, `AppFooter`, `Section`, `SectionWave`, `PageIntro`, `ContactCard`.
- `feat/dev/composants_accueil` : `HeroName`, `TopoBackground`, `ScrollHint`, `ProcessSteps`, `ProjectCard`, `DeviceFrame`.
- `feat/dev/composants_projets` : `ProjectBento`, `MetaList`, `CaseToc`, `StatBlock`, `CaseNav`.
- `feat/dev/composants_a_propos_contact_404` : `CareerTimeline`, `SkillCards`, `BusinessCard`, `BrickRepair`.

**2 bis. Des briques, pas des sections** (design system v1.2, décision du 23/10/2026) : les lots ci-dessus ont produit des sections de page ; elles sont refondues en briques génériques, et la page `/design-system` devient un catalogue avec panneau de réglages en direct :
- `feat/dev/catalogue` : le catalogue (navigation par famille, page par composant, panneau de réglages, états, code, tableau des options), branché d'abord sur les briques qui existent déjà.
- `refactor/dev/briques_animations` : `LetterReveal`, `ScrollParallax`, `DragToSnap`, `ScrollHint`, `TopoBackground` réglables.
- `refactor/dev/briques_composants` : `PosterCard`, `DotList`, `DefinitionList`, `StatBlock`, `BaseTimeline`, `CycleSteps`, `NumberedSteps`, `StickyToc`, `NextLink`, `ContactLinks`.
- `refactor/dev/briques_mise_en_page` : `PosterGrid`, `BentoGrid` ; suppression des anciennes sections (refaites au lot pages) ; composants rangés par famille (§2).

**3. Les pages**, qui appellent les composants et le contenu :
- `feat/dev/contenu` : chargeur de contenu, types, vérification, sitemap.
- `feat/dev/pages` : accueil, Projets, étude de cas, À propos, Contact, 404, pages légales, en français (une branche par page si le volume l'exige).
- `feat/dev/anglais` : traductions et contenu EN.
- `chore/dev/docker_et_deploiement` : image, Nginx, publication sur GitHub Container Registry, `docker-compose.yml` du serveur.

Puis la release : PR `dev` → `main`, à la demande du propriétaire, et la mise en ligne.

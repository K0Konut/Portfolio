# PRD — Portfolio personnel

Version 0.2 — 13/10/2026 — **statut : validé** (seule question ouverte : les références)

---

## 1. Contexte et problème

Étudiant ingénieur en génie informatique, spécialité génie logiciel, à l'ESIEA Paris. Il cherche un **stage**, puis un **premier CDI**, en développement **full-stack**.

Le stage recherché est un **stage de fin d'études (Bac+5) de 6 mois, à partir de début février**. Cette disponibilité n'est pas affichée sur le site pour l'instant ; la question sera revue plus tard.

**Aujourd'hui**, il se présente avec un CV PDF, LinkedIn et GitHub. Ces supports sont standardisés : ils listent des compétences, mais ne montrent ni sa personnalité, ni sa créativité, ni sa méthode. Rien ne permet à un recruteur de le **reconnaître**.

**Le problème à résoudre** : rendre visibles, dans un même support, la rigueur d'un ingénieur, la créativité d'un développeur web et la personnalité du candidat.

- Ce portfolio est un **projet nouveau**, distinct du portfolio Vue.js existant.
- **Il n'y a pas d'échéance ferme** : la qualité passe avant la vitesse.

---

## 2. Vision produit

> Un portfolio qu'on reconnaît au premier coup d'œil, comme un produit de marque. Sa propre conception prouve une double compétence : la rigueur d'ingénieur et la créativité web.

**Ce qu'un recruteur doit retenir en 30 secondes** : techniquement, c'est solide ; créativement, c'est très bon ; et on comprend quel genre de personne il est.

**La « vision d'ingénieur »** repose sur trois piliers, visibles dans le site et dans chaque étude de cas :

1. **Rigueur et méthodologie** : un process explicite, des choix argumentés.
2. **Compréhension du besoin** : partir du problème, pas de la technologie.
3. **Reproductibilité** : un process documenté, un code public, des résultats vérifiables.

**Le site est lui-même une preuve** : performance, accessibilité, code public sur GitHub, et son propre process documenté comme étude de cas.

---

## 3. Objectifs et indicateurs

| Objectif | Indicateur | Cible |
|---|---|---|
| Obtenir des entretiens (stage, puis CDI) | Prises de contact | à fixer après 1 mois de mesure |
| | Téléchargements du CV | à fixer après 1 mois de mesure |
| | Entretiens attribuables au site (suivi manuel) | — |
| Prouver la profondeur technique | % de visiteurs qui ouvrent au moins une étude de cas | à fixer |
| | Temps moyen passé sur une étude de cas | à fixer |
| Prouver la qualité d'exécution | Score Lighthouse (performance, accessibilité, bonnes pratiques, SEO) | ≥ 95 sur les 4 axes |
| | Accessibilité | WCAG 2.2 niveau AA |

---

## 4. Personas

### P1 — Recruteur·se RH (grand groupe ou agence web)
- **Contexte** : trie beaucoup de candidatures, en quelques minutes maximum, sans bagage technique.
- **Besoins** :
  - comprendre vite le profil et le poste visé ;
  - récupérer le CV ;
  - pouvoir contacter le candidat.
- **Freins** : un site confus, du jargon, des animations qui retardent l'accès à l'information.
- **Action principale** : télécharger le CV.

### P2 — Tech lead (grand groupe ou agence web)
- **Contexte** : évalue le niveau technique et la façon de raisonner. En agence, il est aussi sensible à la qualité UI/UX et au motion.
- **Besoins** :
  - des études de cas qui exposent les choix techniques et les compromis ;
  - un accès au code ;
  - un site qui démontre lui-même la qualité annoncée.
- **Freins** : des projets superficiels, des captures sans explication, un site lent ou inaccessible.
- **Action principale** : lire une étude de cas, puis contacter le candidat.

---

## 5. User stories principales

**Recruteur·se RH**
- En tant que RH, je veux comprendre en moins de 30 secondes qui est le candidat et quel poste il vise, afin de décider si je creuse.
- En tant que RH, je veux télécharger le CV en un clic depuis n'importe quelle page, afin de l'ajouter au dossier.
- En tant que RH, je veux voir le parcours (écoles, stages, jobs étudiants) d'un coup d'œil, afin de vérifier l'adéquation au poste.
- En tant que RH, je veux contacter le candidat facilement, afin de proposer un entretien.
- En tant que RH, je veux lire le site en français ou en anglais, afin de le partager avec une équipe internationale.

**Tech lead**
- En tant que tech lead, je veux lire une étude de cas structurée (besoin, contraintes, méthode, choix, résultats), afin d'évaluer la façon de raisonner.
- En tant que tech lead, je veux accéder au code de chaque projet et du portfolio, afin de juger la qualité du code.
- En tant que tech lead, je veux constater que le site est rapide, accessible et soigné, afin d'avoir une preuve concrète des compétences.
- En tant que tech lead, je veux percevoir la personnalité du candidat (page À propos, ton, détails de l'expérience), afin d'évaluer son intégration dans l'équipe.

**Propriétaire du site**
- En tant que propriétaire, je veux ajouter ou mettre à jour une étude de cas sans modifier les composants (contenu en fichiers), afin de faire vivre le site au fil de mes projets.

---

## 6. Périmètre

### MVP (V1)

**Accueil**
- Identité forte et reconnaissable.
- Accroche et poste visé.
- Appels à l'action : CV et contact.
- Habillage visuel de type « fenêtre de terminal » envisagé dans la section d'accueil : élément décoratif, non interactif. Sa forme sera décidée en direction artistique.

**Projets**
- Une liste de projets, puis une page d'étude de cas détaillée par projet.
- Chaque étude de cas suit la même structure : contexte, besoin, contraintes, méthode, choix techniques, résultats, enseignements, liens vers le code.
- Projets prévus :
  - Stage au CNAM (code privé : pas de lien vers le dépôt, l'étude de cas s'appuie sur le process, les captures et les explications)
  - Application de lecture de mangas/BD
  - PST : chronométrage embarqué de caisses à savon
  - Projet de sécurité routière pour les mobilités douces
  - Le portfolio lui-même (méta-étude de cas)
  - CRM (en cours de réalisation, ajouté quand il sera assez avancé)

**Parcours** : une timeline des écoles, des stages et des jobs étudiants.

**À propos** : une page personnelle qui fait comprendre qui il est.

**CV** : téléchargeable, en version FR et EN (les deux versions existent).

**Contact** : lien mail, LinkedIn et GitHub. Le formulaire arrive en V2.

**Bilinguisme** : FR et EN.

**Animations**
- Niveau d'ambition fixé en direction artistique.
- `prefers-reduced-motion` respecté.

**SEO**
- Pages pré-rendues.
- Balises meta et Open Graph.
- Sitemap et `hreflang` pour FR/EN.

**Légal** : mentions légales, politique de confidentialité, analytics conformes au RGPD.

**Contenu** : projets et parcours stockés en fichiers (Markdown/JSON), séparés du code.

### Plus tard (V2+)
- **Formulaire de contact** : anti-spam, conforme au RGPD.
- **Filtres de projets** : utiles quand le nombre de projets augmentera.
- **Easter eggs.**
- **Terminal interactif** : idée à réévaluer plus tard. En V1, le terminal n'est qu'un habillage visuel.

### Hors périmètre
- Un template ou un thème générique. Exigence clé : le site doit être immédiatement identifiable, « comme on reconnaît un site Apple ».
- Un blog ou des notes techniques.
- Un back-office ou un CMS : le contenu est géré en fichiers.

---

## 7. Contraintes

**Technique**
- Vue.js 3, Vite et npm.
- Le SEO impose un pré-rendu des pages. Deux options sont recommandées :
  - Nuxt (basé sur Vue 3 et Vite) en génération statique ;
  - Vue 3 et Vite avec pré-rendu.
- Le choix sera fait en phase 7.

**Hébergement** : auto-hébergé, avec le nom de domaine existant.
- Serveur personnel à domicile sous Proxmox ; services déployés en conteneurs Docker, exposés via Nginx Proxy Manager.
- Le site statique tourne dans un conteneur dédié ; les analytics auto-hébergées peuvent tourner dans un autre conteneur.
- Disponibilité : le serveur tourne en continu et se relance rapidement en cas d'arrêt. Le risque est jugé faible par le propriétaire. La stratégie de déploiement sera définie en phase 7.

**Budget** : 0 €, donc aucun service payant.

**Temps** : la disponibilité varie selon les semaines. Le travail est découpé en petites étapes livrables.

**Légal**
- Mentions légales obligatoires : éditeur et hébergeur.
- Le RGPD s'applique aux analytics, et au formulaire en V2.
- Recommandation : des analytics sans cookies, auto-hébergées, pour éviter le bandeau de consentement.

**Accessibilité** : WCAG 2.2 niveau AA.

**Performance** : les animations peuvent être ambitieuses, mais pas au détriment des Core Web Vitals.

**Code public**
- Dépôt GitHub propre, sans secret.
- README soigné et process documenté, conformément au pilier « reproductibilité ».

---

## 8. Questions ouvertes

1. **Références** : il faut des sites aimés et des sites rejetés, avec la raison. Elles sont attendues pour les phases 2 et 3.

Questions résolues le 13/10/2026 : contact V1, disponibilité, confidentialité du stage au CNAM, serveur, CV anglais, rôle du terminal (voir `decisions.md`).

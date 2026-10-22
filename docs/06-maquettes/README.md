# Maquettes — Portfolio personnel

Phase 6 terminée le 22/10/2026 — **statut : validé**

Maquettes haute fidélité en code, construites avec la DA v1.3 et le design system v1.1. Chaque choix visuel a été fait en comparant plusieurs versions dans le navigateur ; toutes les décisions et leurs raisons sont dans `docs/decisions.md` (du 20 au 22/10/2026).

## Voir les maquettes

1. `npm run dev`
2. Ouvrir `http://localhost:5173/docs/06-maquettes/<page>.html`

Ajouter `?still=1` à l'adresse pour couper les animations d'entrée (utile pour les captures) ; sur la 404, `?noredirect=1` évite le retour à l'accueil.

## Écrans

| Écran | Fichier | Captures (`captures/`) | Choix principaux |
|---|---|---|---|
| Accueil | `accueil.html` | `accueil-bureau.png`, `accueil-mobile.png` | Statut et poste sous le nom ; fond topographique violet ; projets en affiches collées ; méthode en cycle de 6 étapes ; « Parlons-en » en carte collée |
| Projets | `projets.html` | `projets-bureau.png`, `projets-mobile.png` | Bento magique ; fonds de capture lime, violet foncé et rose ; « Parlons-en » avant le pied de page |
| Étude de cas | `etude-de-cas.html` | `etude-de-cas-bureau.png`, `etude-de-cas-mobile.png` | Exemple : le portfolio ; métadonnées en fiche ; sommaire collant ; barres de résultats |
| À propos | `a-propos.html` | `a-propos-bureau.png`, `a-propos-mobile.png` | Frise centrée alternée ; compétences en affiches collées ; méthode détaillée et « En équipe » |
| Contact | `contact.html` | `contact-bureau.png`, `contact-mobile.png` | Carte de visite crème, droite et immobile |
| 404 | `404.html` | `404-bureau.png`, `404-mobile.png` | « Il manque une brique. » : la brique à replacer ramène à l'accueil |

Le pied de page est le même sur toutes les pages. Captures de projets d'exemple : `captures/projets/`.

## Retours et ajustements

- **Comparer plutôt que décrire** : chaque section a été choisie entre deux et six versions affichées. Plusieurs propositions ont été refusées puis refaites (la prise de contact, la présentation des compétences, la 404 rendue interactive).
- **Images** : une capture par projet, au format de l'appareil (1440 × 900 ou 390 × 844) ; plus aucune image déformée, quelle que soit la forme de la tuile.
- **Couleurs** : pas de violet sur violet derrière les captures ; trois teintes de fond de capture, sans nouvelle couleur dans la palette.
- **Mouvement** : deux exceptions à « rien ne suit le curseur », validées : la lueur du bento et la brique de la 404.
- **Revue de code** : un correctif sur la 404 (glisser interrompu sur écran tactile).

## Contenu à fournir avant la mise en ligne

- Vraie adresse mail et adresse LinkedIn.
- Année, type et stack de chaque projet, et leurs captures.
- Parcours : dates, nom du lycée, durée du stage au CNAM, jobs étudiants.

## Suite

Phase 7 : architecture technique (`docs/07-architecture-technique.md`), puis intégration en Vue. Les maquettes ne sont pas du code de production : elles fixent le rendu, les états et les animations à reproduire avec les composants Vue.

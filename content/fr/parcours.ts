import type { TimelineStep } from '../../src/content/types'

/* Le parcours (page À propos), du plus ancien au plus récent, d'après le profil LinkedIn.
   Les valeurs provisoires bloquent la mise en ligne (scripts/check-content.ts). */
export default [
  {
    kind: 'lycée',
    dates: 'sept. 2020 – juil. 2022',
    title: 'Bac STI2D, spécialité SIN',
    place: 'Lycée Saint-Nicolas, Paris',
    text: 'Le déclic : construire des choses avec du code, de l’électronique au logiciel.',
  },
  {
    kind: 'job étudiant',
    dates: 'juil. 2021',
    title: 'Mise en place d’un SI logistique',
    place: 'McPrice (réparation Apple), Paris',
    text: 'Premier job : un système d’envoi des colis plus efficace, avec l’installation d’une étiqueteuse.',
  },
  {
    kind: 'job étudiant',
    dates: 'juil. 2022',
    title: 'Responsable stocks',
    place: 'McPrice (réparation Apple), Paris',
    text: 'L’inventaire et le stock du site internet, et un système pour scanner les produits à l’achat.',
  },
  {
    kind: 'école',
    dates: 'sept. 2022 – juil. 2027',
    title: 'Cycle ingénieur, génie informatique',
    place: 'ESIEA, Paris · spécialité génie logiciel',
    text: 'Projets logiciels en équipe, dont le chronométrage embarqué d’une course de caisses à savon.',
  },
  {
    kind: 'job étudiant',
    dates: 'juil. 2023',
    title: 'Boutique eBay',
    place: 'McPrice (réparation Apple), Paris',
    text: 'La création d’une boutique eBay et le référencement des produits ; au passage, la réparation du système de caméras.',
  },
  {
    kind: 'échange',
    dates: 'sept. – déc. 2024',
    title: 'Semestre à l’étranger, ingénierie électrique et électronique',
    place: 'Seoul National University of Science and Technology, Corée du Sud',
    text: 'Un semestre d’études en Corée du Sud.',
  },
  {
    kind: 'stage',
    dates: 'avr. – juil. 2026',
    title: 'Stage de développement web front-end',
    place: 'Assurance Maladie (Cnam), Montreuil',
    text: 'Le front-end de l’interface du compte ameli. Le code est privé.',
  },
] satisfies TimelineStep[]

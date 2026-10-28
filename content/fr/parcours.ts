import type { TimelineStep } from '../../src/content/types'

/* Le parcours (page À propos), du plus ancien au plus récent. Les valeurs provisoires bloquent la mise en ligne (scripts/check-content.ts). */
export default [
  {
    kind: 'lycée',
    dates: 'dates à compléter',
    title: 'Bac STI2D, spécialité SIN',
    place: 'Lycée (nom à compléter)',
    text: 'Le déclic : construire des choses avec du code, de l’électronique au logiciel.',
  },
  {
    kind: 'école',
    dates: 'dates à compléter',
    title: 'Cycle ingénieur, génie informatique',
    place: 'ESIEA, Paris · spécialité génie logiciel',
    text: 'Projets logiciels en équipe, dont le chronométrage embarqué d’une course de caisses à savon.',
  },
  {
    kind: 'stage',
    dates: 'dates à compléter',
    title: 'Stage de développement',
    place: 'CNAM',
    text: 'Un stage dont le code est privé : l’étude de cas en montre le process et les écrans.',
  },
  {
    kind: 'job étudiant',
    dates: 'dates à compléter',
    title: 'Job étudiant à compléter',
    place: 'lieu et rôle à compléter',
    text: 'Une ou deux lignes sur ce que ce job a apporté (à compléter).',
  },
] satisfies TimelineStep[]

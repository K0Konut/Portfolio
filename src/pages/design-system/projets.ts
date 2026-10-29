import capture from '../../../content/images/projets/ce-portfolio/capture.png'
import type { ProjectSummary } from '../../content/types'

const TODO = ['stack à compléter']

/** Projets d'exemple pour la vitrine, du plus récent au plus ancien (le vrai contenu arrive avec le chargeur de contenu) */
export const PROJETS: ProjectSummary[] = [
  {
    slug: 'ce-portfolio',
    title: 'Ce portfolio',
    tags: ['projet perso'],
    description:
      'Ce site, de la méthode au code : PRD, direction artistique, design system, maquettes, puis intégration en Vue.',
    stack: ['Vue 3', 'TypeScript', 'Vite', 'Docker'],
    capture: { device: 'browser', src: capture },
  },
  {
    slug: 'stage-cnam',
    title: 'Stage au CNAM',
    tags: ['stage'],
    description:
      'Mon stage de développement au CNAM. Le code est privé : l’étude de cas montre le process et les écrans.',
    stack: TODO,
    capture: { device: 'browser' },
  },
  {
    slug: 'mobilites-douces',
    title: 'Sécurité routière et mobilités douces',
    tags: ['projet d’école'],
    description:
      'Un projet de sécurité routière pour les vélos, les trottinettes et les autres mobilités douces.',
    stack: TODO,
    capture: { device: 'phone', label: 'Mobilités douces' },
  },
  {
    slug: 'chrono',
    title: 'Chrono caisses à savon',
    tags: ['projet d’école', 'embarqué'],
    description: 'Le chronométrage embarqué d’une course de caisses à savon, conçu en projet PST.',
    stack: TODO,
    capture: { device: 'browser' },
  },
  {
    slug: 'mangas',
    title: 'Lecteur de mangas et BD',
    tags: ['application'],
    description: 'Une application pour lire ses mangas et ses BD.',
    stack: TODO,
    capture: { device: 'phone', label: 'Mangas & BD' },
  },
]

/** Résumé d'un projet : ce que montrent les cartes (accueil, page Projets). Le contenu complet arrive
    avec le chargeur de contenu (architecture technique §4). */
export interface ProjectSummary {
  slug: string
  title: string
  /** Une ou deux étiquettes : type de projet */
  tags: string[]
  description: string
  stack: string[]
  capture: {
    device: 'browser' | 'phone'
    /** Image importée (1440 × 900 ou 390 × 844) ; sans image, l'écran affiche le nom du projet */
    src?: string
    /** Texte court affiché sur l'écran provisoire */
    label?: string
  }
}

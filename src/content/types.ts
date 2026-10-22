/** Appareil du cadre de capture (design system § DeviceFrame) */
export type Device = 'browser' | 'phone'

/** Fiche d'une étude de cas (design system § MetaList) */
export interface ProjectMeta {
  type: string
  role: string
  duration: string
  team: string
  stack: string[]
  /** Raison, en une phrase, quand le code n'est pas public (stage) */
  privateCode?: string
}

/** Résultat chiffré (design system § StatBlock) ; `compare` dessine les barres avant / après */
export interface Stat {
  value: string
  label: string
  compare?: { before: number; after: number }
}

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
    device: Device
    /** Image importée (1440 × 900 ou 390 × 844) ; sans image, l'écran affiche le nom du projet */
    src?: string
    /** Texte court affiché sur l'écran provisoire */
    label?: string
  }
}

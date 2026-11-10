/** Appareil du cadre de capture (design system § DeviceFrame) */
export type Device = 'browser' | 'phone'

/** Résultat chiffré (design system § StatBlock) ; `before` et `after` dessinent les barres */
export interface Stat {
  value: string
  label: string
  before?: number
  after?: number
}

/** Période au mois (AAAA-MM), telle que Dashility la renvoie */
export interface Period {
  start: string
  end?: string
  ongoing?: boolean
}

/** Texte riche de Dashility : du HTML fait d'une liste fermée de balises, inséré tel quel (architecture §4) */
export type RichText = string

/** Élément d'une section en liste (contraintes, méthode, choix, enseignements) */
export interface CaseItem {
  title: string
  html: RichText
  /** Compromis d'un choix technique */
  tradeOff?: string
}

/** Résumé d'un projet : ce que montrent les cartes (accueil, page Projets) */
export interface ProjectSummary {
  slug: string
  title: string
  /** Une ou deux étiquettes : type de projet */
  tags: string[]
  description: string
  stack: string[]
  capture: {
    device: Device
    /** Image (1440 × 900 ou 390 × 844) ; sans image, l'écran affiche le nom du projet */
    src?: string
    /** Variantes WebP, attribut srcset */
    srcset?: string
    /** Description de l'écran, saisie dans Dashility */
    alt?: string
    /** Texte court affiché sur l'écran provisoire */
    label?: string
  }
}

/** Un projet complet, lu dans content/<langue>/projets.json (architecture technique §4) */
export interface Project extends ProjectSummary {
  period: Period
  /** Fait partie des trois projets de l'accueil */
  featured: boolean
  meta: {
    type: string
    role: string
    team: string
    /** Raison, en une phrase, quand le code n'est pas public (stage) */
    privateCode?: string
  }
  links: { code?: string; demo?: string }
  /** Le corps de l'étude de cas, section par section ; une section vide n'est pas affichée */
  body: {
    contexte: RichText
    besoin: RichText
    contraintes: CaseItem[]
    methodeIntro?: string
    methode: CaseItem[]
    choix: CaseItem[]
    resultats: Stat[]
    conclusion?: RichText
    enseignements: CaseItem[]
  }
}

/** Une étape du parcours, du plus ancien au plus récent, montrée en BaseTimeline */
export interface TimelineStep {
  /** Étiquette, dans la langue de la page : lycée, école, échange, stage, job étudiant… */
  kind: string
  period: Period
  title: string
  /** Lieu et rôle */
  place: string
  text: string
  /** Slug de l'étude de cas liée, s'il y en a une */
  caseStudy?: string
}

/** Une catégorie de compétences ; `site` : techno utilisée par ce site (mise en avant dans DotList) */
export interface SkillCategory {
  title: string
  skills: { name: string; site?: boolean }[]
}

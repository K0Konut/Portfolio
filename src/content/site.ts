/* Coordonnées et liens du site, en un seul endroit (pied de page, « Parlons-en », page Contact).
   Les valeurs marquées en commentaire sont provisoires : scripts/check-content.ts bloque la mise en ligne. */
export const SITE = {
  name: 'Costa Maskulov',
  email: 'maskulov12.pro@gmail.com',
  linkedin: 'https://www.linkedin.com/in/costa-maskulov/',
  github: 'https://github.com/K0Konut',
  repository: 'https://github.com/K0Konut/Portfolio',
  cv: { fr: '/cv/cv-fr.pdf', en: '/cv/cv-en.pdf' },
} as const

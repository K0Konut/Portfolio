/* Coordonnées et liens du site, en un seul endroit (pied de page, « Parlons-en », page Contact).
   Les valeurs marquées en commentaire sont provisoires : scripts/check-content.ts bloque la mise en ligne. */
export const SITE = {
  name: 'Costa Maskulov',
  email: 'costa.maskulov@exemple.fr', // à compléter
  linkedin: 'https://www.linkedin.com/', // à compléter
  github: 'https://github.com/K0Konut',
  repository: 'https://github.com/K0Konut/Portfolio',
  cv: { fr: '/cv/cv-fr.pdf', en: '/cv/cv-en.pdf' },
} as const

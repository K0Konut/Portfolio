import type { PageName } from '../../router/routes'

/** Liens de la navigation principale, dans l'ordre (architecture §1) */
export const NAV_PAGES = ['projets', 'a-propos', 'contact'] as const satisfies readonly PageName[]

/** Le lien de la rubrique en cours : une étude de cas fait partie de « Projets » */
export function isCurrentSection(link: PageName, current: PageName | undefined): boolean {
  return link === current || (link === 'projets' && current === 'etude-de-cas')
}

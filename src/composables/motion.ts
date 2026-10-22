/* Valeurs de mouvement lues dans les tokens (tokens.css), pour les animations pilotées en JavaScript :
   une seule source pour le CSS et pour GSAP. */

const reducedQuery = () => matchMedia('(prefers-reduced-motion: reduce)')

/** Préférence « réduire les animations » (MediaQueryList, à suivre en direct avec « change ») */
export const reducedMotion = reducedQuery

function raw(name: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim()
}

/** Durée en secondes (« 700ms » → 0.7, « 2s » → 2) */
export function seconds(name: string): number {
  const value = raw(name)
  return parseFloat(value) / (value.endsWith('ms') ? 1000 : 1)
}

/** Nombre sans unité (« 0.35 », « 24px » → 24) */
export function number(name: string): number {
  return parseFloat(raw(name))
}

/** Valeur brute (« 0.4em ») */
export function token(name: string): string {
  return raw(name)
}

/** Les 4 nombres d'un « cubic-bezier(…) » */
export function bezier(name: string): [number, number, number, number] {
  const n = (raw(name).match(/-?[\d.]+/g) ?? []).map(Number)
  return [n[0] ?? 0, n[1] ?? 0, n[2] ?? 1, n[3] ?? 1]
}

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

/** Les 4 nombres d'un « cubic-bezier(…) » */
export function bezier(name: string): [number, number, number, number] {
  const n = (raw(name).match(/-?[\d.]+/g) ?? []).map(Number)
  return [n[0] ?? 0, n[1] ?? 0, n[2] ?? 1, n[3] ?? 1]
}

/** Courbe d'un token « cubic-bezier(…) » en fonction (progression 0 → 1), pour GSAP : la même courbe qu'en CSS */
export function cubicEase(name: string): (p: number) => number {
  const [x1, y1, x2, y2] = bezier(name)
  const at = (a: number, b: number, s: number) =>
    3 * a * s * (1 - s) ** 2 + 3 * b * s ** 2 * (1 - s) + s ** 3
  return (p) => {
    let lo = 0
    let hi = 1
    let s = p
    for (let i = 0; i < 20; i++) {
      s = (lo + hi) / 2
      if (at(x1, x2, s) < p) lo = s
      else hi = s
    }
    return at(y1, y2, s)
  }
}

/** La police de `el` chargée (300 ms au plus, jamais en échec), pour ne pas animer une police de secours */
export function fontReady(el: Element): Promise<unknown> {
  const { fontSize, fontFamily } = getComputedStyle(el)
  // Police introuvable ou API absente : on n'attend pas, l'animation ne doit jamais rester bloquée
  const loading = document.fonts?.load(`${fontSize} ${fontFamily}`).catch(() => undefined)
  return Promise.race([loading, new Promise((resolve) => setTimeout(resolve, 300))])
}

type Scroll = {
  gsap: typeof import('gsap').gsap
  ScrollTrigger: typeof import('gsap/ScrollTrigger').ScrollTrigger
}
let scroll: Promise<Scroll | undefined> | undefined

/** GSAP et ScrollTrigger, téléchargés une seule fois et enregistrés ; rien côté serveur, en mouvement réduit,
    ou si le téléchargement échoue (le contenu reste alors tel quel) */
export function loadScrollTrigger(): Promise<Scroll | undefined> {
  if (import.meta.env.SSR || reducedMotion().matches) return Promise.resolve(undefined)
  scroll ??= Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
    ([{ gsap }, { ScrollTrigger }]) => {
      gsap.registerPlugin(ScrollTrigger)
      return { gsap, ScrollTrigger }
    },
    () => undefined,
  )
  return scroll
}

import type { Directive } from 'vue'

/* Apparition au scroll (DA §6, design system § Section) : le bloc monte de --reveal-distance et apparaît,
   une seule fois. Seuls les blocs sous la ligne de flottaison sont cachés, et seulement par le script :
   sans JavaScript (et dans le HTML pré-rendu), tout est visible. La valeur est le rang du bloc (décalage).
   Aucune mesure synchrone : l'IntersectionObserver fournit la position de chaque bloc. */
const seen = new WeakSet<Element>()
let observer: IntersectionObserver | undefined

function onEntries(entries: IntersectionObserverEntry[]) {
  for (const { target, isIntersecting, boundingClientRect, rootBounds } of entries) {
    const first = !seen.has(target)
    seen.add(target)
    if (isIntersecting) {
      target.classList.remove('is-pending')
      observer?.unobserve(target)
    } else if (first && rootBounds && boundingClientRect.top >= rootBounds.bottom) {
      target.classList.add('is-pending')
    } else if (first) {
      observer?.unobserve(target)
    }
  }
}

export const vReveal: Directive<HTMLElement, number | undefined> = {
  mounted(el, { value }) {
    el.classList.add('reveal')
    if (value) el.style.setProperty('--i', String(value))
    if (!('IntersectionObserver' in window)) return
    observer ??= new IntersectionObserver(onEntries, { rootMargin: '0px 0px -10% 0px' })
    observer.observe(el)
  },
  unmounted(el) {
    observer?.unobserve(el)
  },
}

declare module 'vue' {
  interface GlobalDirectives {
    vReveal: typeof vReveal
  }
}

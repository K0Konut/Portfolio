import type { Directive } from 'vue'

/* Apparition au scroll (DA §6, design system § Section) : le bloc monte de --reveal-distance et apparaît,
   une seule fois. Seuls les blocs sous la ligne de flottaison sont cachés, et seulement par le script :
   sans JavaScript (et dans le HTML pré-rendu), tout est visible. La valeur est le rang du bloc (décalage). */
let observer: IntersectionObserver | undefined

function watch(el: Element) {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.classList.remove('is-pending')
        observer?.unobserve(entry.target)
      }
    },
    { rootMargin: '0px 0px -10% 0px' },
  )
  observer.observe(el)
}

export const vReveal: Directive<HTMLElement, number | undefined> = {
  getSSRProps: () => ({}),
  mounted(el, { value }) {
    el.classList.add('reveal')
    if (value) el.style.setProperty('--i', String(value))
    if (!('IntersectionObserver' in window) || el.getBoundingClientRect().top <= innerHeight) return
    el.classList.add('is-pending')
    watch(el)
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

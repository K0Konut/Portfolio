/* Catalogue de développement : montrer un état sans la souris, ou le mouvement réduit sans changer le réglage
   du système. Les règles CSS concernées sont recopiées dans une feuille à part : « :hover » devient
   « .ds-hover » (comme le module « pseudo states » de Storybook), et le contenu des blocs
   « @media (prefers-reduced-motion: reduce) » s'applique sans condition. */

const PSEUDO = /:hover|:focus-visible|:focus-within|:active/g
const CLASS: Record<string, string> = {
  ':hover': '.ds-hover',
  ':focus-visible': '.ds-focus',
  ':focus-within': '.ds-focus',
  ':active': '.ds-active',
}
const REDUCE = /prefers-reduced-motion:\s*reduce/

function rewrite(rules: CSSRuleList, reduced: boolean, out: string[]) {
  for (const rule of rules) {
    if (rule instanceof CSSStyleRule && !reduced && rule.selectorText.match(PSEUDO)) {
      out.push(`${rule.selectorText.replace(PSEUDO, (p) => CLASS[p] ?? p)}{${rule.style.cssText}}`)
    } else if (rule instanceof CSSMediaRule) {
      if (reduced && REDUCE.test(rule.conditionText)) {
        for (const inner of rule.cssRules) out.push(inner.cssText)
      } else {
        const inner: string[] = []
        rewrite(rule.cssRules, reduced, inner)
        if (inner.length) out.push(`@media ${rule.conditionText}{${inner.join('')}}`)
      }
    }
  }
}

function inject(id: string, reduced: boolean) {
  const out: string[] = []
  for (const sheet of document.styleSheets) {
    if ((sheet.ownerNode as HTMLElement | null)?.id === id) continue
    try {
      rewrite(sheet.cssRules, reduced, out)
    } catch {
      // feuille d'une autre origine : illisible, rien à recopier
    }
  }
  const style =
    document.getElementById(id) ?? document.head.appendChild(document.createElement('style'))
  style.id = id
  style.textContent = out.join('\n')
}

/** Rend les classes .ds-hover, .ds-focus et .ds-active équivalentes aux états réels */
export const forceStates = () => inject('ds-states', false)

/** Applique le mouvement réduit : CSS (blocs prefers-reduced-motion) et JavaScript (matchMedia) */
export function forceReducedMotion() {
  inject('ds-reduced', true)
  const native = window.matchMedia.bind(window)
  const none = () => {}
  window.matchMedia = (query: string) =>
    REDUCE.test(query)
      ? ({
          matches: true,
          media: query,
          onchange: null,
          addEventListener: none,
          removeEventListener: none,
          addListener: none,
          removeListener: none,
          dispatchEvent: () => false,
        } as MediaQueryList)
      : native(query)
}

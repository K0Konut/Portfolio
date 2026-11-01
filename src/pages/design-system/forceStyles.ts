/* Catalogue de développement : montrer un état sans la souris, ou le mouvement réduit sans changer le réglage
   du système.
   - États : les règles qui contiennent « :hover »… sont recopiées dans une feuille à part avec une classe
     (« .ds-hover »), comme le module « pseudo states » de Storybook.
   - Mouvement réduit (dans l'iframe de démo seulement) : dans chaque condition @media, « prefers-reduced-motion:
     reduce » devient toujours vraie et « no-preference » toujours fausse ; matchMedia suit la même règle. */

const PSEUDO = /:hover|:focus-visible|:focus-within|:active/g
const CLASS: Record<string, string> = {
  ':hover': '.ds-hover',
  ':focus-visible': '.ds-focus',
  ':focus-within': '.ds-focus',
  ':active': '.ds-active',
}

function copyStates(rules: CSSRuleList, out: string[]) {
  for (const rule of rules) {
    if (rule instanceof CSSStyleRule && rule.selectorText.match(PSEUDO)) {
      out.push(`${rule.selectorText.replace(PSEUDO, (p) => CLASS[p] ?? p)}{${rule.style.cssText}}`)
    } else if (rule instanceof CSSMediaRule) {
      const inner: string[] = []
      copyStates(rule.cssRules, inner)
      if (inner.length) out.push(`@media ${rule.conditionText}{${inner.join('')}}`)
    }
  }
}

/** Feuilles lisibles du document (une feuille d'une autre origine lève une erreur) */
function* sheets(skip?: string) {
  for (const sheet of document.styleSheets) {
    if ((sheet.ownerNode as HTMLElement | null)?.id === skip) continue
    try {
      yield sheet.cssRules
    } catch {
      // illisible : rien à faire
    }
  }
}

/** Rend les classes .ds-hover, .ds-focus et .ds-active équivalentes aux états réels */
export function forceStates() {
  const out: string[] = []
  for (const rules of sheets('ds-states')) copyStates(rules, out)
  const style =
    document.getElementById('ds-states') ??
    document.head.appendChild(Object.assign(document.createElement('style'), { id: 'ds-states' }))
  style.textContent = out.join('\n')
}

const reduceQuery = (query: string) =>
  query
    .replace(/\(\s*prefers-reduced-motion:\s*reduce\s*\)/g, '(min-width: 0px)')
    .replace(/\(\s*prefers-reduced-motion:\s*no-preference\s*\)/g, '(max-width: -1px)')

function reduceRules(rules: CSSRuleList) {
  for (const rule of rules) {
    if (!(rule instanceof CSSMediaRule)) continue
    const media = reduceQuery(rule.media.mediaText)
    if (media !== rule.media.mediaText) rule.media.mediaText = media
    reduceRules(rule.cssRules)
  }
}

/** Applique le mouvement réduit au document : conditions CSS et matchMedia */
export function forceReducedMotion() {
  for (const rules of sheets()) reduceRules(rules)
  const native = window.matchMedia.bind(window)
  window.matchMedia = (query: string) => native(reduceQuery(query))
}

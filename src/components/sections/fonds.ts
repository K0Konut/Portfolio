/** Les six fonds de section (design system § Fonds de section) et la teinte de base de chacun. */
export const FOND_COLORS = {
  nuit: 'var(--neutral-950)',
  violet: 'var(--violet-700)',
  vif: 'var(--violet-500)',
  lime: 'var(--lime-500)',
  rose: 'var(--pink-500)',
  creme: 'var(--neutral-50)',
} as const

export type Fond = keyof typeof FOND_COLORS

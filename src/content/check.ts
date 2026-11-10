import type { Period } from './types'

/* Vérifications communes des chargeurs de contenu (copie de Dashility, architecture technique §4) */
export type Json = Record<string, unknown>
export const isText = (v: unknown): v is string => typeof v === 'string' && v.trim() !== ''
export const isObject = (v: unknown): v is Json =>
  typeof v === 'object' && v !== null && !Array.isArray(v)
/** Mois au format de Dashility : AAAA-MM */
export const MONTH = /^\d{4}-(0[1-9]|1[0-2])$/

/** Période de Dashility (`{ start, end?, ongoing? }`, au mois) ; `null` si elle est invalide. Une fin vide
    arrive en `null` ; une fin avant le début est refusée. */
export function parsePeriod(v: unknown): Period | null {
  if (!isObject(v) || !isText(v.start) || !MONTH.test(v.start)) return null
  const end = v.end ?? undefined
  if (end !== undefined && (typeof end !== 'string' || !MONTH.test(end) || end < v.start))
    return null
  return { start: v.start, end, ongoing: v.ongoing === true }
}

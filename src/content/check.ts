/* Vérifications communes des chargeurs de contenu (copie de Dashility, architecture technique §4) */
export type Json = Record<string, unknown>
export const isText = (v: unknown): v is string => typeof v === 'string' && v.trim() !== ''
export const isObject = (v: unknown): v is Json =>
  typeof v === 'object' && v !== null && !Array.isArray(v)
/** Mois au format de Dashility : AAAA-MM */
export const MONTH = /^\d{4}-(0[1-9]|1[0-2])$/

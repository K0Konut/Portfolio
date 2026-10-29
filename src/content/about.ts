import type { Locale } from '../router/pages'
import type { SkillCategory, TimelineStep } from './types'

/* Parcours et compétences, un fichier par langue : content/<langue>/parcours.ts et competences.ts.
   Écrits en TypeScript plutôt qu'en YAML : le compilateur vérifie chaque champ (décision du 28/10/2026). */
const timelines = import.meta.glob<TimelineStep[]>('/content/*/parcours.ts', {
  eager: true,
  import: 'default',
})
const skillSets = import.meta.glob<SkillCategory[]>('/content/*/competences.ts', {
  eager: true,
  import: 'default',
})

/** Le parcours, du plus ancien au plus récent ; vide tant que la langue n'est pas traduite */
export const timeline = (locale: Locale): TimelineStep[] =>
  timelines[`/content/${locale}/parcours.ts`] ?? []

/** Les catégories de compétences ; vide tant que la langue n'est pas traduite */
export const skills = (locale: Locale): SkillCategory[] =>
  skillSets[`/content/${locale}/competences.ts`] ?? []

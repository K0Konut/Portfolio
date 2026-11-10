import { isObject, isText, type Json } from './check'
import coordonnees from '../../content/fr/coordonnees.json'

/* Coordonnées et liens du site, en un seul endroit (pied de page, « Parlons-en », page Contact). Les
   coordonnées viennent de Dashility (type `coordonnees`, copie en français : elles ne se traduisent pas). */
const FILE = 'content/fr/coordonnees.json'
const fields: Json = isObject(coordonnees) && isObject(coordonnees.fields) ? coordonnees.fields : {}
if (coordonnees === null)
  throw new Error(`${FILE} vide : publier « coordonnees » dans Dashility, puis npm run contenu`)
const field = (key: string): string => {
  const value = fields[key]
  if (!isText(value)) throw new Error(`${FILE} : champ « ${key} » manquant ou invalide`)
  return value.trim()
}

export const SITE = {
  name: 'Costa Maskulov',
  email: field('email'),
  linkedin: field('linkedin'),
  github: field('github'),
  repository: field('depot'),
  cv: { fr: '/cv/cv-fr.pdf', en: '/cv/cv-en.pdf' },
  // Mesure d'audience Dashility (architecture technique §9) : identifiant public de l'espace, pas un secret
  analytics: {
    key: 'pk_z24oKoDW6UqVHDQNzTaAxg',
    endpoint: 'https://dashility.costamask.dev/api/e',
  },
} as const

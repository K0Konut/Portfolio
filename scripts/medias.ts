/* Ce que la copie du contenu (contenu.ts) sait de Dashility, sans dépendance à Node : testé dans tests/unit. */

export const ORIGIN = 'https://dashility.costamask.dev'

/** Les types de l'espace Portfolio, par leur clé dans Structure */
export const TYPES = [
  'projets',
  'parcours',
  'competences',
  'qui-je-suis',
  'mon-histoire',
  'mentions-legales',
  'confidentialite',
  'coordonnees',
  'cv',
] as const

/** Remplace les adresses des médias de Dashility par leur chemin dans le site (`/medias/<id>/<fichier>`) :
    la CSP reste en `img-src 'self'`. Renvoie aussi les fichiers à télécharger, chemin local → adresse. */
export function localizeMedia(text: string) {
  const files = new Map<string, string>()
  const local = text.replace(
    new RegExp(`${ORIGIN}/api/media/([0-9a-f-]+)/([\\w.]+)`, 'g'),
    (url, id: string, file: string) => {
      files.set(`/medias/${id}/${file}`, url)
      return `/medias/${id}/${file}`
    },
  )
  return { text: local, files }
}

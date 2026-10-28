import type { Component } from 'vue'
import { LOCALES, type Locale } from '../router/routes'
import type { Device, Project, ProjectMeta } from './types'

/* Chargeur des études de cas : un fichier Markdown par projet et par langue, content/<langue>/projets/<slug>.md
   (architecture technique §4). L'en-tête est validé au chargement : au build, un champ manquant ou mal typé
   fait échouer le pré-rendu, avec le nom du fichier.
   shortcut: le corps de chaque étude de cas part avec le chargeur (quelques Ko par projet) ; passer à un
   module d'en-têtes séparé si le nombre de projets grossit. */
const files = import.meta.glob<{ data: Record<string, unknown>; default: Component }>(
  '/content/*/projets/*.md',
  { eager: true },
)
const images = import.meta.glob<string>('/content/images/projets/*/*.{png,jpg,webp}', {
  eager: true,
  import: 'default',
})

const isText = (v: unknown): v is string => typeof v === 'string' && v.trim() !== ''
const isTextList = (v: unknown): v is string[] =>
  Array.isArray(v) && v.length > 0 && v.every(isText)
const isOptionalText = (v: unknown) => v === undefined || isText(v)
const DEVICES: readonly unknown[] = ['browser', 'phone'] satisfies Device[]

/** L'en-tête d'une étude de cas, une fois validé */
type ProjectFile = ProjectMeta &
  Pick<Project, 'title' | 'description' | 'date' | 'tags' | 'stack'> &
  Partial<Pick<Project, 'featured' | 'toc'>> &
  Project['links'] & { capture: Project['capture'] & { image?: string } }

/** Valide l'en-tête d'une étude de cas et la met en forme ; `file` : /content/<langue>/projets/<slug>.md */
export function parseProject(
  file: string,
  meta: Record<string, unknown>,
  imageUrls: Record<string, string> = images,
): Project {
  const check = (field: string, ok: boolean) => {
    if (!ok) throw new Error(`${file} : champ « ${field} » manquant ou invalide`)
  }
  const slug = file.slice(file.lastIndexOf('/') + 1, -'.md'.length)
  for (const field of ['title', 'description', 'type', 'role', 'duration', 'team'])
    check(field, isText(meta[field]))
  for (const field of ['tags', 'stack']) check(field, isTextList(meta[field]))
  for (const field of ['code', 'demo', 'privateCode']) check(field, isOptionalText(meta[field]))
  check('date', isText(meta.date) && /^\d{4}-\d{2}$/.test(meta.date))
  check('featured', meta.featured === undefined || typeof meta.featured === 'boolean')
  const capture = (meta.capture ?? {}) as Record<string, unknown>
  check('capture.device', DEVICES.includes(capture.device))
  check('capture.label', isOptionalText(capture.label))
  const image = isText(capture.image)
    ? `/content/images/projets/${slug}/${capture.image}`
    : undefined
  check('capture.image', capture.image === undefined || (image !== undefined && image in imageUrls))

  // Tout est vérifié : l'en-tête a la forme attendue
  const m = meta as unknown as ProjectFile
  return {
    slug,
    title: m.title,
    description: m.description,
    tags: m.tags,
    stack: m.stack,
    capture: { device: m.capture.device, src: image && imageUrls[image], label: m.capture.label },
    date: m.date,
    featured: m.featured ?? false,
    meta: {
      type: m.type,
      role: m.role,
      duration: m.duration,
      team: m.team,
      privateCode: m.privateCode,
    },
    links: { code: m.code, demo: m.demo },
    toc: m.toc ?? [],
  }
}

const PROJECTS = Object.fromEntries(
  LOCALES.map((locale) => [
    locale,
    Object.entries(files)
      .filter(([file]) => file.startsWith(`/content/${locale}/`))
      .map(([file, mod]) => parseProject(file, mod.data))
      .sort((a, b) => b.date.localeCompare(a.date)),
  ]),
) as Record<Locale, Project[]>

/** Les projets d'une langue, du plus récent au plus ancien */
export const projects = (locale: Locale): Project[] => PROJECTS[locale]

/** Les trois projets mis en avant sur l'accueil */
export const featuredProjects = (locale: Locale): Project[] =>
  projects(locale)
    .filter((p) => p.featured)
    .slice(0, 3)

/** Le corps d'une étude de cas : le composant Vue issu du Markdown */
export const projectBody = (locale: Locale, slug: string): Component | undefined =>
  files[`/content/${locale}/projets/${slug}.md`]?.default

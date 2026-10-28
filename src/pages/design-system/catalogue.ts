import { defineAsyncComponent, type Component } from 'vue'
import capture from '../../assets/projets/ce-portfolio.png'
import ScrollHint from '../../components/animations/ScrollHint.vue'
import TopoBackground from '../../components/fonds/TopoBackground.vue'
import LetterReveal from '../../components/textes/LetterReveal.vue'
import DeviceFrame from '../../components/projects/DeviceFrame.vue'
import ProjectCard from '../../components/projects/ProjectCard.vue'
import AppFooter from '../../components/layout/AppFooter.vue'
import AppHeader from '../../components/layout/AppHeader.vue'
import LangSwitch from '../../components/layout/LangSwitch.vue'
import type { Fond } from '../../components/sections/fonds'
import PageIntro from '../../components/sections/PageIntro.vue'
import PageSection from '../../components/sections/PageSection.vue'
import SectionWave from '../../components/sections/SectionWave.vue'
import BaseButton from '../../components/ui/BaseButton.vue'
import BaseIcon from '../../components/ui/BaseIcon.vue'
import BaseTag from '../../components/ui/BaseTag.vue'
import CopyButton from '../../components/ui/CopyButton.vue'
import TextLink from '../../components/ui/TextLink.vue'
import BaseTimeline from '../../components/ui/BaseTimeline.vue'
import DefinitionList from '../../components/ui/DefinitionList.vue'
import DotList from '../../components/ui/DotList.vue'
import NextLink from '../../components/ui/NextLink.vue'
import NumberedSteps from '../../components/ui/NumberedSteps.vue'
import PosterCard from '../../components/ui/PosterCard.vue'
import StatBlock from '../../components/ui/StatBlock.vue'
import ContactLinks from '../../components/site/ContactLinks.vue'
import fr from '../../i18n/fr.json'
import { ICONS } from '../../components/ui/icons'
import { FONDS as FOND_CLASSES } from './fonds'
import CycleStepsDemo from './demos/CycleStepsDemo.vue'
import DragToSnapDemo from './demos/DragToSnapDemo.vue'
import MobileMenuDemo from './demos/MobileMenuDemo.vue'
import RevealDemo from './demos/RevealDemo.vue'
import ScrollParallaxDemo from './demos/ScrollParallaxDemo.vue'
import SkipLinkDemo from './demos/SkipLinkDemo.vue'
import StickyTocDemo from './demos/StickyTocDemo.vue'

/* Catalogue de développement (design system v1.2 §6) : une description par composant, dont la page tire
   la démo, le panneau de réglages, le code et le tableau des options. */

export type Values = Record<string, string | number | boolean>

export type Control = { key: string; label: string } & (
  | { type: 'text'; initial: string }
  | { type: 'number'; initial: number; min: number; max: number; step?: number }
  | { type: 'boolean'; initial: boolean }
  | { type: 'select'; initial: string; options: readonly string[] }
)

/** Une option du composant, pour le tableau (pas forcément réglable) */
export interface PropDoc {
  name: string
  type: string
  default?: string
  description: string
}

export interface Entry {
  id: string
  name: string
  family: Family
  description: string
  component: Component
  props: PropDoc[]
  /** Contrôles du panneau ; la clé « slot » remplit le slot par défaut */
  controls: Control[]
  slots?: { name: string; description: string }[]
  /** Valeurs des contrôles → options du composant (par défaut : les mêmes clés) */
  bind?: (values: Values) => Record<string, unknown>
  /** Code d'appel, quand `bind` transforme les valeurs */
  code?: (values: Values) => string
  /** Fond de la démo, et style du cadre (hauteur des fonds et animations) */
  fond?: Fond
  frame?: string
  /** Montre les états (survol, focus, appuyé) côte à côte, et le composant sur les six fonds */
  states?: boolean
  /** Démo à la hauteur d'un écran (le composant dépend de la hauteur de l'écran) */
  screen?: boolean
}

export const FAMILIES = [
  'Fonds',
  'Textes animés',
  'Animations',
  'Composants',
  'Mise en page',
  'Site',
] as const
export type Family = (typeof FAMILIES)[number]

/** Briques prévues par le design system v1.2, pas encore construites */
export const PLANNED: Record<Family, string[]> = {
  Fonds: [],
  'Textes animés': [],
  Animations: [],
  Composants: [],
  'Mise en page': ['PosterGrid', 'BentoGrid'],
  Site: [],
}

export const FONDS = FOND_CLASSES.map((f) => f.cls.slice('fond-'.length) as Fond)
const TONES = ['violet-500', 'pink-500', 'lime-500', 'violet-700', 'neutral-50']
const STAGES: Record<string, string | undefined> = {
  défaut: undefined,
  lime: 'var(--lime-500)',
  'violet foncé': 'var(--violet-700)',
  rose: 'var(--pink-500)',
  gris: 'var(--neutral-700)',
}
const list = (text: unknown) =>
  String(text)
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
const STEPS = fr.method.steps
const TIMELINE = [
  { tag: 'lycée', date: '2019 – 2021', title: 'Bac STI2D', subtitle: 'Lycée', text: 'Le déclic.' },
  {
    tag: 'école',
    date: '2021 – 2026',
    title: 'Cycle ingénieur',
    subtitle: 'ESIEA, Paris',
    text: 'Projets logiciels en équipe.',
  },
  {
    tag: 'stage',
    date: '2025',
    title: 'Stage de développement',
    subtitle: 'CNAM',
    text: 'Un code privé, montré par son process.',
    link: { to: '/fr/projets/stage-cnam', label: 'Voir l’étude de cas' },
  },
  { tag: 'job étudiant', title: 'Job étudiant', text: 'Ce que ce job a apporté.' },
]
// Une liste par nombre d'étapes : le même tableau d'un réglage à l'autre, la frise ne se reconstruit pas
const TIMELINES = TIMELINE.map((_, i) => TIMELINE.slice(0, i + 1))
const attr = (name: string, value: unknown) => (value ? ` ${name}="${quote(value)}"` : '')

export const ENTRIES: Entry[] = [
  {
    id: 'topo-background',
    name: 'TopoBackground',
    family: 'Fonds',
    description:
      'Courbes de niveau qui ondulent lentement (WebGL), derrière une section. Pause hors de l’écran ; image fixe en mouvement réduit ; sans WebGL, le fond de la section seul. Les valeurs par défaut donnent le rendu de l’accueil.',
    component: TopoBackground,
    props: [
      {
        name: 'from',
        type: 'string',
        default: 'violet-500',
        description: 'Token de couleur des creux',
      },
      {
        name: 'to',
        type: 'string',
        default: 'pink-500',
        description: 'Token de couleur des hauteurs',
      },
      { name: 'speed', type: 'number', default: '1', description: 'Vitesse de l’ondulation' },
      { name: 'density', type: 'number', default: '1.4', description: 'Nombre de courbes' },
      {
        name: 'fade',
        type: 'boolean',
        default: 'true',
        description: 'Lignes estompées au centre, derrière le contenu',
      },
    ],
    controls: [
      { key: 'from', label: 'Creux', type: 'select', initial: 'violet-500', options: TONES },
      { key: 'to', label: 'Hauteurs', type: 'select', initial: 'pink-500', options: TONES },
      { key: 'speed', label: 'Vitesse', type: 'number', initial: 1, min: 0, max: 6, step: 0.25 },
      {
        key: 'density',
        label: 'Densité',
        type: 'number',
        initial: 1.4,
        min: 0.4,
        max: 5,
        step: 0.2,
      },
      { key: 'fade', label: 'Estompé au centre', type: 'boolean', initial: true },
    ],
    fond: 'violet',
    frame: 'position: relative; height: 22rem',
  },
  {
    id: 'letter-reveal',
    name: 'LetterReveal',
    family: 'Textes animés',
    description:
      'Texte dont les lettres montent et se posent une à une. Le texte reste en clair pour les lecteurs d’écran ; sans JavaScript, il est visible d’emblée. En mouvement réduit, il apparaît en fondu.',
    component: LetterReveal,
    props: [
      { name: 'text', type: 'string', description: 'Le texte' },
      { name: 'as', type: 'string', default: 'span', description: 'Balise (h1, p…)' },
      {
        name: 'stagger',
        type: 'number',
        description: 'Décalage entre deux lettres (s), `--stagger-letter` par défaut',
      },
      {
        name: 'delay',
        type: 'number',
        default: '0',
        description: 'Délai avant la première lettre (s)',
      },
      {
        name: 'start',
        type: "'load' | 'visible' | 'manual'",
        default: 'load',
        description: 'À l’ouverture, à l’arrivée à l’écran, ou par la méthode `play`',
      },
      {
        name: 'stack',
        type: 'boolean',
        default: 'false',
        description: 'Un mot par ligne sous 768 px',
      },
    ],
    controls: [
      { key: 'text', label: 'Texte', type: 'text', initial: 'Costa Maskulov' },
      {
        key: 'as',
        label: 'Balise',
        type: 'select',
        initial: 'p',
        options: ['h1', 'h2', 'p', 'span'],
      },
      {
        key: 'stagger',
        label: 'Décalage (s)',
        type: 'number',
        initial: 0.04,
        min: 0.01,
        max: 0.2,
        step: 0.01,
      },
      { key: 'delay', label: 'Délai (s)', type: 'number', initial: 0, min: 0, max: 2, step: 0.1 },
      {
        key: 'start',
        label: 'Démarrage',
        type: 'select',
        initial: 'load',
        options: ['load', 'visible'],
      },
      { key: 'stack', label: 'Un mot par ligne (mobile)', type: 'boolean', initial: false },
    ],
    frame:
      'font-family: var(--font-display); font-size: var(--text-h1); line-height: var(--leading-display)',
    fond: 'violet',
  },
  {
    id: 'section-wave',
    name: 'SectionWave',
    family: 'Fonds',
    description:
      'Vague organique entre deux sections de fonds différents. Même graine, même vague ; recalculée à la largeur réelle.',
    component: SectionWave,
    props: [
      { name: 'seed', type: 'number', description: 'Graine du tirage (le rang de la frontière)' },
      {
        name: 'from',
        type: 'Fond',
        description: 'Fond de la section du dessus (couleur de la vague)',
      },
      { name: 'to', type: 'Fond', description: 'Fond de la section du dessous' },
    ],
    controls: [
      { key: 'seed', label: 'Graine', type: 'number', initial: 3, min: 1, max: 40 },
      { key: 'from', label: 'Fond du dessus', type: 'select', initial: 'violet', options: FONDS },
      { key: 'to', label: 'Fond du dessous', type: 'select', initial: 'nuit', options: FONDS },
    ],
  },
  {
    id: 'scroll-hint',
    name: 'ScrollHint',
    family: 'Animations',
    description:
      'Trait discret, en bas de la section qui le contient, qui indique que la page continue : il apparaît après un délai, son repère fait quelques allers puis s’immobilise (jamais de boucle), et il s’efface au premier défilement.',
    component: ScrollHint,
    props: [
      {
        name: 'delay',
        type: 'number',
        default: '1.5',
        description: 'Délai avant l’apparition (s)',
      },
      { name: 'passes', type: 'number', default: '2', description: 'Nombre d’allers du repère' },
    ],
    controls: [
      { key: 'delay', label: 'Délai (s)', type: 'number', initial: 0.5, min: 0, max: 3, step: 0.1 },
      { key: 'passes', label: 'Allers', type: 'number', initial: 2, min: 1, max: 4 },
    ],
    fond: 'violet',
    frame: 'position: relative; height: 12rem',
  },
  {
    id: 'scroll-parallax',
    name: 'ScrollParallax',
    family: 'Animations',
    description:
      'Ce qu’il enveloppe glisse plus lentement que le scroll et s’estompe pendant que sa section quitte l’écran. Seuls `transform` et `opacity` bougent ; aucun effet en mouvement réduit. Faites défiler dans le cadre.',
    component: ScrollParallaxDemo,
    props: [
      {
        name: 'speed',
        type: 'number',
        description:
          'Glissement, en part de la hauteur de la section (`--hero-parallax` par défaut)',
      },
      { name: 'fade', type: 'boolean', default: 'true', description: 'S’estompe en même temps' },
      {
        name: 'until',
        type: 'number',
        default: '1',
        description: 'Part du trajet sur laquelle l’effet se fait',
      },
    ],
    controls: [
      { key: 'speed', label: 'Vitesse', type: 'number', initial: 0.35, min: 0, max: 1, step: 0.05 },
      { key: 'fade', label: 'S’estompe', type: 'boolean', initial: true },
      {
        key: 'until',
        label: 'Part du trajet',
        type: 'number',
        initial: 1,
        min: 0.2,
        max: 1,
        step: 0.1,
      },
    ],
    code: (v) =>
      `<ScrollParallax :speed="${v.speed}"${v.fade ? '' : ' :fade="false"'}${v.until === 1 ? '' : ` :until="${v.until}"`}>…</ScrollParallax>`,
    screen: true,
  },
  {
    id: 'drag-to-snap',
    name: 'DragToSnap',
    family: 'Animations',
    description:
      'Élément à glisser jusqu’à une cible, où il se loge (souris, doigt, ou Entrée et Espace). Relâché hors de portée, il revient. Le composant ne porte que le déplacement : l’apparence vient de la page, par le slot, qui reçoit `dragging` et `placed`.',
    component: DragToSnapDemo,
    props: [
      { name: 'target', type: 'HTMLElement', description: 'L’élément cible' },
      { name: 'reach', type: 'number', default: '40', description: 'Distance de capture (px)' },
      { name: 'label', type: 'string', description: 'Nom accessible du bouton' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Désactivé' },
    ],
    controls: [
      {
        key: 'reach',
        label: 'Portée (px)',
        type: 'number',
        initial: 40,
        min: 10,
        max: 160,
        step: 10,
      },
    ],
    slots: [
      { name: 'défaut', description: 'L’apparence de l’élément ; reçoit `dragging` et `placed`' },
    ],
    code: (v) =>
      `<DragToSnap :target="hole" :reach="${v.reach}" label="Replacer la brique" @near="near = $event" @snap="onSnap" />`,
  },
  {
    id: 'v-reveal',
    name: 'v-reveal',
    family: 'Animations',
    description:
      'Directive d’apparition au scroll : le bloc monte de `--reveal-distance` et apparaît, une seule fois, décalé selon son rang. Seuls les blocs sous la ligne de flottaison sont cachés, et seulement par le script.',
    component: RevealDemo,
    props: [
      {
        name: 'valeur',
        type: 'number',
        default: '0',
        description: 'Rang du bloc : décalage de `--stagger-block` × rang',
      },
    ],
    controls: [
      { key: 'count', label: 'Nombre de blocs', type: 'number', initial: 3, min: 1, max: 6 },
    ],
    code: () => '<div v-reveal="1">…</div>',
  },
  {
    id: 'base-button',
    name: 'BaseButton',
    family: 'Composants',
    description:
      'Bouton ou lien-bouton. Un lien quand il mène quelque part, un bouton quand il agit sur la page. Un seul `primary` par écran.',
    component: BaseButton,
    props: [
      { name: 'variant', type: "'primary' | 'outline'", default: 'outline', description: 'Style' },
      {
        name: 'icon',
        type: "'arrow-right' | 'download' | 'arrow-up-right'",
        description: 'Icône à droite, qui avance au survol dans son sens',
      },
      { name: 'to', type: 'RouteLocationRaw', description: 'Page du site (lien du routeur)' },
      { name: 'href', type: 'string', description: 'Fichier ou site externe (nouvel onglet)' },
      { name: 'download', type: 'boolean', default: 'false', description: 'Télécharge le fichier' },
      {
        name: 'compact',
        type: 'boolean',
        default: 'false',
        description: 'Hauteur minimale (44 px)',
      },
    ],
    controls: [
      { key: 'slot', label: 'Texte', type: 'text', initial: 'Télécharger le CV' },
      {
        key: 'variant',
        label: 'Variante',
        type: 'select',
        initial: 'primary',
        options: ['primary', 'outline'],
      },
      {
        key: 'icon',
        label: 'Icône',
        type: 'select',
        initial: 'download',
        options: ['', 'arrow-right', 'download', 'arrow-up-right'],
      },
      { key: 'href', label: 'Lien', type: 'text', initial: '' },
      { key: 'download', label: 'Téléchargement', type: 'boolean', initial: false },
      { key: 'compact', label: 'Compact', type: 'boolean', initial: false },
    ],
    slots: [{ name: 'défaut', description: 'Le texte du bouton' }],
    states: true,
  },
  {
    id: 'text-link',
    name: 'TextLink',
    family: 'Composants',
    description:
      'Lien texte, toujours souligné. `inline` dans un paragraphe ; `standalone` pour les liens isolés, avec un trait qui se trace au survol. Un lien externe a toujours `arrow-up-right` et s’ouvre dans un nouvel onglet.',
    component: TextLink,
    props: [
      { name: 'variant', type: "'inline' | 'standalone'", default: 'inline', description: 'Style' },
      { name: 'icon', type: 'IconName', description: 'Icône (`standalone`)' },
      { name: 'iconStart', type: 'boolean', default: 'false', description: 'Icône avant le texte' },
      { name: 'to', type: 'RouteLocationRaw', description: 'Page du site' },
      { name: 'href', type: 'string', description: 'Fichier ou site externe' },
      { name: 'download', type: 'boolean', default: 'false', description: 'Télécharge le fichier' },
    ],
    controls: [
      { key: 'slot', label: 'Texte', type: 'text', initial: 'GitHub' },
      {
        key: 'variant',
        label: 'Variante',
        type: 'select',
        initial: 'standalone',
        options: ['inline', 'standalone'],
      },
      {
        key: 'icon',
        label: 'Icône',
        type: 'select',
        initial: '',
        options: ['', ...Object.keys(ICONS)],
      },
      { key: 'iconStart', label: 'Icône avant', type: 'boolean', initial: false },
      { key: 'href', label: 'Lien', type: 'text', initial: 'https://github.com/K0Konut' },
      { key: 'download', label: 'Téléchargement', type: 'boolean', initial: false },
    ],
    slots: [{ name: 'défaut', description: 'Le texte du lien' }],
    states: true,
  },
  {
    id: 'base-tag',
    name: 'BaseTag',
    family: 'Composants',
    description:
      'Étiquette rose (type de projet, d’étape). Une ou deux par carte au plus ; jamais cliquable.',
    component: BaseTag,
    props: [],
    controls: [{ key: 'slot', label: 'Texte', type: 'text', initial: 'projet d’école' }],
    slots: [{ name: 'défaut', description: 'Le texte, en minuscules' }],
  },
  {
    id: 'base-icon',
    name: 'BaseIcon',
    family: 'Composants',
    description:
      'Icône Lucide au contour épais et arrondi, décorative. Le nom accessible se met sur le bouton ou le lien qui la contient.',
    component: BaseIcon,
    props: [
      { name: 'name', type: 'IconName', description: 'L’icône' },
      { name: 'size', type: "'sm' | 'md'", default: 'sm', description: '18 ou 24 px' },
    ],
    controls: [
      {
        key: 'name',
        label: 'Icône',
        type: 'select',
        initial: 'arrow-right',
        options: Object.keys(ICONS),
      },
      { key: 'size', label: 'Taille', type: 'select', initial: 'md', options: ['sm', 'md'] },
    ],
  },
  {
    id: 'copy-button',
    name: 'CopyButton',
    family: 'Composants',
    description:
      'Texte à copier en un clic, avec confirmation annoncée aux lecteurs d’écran. Si le presse-papiers est refusé, le texte est sélectionné.',
    component: CopyButton,
    props: [
      { name: 'value', type: 'string', description: 'Le texte affiché et copié' },
      { name: 'small', type: 'boolean', default: 'false', description: 'Texte en taille courante' },
    ],
    controls: [
      { key: 'value', label: 'Texte', type: 'text', initial: 'costa.maskulov@exemple.fr' },
      { key: 'small', label: 'Petit', type: 'boolean', initial: false },
    ],
    states: true,
  },
  {
    id: 'poster-card',
    name: 'PosterCard',
    family: 'Composants',
    description:
      'Carte « affiche » : la surface d’un fond posée sur une autre, inclinée sur bureau, qui se soulève et se redresse au survol. Plate, sans ombre ; droite et immobile en mouvement réduit.',
    component: PosterCard,
    props: [
      { name: 'fond', type: 'Fond', default: 'nuit', description: 'Fond de la carte' },
      {
        name: 'tilt',
        type: 'number',
        default: '0',
        description: 'Inclinaison, en multiple de `--poster-tilt` (à partir de 1024 px)',
      },
      {
        name: 'lift',
        type: 'boolean',
        default: 'true',
        description: 'Se soulève et se redresse au survol ou au focus',
      },
      { name: 'as', type: 'string', default: 'div', description: 'Balise (`article`…)' },
    ],
    controls: [
      {
        key: 'slot',
        label: 'Contenu',
        type: 'text',
        initial: 'Une affiche collée sur la section.',
      },
      { key: 'fond', label: 'Fond', type: 'select', initial: 'nuit', options: FONDS },
      {
        key: 'tilt',
        label: 'Inclinaison',
        type: 'number',
        initial: 1,
        min: -2,
        max: 2,
        step: 0.25,
      },
      { key: 'lift', label: 'Se soulève', type: 'boolean', initial: true },
      { key: 'as', label: 'Balise', type: 'select', initial: 'div', options: ['div', 'article'] },
    ],
    slots: [{ name: 'défaut', description: 'Le contenu' }],
    fond: 'lime',
    frame: 'max-width: 24rem',
    states: true,
  },
  {
    id: 'device-frame',
    name: 'DeviceFrame',
    family: 'Composants',
    description:
      'Cadre navigateur ou téléphone autour d’une capture, à proportions fixes, qui monte du bas de sa zone. Sans capture, un écran provisoire.',
    component: DeviceFrame,
    props: [
      { name: 'device', type: "'browser' | 'phone'", description: 'Appareil' },
      { name: 'src', type: 'string', description: 'Image (1440 × 900 ou 390 × 844)' },
      { name: 'alt', type: 'string', description: 'Description de l’écran (vide dans une carte)' },
      { name: 'label', type: 'string', description: 'Texte de l’écran provisoire' },
      { name: 'stage', type: 'string', description: 'Teinte du fond de capture' },
    ],
    controls: [
      {
        key: 'device',
        label: 'Appareil',
        type: 'select',
        initial: 'browser',
        options: ['browser', 'phone'],
      },
      { key: 'capture', label: 'Capture', type: 'boolean', initial: true },
      { key: 'label', label: 'Écran provisoire', type: 'text', initial: 'Mangas & BD' },
      {
        key: 'stage',
        label: 'Fond de capture',
        type: 'select',
        initial: 'défaut',
        options: Object.keys(STAGES),
      },
    ],
    bind: (v) => ({
      device: v.device,
      src: v.capture ? capture : undefined,
      label: v.label,
      stage: STAGES[String(v.stage)],
    }),
    code: (v) =>
      `<DeviceFrame device="${v.device}"${v.capture ? ' :src="capture"' : ''}${attr('label', v.label)}${attr('stage', STAGES[String(v.stage)])} />`,
    frame: 'max-width: 32rem',
  },
  {
    id: 'project-card',
    name: 'ProjectCard',
    family: 'Composants',
    description:
      'Carte de projet : capture, étiquettes, titre, phrase, stack. Un seul lien, sur le titre, étendu à toute la carte.',
    component: ProjectCard,
    props: [{ name: 'project', type: 'ProjectSummary', description: 'Le résumé du projet' }],
    controls: [
      { key: 'title', label: 'Titre', type: 'text', initial: 'Ce portfolio' },
      {
        key: 'description',
        label: 'Phrase',
        type: 'text',
        initial: 'Ce site, de la méthode au code.',
      },
      { key: 'tags', label: 'Étiquettes (virgules)', type: 'text', initial: 'projet perso' },
      {
        key: 'stack',
        label: 'Stack (virgules)',
        type: 'text',
        initial: 'Vue 3, TypeScript, Vite, Docker',
      },
      {
        key: 'device',
        label: 'Appareil',
        type: 'select',
        initial: 'browser',
        options: ['browser', 'phone'],
      },
      { key: 'capture', label: 'Capture', type: 'boolean', initial: true },
    ],
    bind: (v) => ({
      project: {
        slug: 'ce-portfolio',
        title: v.title,
        description: v.description,
        tags: list(v.tags),
        stack: list(v.stack),
        capture: { device: v.device, src: v.capture ? capture : undefined, label: v.title },
      },
    }),
    code: () => '<ProjectCard :project="project" />',
    frame: 'max-width: 26rem',
    states: true,
  },
  {
    id: 'dot-list',
    name: 'DotList',
    family: 'Composants',
    description:
      'Liste courte à pastilles ; les lignes mises en avant ont une pastille violet vif cernée de crème. La couleur porte une information : la page affiche une légende.',
    component: DotList,
    props: [{ name: 'items', type: '{ name, highlight? }[]', description: 'Les lignes' }],
    controls: [
      {
        key: 'names',
        label: 'Lignes (virgules)',
        type: 'text',
        initial: 'Vue.js, Nuxt, TypeScript, Docker',
      },
      {
        key: 'highlight',
        label: 'Mises en avant (virgules)',
        type: 'text',
        initial: 'Vue.js, TypeScript',
      },
    ],
    bind: (v) => ({
      items: list(v.names).map((name) => ({ name, highlight: list(v.highlight).includes(name) })),
    }),
    code: () => '<DotList :items="items" />',
  },
  {
    id: 'definition-list',
    name: 'DefinitionList',
    family: 'Composants',
    description:
      'Fiche d’informations : un libellé et une valeur par ligne, et en dessous une précision facultative.',
    component: DefinitionList,
    props: [{ name: 'items', type: '{ label, value, note? }[]', description: 'Les lignes' }],
    controls: [
      { key: 'value', label: 'Valeur de la dernière ligne', type: 'text', initial: 'Code privé' },
      {
        key: 'note',
        label: 'Précision',
        type: 'text',
        initial: 'Le code appartient au CNAM ; l’étude de cas montre le process.',
      },
    ],
    bind: (v) => ({
      items: [
        { label: 'Type', value: 'Stage' },
        { label: 'Rôle', value: 'Développeur full-stack' },
        { label: 'Stack', value: 'Vue 3 · TypeScript · Java' },
        { label: 'Code', value: v.value, note: v.note || undefined },
      ],
    }),
    code: () => '<DefinitionList :items="items" />',
    frame: 'max-width: 32rem',
  },
  {
    id: 'stat-block',
    name: 'StatBlock',
    family: 'Composants',
    description:
      'Résultat chiffré : le chiffre en grand, son libellé, et pour une comparaison deux barres qui se remplissent une fois à l’arrivée à l’écran.',
    component: StatBlock,
    props: [
      { name: 'value', type: 'string', description: 'Le chiffre' },
      { name: 'label', type: 'string', description: 'Son libellé' },
      { name: 'before', type: 'number', description: 'Valeur avant (avec `after`, les barres)' },
      { name: 'after', type: 'number', description: 'Valeur après' },
      { name: 'index', type: 'number', description: 'Rang, pour le décalage d’apparition' },
    ],
    controls: [
      { key: 'value', label: 'Chiffre', type: 'text', initial: '6' },
      {
        key: 'label',
        label: 'Libellé',
        type: 'text',
        initial: 'fonds de section, contre un seul avant',
      },
      { key: 'compare', label: 'Avant / après', type: 'boolean', initial: true },
      { key: 'before', label: 'Avant', type: 'number', initial: 1, min: 0, max: 2000 },
      { key: 'after', label: 'Après', type: 'number', initial: 6, min: 0, max: 2000 },
    ],
    bind: (v) => ({
      value: v.value,
      label: v.label,
      before: v.compare ? v.before : undefined,
      after: v.compare ? v.after : undefined,
    }),
    code: (v) =>
      `<StatBlock${attr('value', v.value)}${attr('label', v.label)}${v.compare ? ` :before="${v.before}" :after="${v.after}"` : ''} />`,
    frame: 'max-width: 20rem',
  },
  {
    id: 'base-timeline',
    name: 'BaseTimeline',
    family: 'Composants',
    description:
      'Frise d’étapes, de la plus ancienne à la plus récente : centrée alternée sur bureau, fil à gauche ailleurs. Avec `draw`, un second fil se trace au rythme du scroll et remplit les repères qu’il atteint ; sinon, et en mouvement réduit, tout est tracé.',
    component: BaseTimeline,
    props: [
      {
        name: 'items',
        type: '{ tag?, date?, title, subtitle?, text?, link? }[]',
        description: 'Les étapes ; `link` : `{ to, label }`',
      },
      {
        name: 'alternate',
        type: 'boolean',
        default: 'true',
        description: 'Centrée alternée à partir de 1024 px',
      },
      { name: 'draw', type: 'boolean', default: 'true', description: 'Fil tracé au scroll' },
    ],
    controls: [
      { key: 'count', label: 'Étapes', type: 'number', initial: 4, min: 1, max: 4 },
      { key: 'alternate', label: 'Alternée (bureau)', type: 'boolean', initial: true },
      { key: 'draw', label: 'Tracée au scroll', type: 'boolean', initial: true },
    ],
    slots: [{ name: 'item', description: 'Le contenu d’une étape ; reçoit `item` et `index`' }],
    bind: (v) => ({
      items: TIMELINES[Math.min(Math.max(Number(v.count), 1), TIMELINES.length) - 1],
      alternate: v.alternate,
      draw: v.draw,
    }),
    code: (v) =>
      `<BaseTimeline :items="items"${v.alternate ? '' : ' :alternate="false"'}${v.draw ? '' : ' :draw="false"'} />`,
    screen: true,
  },
  {
    id: 'cycle-steps',
    name: 'CycleSteps',
    family: 'Composants',
    description:
      'Étapes d’un cycle : anneau numéroté sur bureau, avec un arc fléché de l’une à l’autre et le retour en pointillés ; frise verticale qui remonte à la première sur mobile et tablette. Les étapes apparaissent une à une.',
    component: CycleStepsDemo,
    props: [{ name: 'steps', type: '{ title, text }[]', description: 'Les étapes, dans l’ordre' }],
    controls: [
      { key: 'count', label: 'Étapes', type: 'number', initial: 6, min: 2, max: 6, step: 2 },
      {
        key: 'center',
        label: 'Phrase du retour (slot)',
        type: 'text',
        initial: 'Les retours relancent un tour.',
      },
    ],
    slots: [{ name: 'center', description: 'La phrase du retour, au centre de l’anneau' }],
    code: (v) =>
      v.center
        ? `<CycleSteps :steps="steps">\n  <template #center>${v.center}</template>\n</CycleSteps>`
        : '<CycleSteps :steps="steps" />',
    bind: (v) => ({ steps: STEPS.slice(0, Number(v.count)), center: v.center }),
    fond: 'vif',
  },
  {
    id: 'numbered-steps',
    name: 'NumberedSteps',
    family: 'Composants',
    description:
      'Étapes détaillées : le numéro en grand, le nom et sa phrase ; un filet relie les numéros. Les étapes apparaissent une à une.',
    component: NumberedSteps,
    props: [{ name: 'steps', type: '{ title, text }[]', description: 'Les étapes, dans l’ordre' }],
    controls: [{ key: 'count', label: 'Étapes', type: 'number', initial: 4, min: 1, max: 6 }],
    bind: (v) => ({ steps: STEPS.slice(0, Number(v.count)) }),
    code: () => '<NumberedSteps :steps="steps" />',
  },
  {
    id: 'sticky-toc',
    name: 'StickyToc',
    family: 'Composants',
    description:
      'Sommaire collant d’une page longue, sur bureau seulement : il suit le bloc en cours (le dernier dont le haut a passé le premier tiers de l’écran). Faites défiler dans le cadre.',
    component: StickyTocDemo,
    props: [
      { name: 'items', type: '{ id, label }[]', description: 'Les blocs de la page' },
      {
        name: 'label',
        type: 'string',
        default: 'Sommaire',
        description: 'Nom accessible de la navigation',
      },
    ],
    controls: [{ key: 'count', label: 'Blocs', type: 'number', initial: 3, min: 2, max: 6 }],
    code: () => '<StickyToc :items="blocks" />',
    screen: true,
  },
  {
    id: 'next-link',
    name: 'NextLink',
    family: 'Composants',
    description:
      'Grand lien vers la suite : un libellé, le titre en grand et une flèche, qui avance au survol pendant que le titre se souligne.',
    component: NextLink,
    props: [
      { name: 'label', type: 'string', description: 'Le libellé (« Projet suivant »)' },
      { name: 'title', type: 'string', description: 'Le titre' },
      { name: 'to', type: 'RouteLocationRaw', description: 'La page' },
    ],
    controls: [
      { key: 'label', label: 'Libellé', type: 'text', initial: 'Projet suivant' },
      { key: 'title', label: 'Titre', type: 'text', initial: 'Stage au CNAM' },
    ],
    bind: (v) => ({ ...v, to: '/fr/projets/stage-cnam' }),
    code: (v) => `<NextLink${attr('label', v.label)}${attr('title', v.title)} :to="next" />`,
    fond: 'rose',
    states: true,
  },
  {
    id: 'page-section',
    name: 'PageSection',
    family: 'Mise en page',
    description:
      'Section de page : fond (qui réaffecte les rôles de couleur), conteneur, titre `h2` et introduction. Deux sections voisines n’ont jamais le même fond.',
    component: PageSection,
    props: [
      { name: 'fond', type: 'Fond', default: 'nuit', description: 'Fond de la section' },
      { name: 'title', type: 'string', description: 'Le titre (`h2`)' },
      {
        name: 'labelledby',
        type: 'string',
        description: 'Identifiant du titre, s’il est dans le contenu',
      },
    ],
    controls: [
      { key: 'fond', label: 'Fond', type: 'select', initial: 'creme', options: FONDS },
      { key: 'title', label: 'Titre', type: 'text', initial: 'Qui je suis' },
      { key: 'slot', label: 'Contenu', type: 'text', initial: 'Le contenu de la section.' },
    ],
    slots: [
      { name: 'défaut', description: 'Le contenu' },
      { name: 'intro', description: 'La phrase sous le titre' },
    ],
  },
  {
    id: 'page-intro',
    screen: true,
    name: 'PageIntro',
    family: 'Mise en page',
    description:
      'Haut de page : `h1`, une phrase, des actions. Centré pour Contact et la 404, plein écran en option.',
    component: PageIntro,
    props: [
      { name: 'title', type: 'string', description: 'Le titre (`h1`)' },
      { name: 'fond', type: 'Fond', default: 'violet', description: 'Fond' },
      { name: 'center', type: 'boolean', default: 'false', description: 'Contenu centré' },
      {
        name: 'full',
        type: 'boolean',
        default: 'false',
        description: 'Toute la hauteur de l’écran',
      },
    ],
    controls: [
      { key: 'title', label: 'Titre', type: 'text', initial: 'Projets' },
      {
        key: 'slot',
        label: 'Phrase',
        type: 'text',
        initial: 'Tout ce que j’ai construit, du plus récent au plus ancien.',
      },
      { key: 'fond', label: 'Fond', type: 'select', initial: 'violet', options: FONDS },
      { key: 'center', label: 'Centré', type: 'boolean', initial: false },
      { key: 'full', label: 'Plein écran', type: 'boolean', initial: false },
    ],
    slots: [
      { name: 'défaut', description: 'La phrase' },
      { name: 'before', description: 'Au-dessus du titre' },
      { name: 'actions', description: 'Les boutons' },
      { name: 'after', description: 'Sous la phrase' },
    ],
  },
  {
    id: 'app-header',
    name: 'AppHeader',
    family: 'Site',
    description:
      'En-tête fixe qui « pend » au-dessus du contenu : nom, navigation, langue. Sous 768 px, un bouton « Menu » ouvre `MobileMenu`.',
    component: AppHeader,
    props: [],
    controls: [],
    frame: 'height: 26rem',
  },
  {
    id: 'mobile-menu',
    name: 'MobileMenu',
    family: 'Site',
    description:
      'Menu plein écran sur mobile, sur l’élément `<dialog>` natif : le reste de la page devient inerte, Échap ferme, le focus revient au bouton.',
    component: MobileMenuDemo,
    props: [{ name: 'v-model', type: 'boolean', description: 'Ouvert ou fermé' }],
    controls: [],
    code: () => '<MobileMenu v-model="menuOpen" />',
    frame: 'height: 34rem',
  },
  {
    id: 'lang-switch',
    name: 'LangSwitch',
    family: 'Site',
    description:
      'Bascule FR / EN vers la page équivalente dans l’autre langue ; depuis une adresse inconnue, vers l’accueil.',
    component: LangSwitch,
    props: [
      {
        name: 'variant',
        type: "'header' | 'menu'",
        description: 'Dans l’en-tête ou dans le menu mobile',
      },
    ],
    controls: [
      {
        key: 'variant',
        label: 'Variante',
        type: 'select',
        initial: 'menu',
        options: ['header', 'menu'],
      },
    ],
    fond: 'violet',
  },
  {
    id: 'app-footer',
    name: 'AppFooter',
    family: 'Site',
    description:
      'Pied de page de toutes les pages : CV, contact, liens du site. Un repère calme, sans animation.',
    component: AppFooter,
    props: [],
    controls: [],
  },
  {
    id: 'skip-link',
    name: 'SkipLink',
    family: 'Site',
    description:
      '« Aller au contenu », premier élément focusable de chaque page : hors de l’écran au repos, il glisse en haut à gauche au focus.',
    component: SkipLinkDemo,
    props: [],
    controls: [],
    code: () => '<SkipLink />',
    frame: 'height: 6rem',
  },
  {
    id: 'contact-links',
    name: 'ContactLinks',
    family: 'Site',
    description:
      'Les coordonnées, au même format partout : l’adresse à copier, puis le CV de la langue de la page, LinkedIn et GitHub. Valeurs lues dans `SITE`.',
    component: ContactLinks,
    props: [
      {
        name: 'cvLabel',
        type: 'string',
        default: 'Télécharger le CV',
        description: 'Texte du bouton du CV',
      },
      { name: 'addressLabel', type: 'string', description: 'Libellé au-dessus de l’adresse' },
    ],
    controls: [
      { key: 'cvLabel', label: 'Bouton du CV', type: 'text', initial: 'Télécharger le CV' },
      { key: 'addressLabel', label: 'Libellé de l’adresse', type: 'text', initial: 'Mon adresse' },
    ],
    bind: (v) => ({ cvLabel: v.cvLabel || undefined, addressLabel: v.addressLabel || undefined }),
  },
]

/** Les pages de tokens, et les démos des sections en attente de refonte (étape 2 bis), chargées à l'ouverture */
const page = (load: () => Promise<{ default: Component }>) => defineAsyncComponent(load)
export const TOKEN_PAGES = [
  { id: 'couleurs', name: 'Couleurs', component: page(() => import('./DsColors.vue')) },
  {
    id: 'fonds-de-section',
    name: 'Fonds de section',
    component: page(() => import('./DsBackgrounds.vue')),
  },
  { id: 'typographie', name: 'Typographie', component: page(() => import('./DsTypography.vue')) },
  { id: 'espacements', name: 'Espacements', component: page(() => import('./DsSpacing.vue')) },
  { id: 'motion', name: 'Motion', component: page(() => import('./DsMotion.vue')) },
  { id: 'icones', name: 'Icônes', component: page(() => import('./DsIcons.vue')) },
]
export const LEGACY_PAGES = [
  {
    id: 'ancien-mise-en-page',
    name: 'En-tête, Parlons-en',
    component: page(() => import('./DsComponentsLayout.vue')),
  },
  {
    id: 'ancien-accueil',
    name: 'Accueil',
    component: page(() => import('./DsComponentsHome.vue')),
  },
  {
    id: 'ancien-projets',
    name: 'Projets et étude de cas',
    component: page(() => import('./DsComponentsProjects.vue')),
  },
  {
    id: 'ancien-a-propos',
    name: 'À propos, Contact, 404',
    component: page(() => import('./DsComponentsAbout.vue')),
  },
]

export function initialValues(entry: Entry): Values {
  return Object.fromEntries(entry.controls.map((c) => [c.key, c.initial]))
}

/** Options passées au composant : le choix « aucune » d'une liste (valeur vide) retiré, le slot à part */
export function propsOf(entry: Entry, values: Values): Record<string, unknown> {
  const none = new Set(entry.controls.filter((c) => c.type === 'select').map((c) => c.key))
  const raw = entry.bind?.(values) ?? values
  return Object.fromEntries(
    Object.entries(raw).filter(
      ([key, value]) => key !== 'slot' && value !== undefined && !(value === '' && none.has(key)),
    ),
  )
}

/** Valeur dans un attribut entre guillemets, ou dans une chaîne JavaScript entre apostrophes */
export const quote = (value: unknown) => String(value).replace(/"/g, '&quot;')
export const js = (value: unknown) => String(value).replace(/\\/g, '\\\\').replace(/'/g, "\\'")

/** Code d'appel avec les réglages en cours ; seules les options qui changent la valeur par défaut */
export function codeOf(entry: Entry, values: Values): string {
  if (entry.code) return entry.code(values)
  const kebab = (name: string) => name.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)
  const attrs = entry.props.flatMap(({ name, default: fallback }) => {
    const value = values[name]
    if (value === undefined || value === '' || value === false || String(value) === fallback)
      return []
    if (value === true) return [kebab(name)]
    return typeof value === 'number'
      ? [`:${kebab(name)}="${value}"`]
      : [`${kebab(name)}="${quote(value)}"`]
  })
  const open = `<${entry.name}${attrs.map((a) => ` ${a}`).join('')}`
  return values.slot ? `${open}>${values.slot}</${entry.name}>` : `${open} />`
}

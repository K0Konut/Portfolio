/* Icônes Lucide (licence ISC), copiées en local : on n'embarque que celles de la V1 (design system § Icon).
   Logos GitHub et LinkedIn : tracés Lucide actuels, dans le même style. */
type Shape = { tag: 'path' | 'rect' | 'circle'; attrs: Record<string, string> }

const p = (d: string): Shape => ({ tag: 'path', attrs: { d } })

export const ICONS = {
  'arrow-right': [p('M5 12h14'), p('m12 5 7 7-7 7')],
  'arrow-left': [p('m12 19-7-7 7-7'), p('M19 12H5')],
  'arrow-up-right': [p('M7 7h10v10'), p('M7 17 17 7')],
  download: [p('M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4'), p('m7 10 5 5 5-5'), p('M12 15V3')],
  copy: [
    { tag: 'rect', attrs: { width: '14', height: '14', x: '8', y: '8', rx: '2', ry: '2' } },
    p('M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2'),
  ],
  check: [p('M20 6 9 17l-5-5')],
  menu: [p('M4 6h16'), p('M4 12h16'), p('M4 18h16')],
  x: [p('M18 6 6 18'), p('m6 6 12 12')],
  mail: [
    { tag: 'rect', attrs: { width: '20', height: '16', x: '2', y: '4', rx: '2' } },
    p('m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7'),
  ],
  github: [
    p(
      'M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4',
    ),
    p('M9 18c-4.51 2-5-2-7-2'),
  ],
  linkedin: [
    p('M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z'),
    { tag: 'rect', attrs: { width: '4', height: '12', x: '2', y: '9' } },
    { tag: 'circle', attrs: { cx: '4', cy: '4', r: '2' } },
  ],
} satisfies Record<string, Shape[]>

export type IconName = keyof typeof ICONS

/* Bord organique d'une SectionWave (design system § SectionWave) : trois ondulations superposées,
   tirées au sort à partir d'une graine. Même graine, même vague, à n'importe quelle largeur. */

/** Générateur pseudo-aléatoire déterministe (mulberry32) */
function random(seed: number) {
  let a = seed
  return () => {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Largeur de référence, servie dans le HTML pré-rendu avant la mesure de l'écran */
export const REFERENCE_WIDTH = 1440

export function wavePath(
  seed: number,
  width: number,
): { d: string; width: number; height: number } {
  const W = Math.max(1, Math.round(width))
  const r = random(seed)
  // Amplitude de 12 à 21 px, réduite jusqu'à 60 % sur les écrans étroits
  const amp = (12 + r() * 9) * Math.min(1, Math.max(0.6, W / 1000))
  const y0 = amp * 1.6 + 6
  const height = Math.ceil(3.2 * amp + 14)
  const waves = [
    [300 + r() * 260, 0.6 + r() * 0.4],
    [130 + r() * 90, 0.22 + r() * 0.18],
    [60 + r() * 30, 0.04 + r() * 0.05],
  ].map(([length = 1, share = 0]) => ({ length, a: amp * share, phase: r() * 6.283 }))

  const points: [number, number][] = []
  const step = Math.max(8, W / 120)
  for (let x = 0; x <= W + 0.1; x += step) {
    let y = y0
    for (const w of waves) y += w.a * Math.sin((6.283 * x) / w.length + w.phase)
    points.push([x, y])
  }
  points.reverse()

  // Courbe lissée (Catmull-Rom vers Bézier) de droite à gauche, sous le bord haut plein
  const f = (n: number) => n.toFixed(1)
  let d = `M0,0H${W}V${f(points[0]?.[1] ?? y0)}`
  for (let i = 0; i < points.length - 1; i++) {
    const b = points[i]!
    const c = points[i + 1]!
    const a = points[i - 1] ?? b
    const e = points[i + 2] ?? c
    d += `C${f(b[0] + (c[0] - a[0]) / 6)},${f(b[1] + (c[1] - a[1]) / 6)} ${f(c[0] - (e[0] - b[0]) / 6)},${f(c[1] - (e[1] - b[1]) / 6)} ${f(c[0])},${f(c[1])}`
  }
  return { d: `${d}Z`, width: W, height }
}

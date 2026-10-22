import { reducedMotion } from './motion'

/* Fond topographique de la section d'accueil (design system § TopoBackground) : adaptation du composant
   « Topography » (ogl) en WebGL 2 natif, sans bibliothèque. Pas de suivi du curseur ; lignes estompées
   derrière le texte ; image fixe en mouvement réduit ; boucle en pause hors de l'écran ou onglet caché.
   Le mouvement est très lent : 30 images par seconde suffisent. */

const MORPH = 3
const SPEED = 0.25
const MORPH_SPEED = 0.05
const CONTROLS = [1, -2, 3, -4, 9, -8, 7, -6, 5, 2, 5, -5, -1, -3, 8, 9]
/** Vitesse propre de chaque point de contrôle (constante) */
const RATES = CONTROLS.map((i) => SPEED * Math.sin(i * MORPH_SPEED))
/** Instant de référence (secondes) de l'image fixe */
const STILL_TIME = 12
const FRAME_MS = 1000 / 30
/** Teinte intermédiaire entre le violet vif et le rose (DA : « violet électrique qui tire vers le rose ») */
const MID = '#6f63ff'

const VERTEX = '#version 300 es\nin vec2 position;void main(){gl_Position=vec4(position,0.,1.);}'
const fragment = (low: string, mid: string, high: string) => `#version 300 es
precision highp float;
const float MORPH=${MORPH.toFixed(1)},BANDS=1.4,THICKNESS=.014,GLOW=.4,CONTRAST=3.,OPACITY=.55;
const vec3 LOW=vec3(${low}),MID=vec3(${mid}),HIGH=vec3(${high});
uniform vec2 iResolution;uniform vec4 uCtrl[4];out vec4 fragColor;
float bez(float t,vec4 c){float w=6.2831853*t;return .5*(c.x*sin(w)+c.y*cos(w)+c.z*sin(2.*w)+c.w*cos(2.*w));}
float field(vec2 uv){vec2 a=vec2(bez(uv.x,uCtrl[0]),bez(uv.x,uCtrl[1]));vec2 b=vec2(bez(uv.y,uCtrl[2]),bez(uv.y,uCtrl[3]));return distance(a,b);}
vec3 elev(float e){vec3 c=mix(LOW,MID,smoothstep(0.,.5,e));return mix(c,HIGH,smoothstep(.5,1.,e));}
void main(){vec2 uv=gl_FragCoord.xy/iResolution.xy;float fv=field(uv);float f=fv*BANDS;float fr=fract(f);float ld=min(fr,1.-fr);
float aa=fwidth(f)+.0001;float mask=1.-smoothstep(THICKNESS-aa,THICKNESS+aa,ld);
float glow=1.-smoothstep(THICKNESS,THICKNESS+GLOW*.5+aa,ld);
float e=clamp(fv/(MORPH*2.5+.001),0.,1.);vec3 col=elev(e);
float cov=pow(clamp(mask+glow*.55,0.,1.),CONTRAST);
vec2 d=(uv-vec2(.5,.52))*vec2(iResolution.x/iResolution.y,1.);float center=smoothstep(.12,.62,length(d*vec2(.55,1.1)));
float a=cov*OPACITY*center;fragColor=vec4(col*a,a);}`

/** Couleur CSS (#rrggbb) en vec3 GLSL */
function vec3(hex: string) {
  const n = parseInt(hex.trim().slice(1), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((c) => (c / 255).toFixed(3)).join(',')
}

/** Dessine le fond dans `box` ; renvoie la fonction d'arrêt, ou `undefined` sans WebGL 2 (le fond violet reste). */
export function startTopography(box: HTMLElement): (() => void) | undefined {
  const canvas = document.createElement('canvas')
  const gl = canvas.getContext('webgl2', {
    alpha: true,
    premultipliedAlpha: true,
    antialias: false,
  })
  if (!gl) return undefined

  // Teintes lues dans les tokens : violet vif en bas, rose sur les hauteurs
  const css = getComputedStyle(document.documentElement)
  const program = gl.createProgram()
  for (const [type, source] of [
    [gl.VERTEX_SHADER, VERTEX],
    [
      gl.FRAGMENT_SHADER,
      fragment(
        vec3(css.getPropertyValue('--violet-500')),
        vec3(MID),
        vec3(css.getPropertyValue('--pink-500')),
      ),
    ],
  ] as const) {
    const shader = gl.createShader(type)!
    gl.shaderSource(shader, source)
    gl.compileShader(shader)
    gl.attachShader(program, shader)
  }
  gl.linkProgram(program)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return undefined
  gl.useProgram(program)

  // Un triangle qui couvre tout l'écran
  const buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
  const position = gl.getAttribLocation(program, 'position')
  gl.enableVertexAttribArray(position)
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)
  gl.enable(gl.BLEND)
  gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)
  gl.clearColor(0, 0, 0, 0)
  const controls = gl.getUniformLocation(program, 'uCtrl')
  const resolution = gl.getUniformLocation(program, 'iResolution')
  const values = new Float32Array(16)

  let time = STILL_TIME
  const draw = () => {
    for (let i = 0; i < 16; i++) values[i] = MORPH * Math.sin(time * RATES[i]! + CONTROLS[i]!)
    gl.uniform4fv(controls, values)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.drawArrays(gl.TRIANGLES, 0, 3)
  }

  const reduced = reducedMotion()
  let frame = 0
  let visible = false
  let origin = 0
  let previous = 0
  const loop = (now: number) => {
    frame = requestAnimationFrame(loop)
    if (now - previous < FRAME_MS) return
    previous = now
    time = (now - origin) / 1000
    draw()
  }
  // Une seule règle pour tourner ou s'arrêter
  const sync = () => {
    if (reduced.matches || !visible || document.hidden) {
      cancelAnimationFrame(frame)
      frame = 0
    } else if (!frame) {
      frame = requestAnimationFrame((now) => {
        origin = now - time * 1000
        loop(now)
      })
    }
  }

  box.appendChild(canvas)
  const sizes = new ResizeObserver(([entry]) => {
    if (!entry) return
    const dpr = Math.min(devicePixelRatio || 1, 1.5)
    const width = Math.max(1, Math.floor(entry.contentRect.width * dpr))
    const height = Math.max(1, Math.floor(entry.contentRect.height * dpr))
    if (width === canvas.width && height === canvas.height) return
    canvas.width = width
    canvas.height = height
    gl.viewport(0, 0, width, height)
    gl.uniform2f(resolution, width, height)
    draw()
  })
  sizes.observe(box)
  const onScreen = new IntersectionObserver(([entry]) => {
    visible = !!entry?.isIntersecting
    sync()
  })
  onScreen.observe(box)
  document.addEventListener('visibilitychange', sync)
  reduced.addEventListener('change', sync)

  return () => {
    visible = false
    sync()
    sizes.disconnect()
    onScreen.disconnect()
    document.removeEventListener('visibilitychange', sync)
    reduced.removeEventListener('change', sync)
    gl.deleteProgram(program)
    gl.deleteBuffer(buffer)
    gl.getExtension('WEBGL_lose_context')?.loseContext()
    canvas.remove()
  }
}

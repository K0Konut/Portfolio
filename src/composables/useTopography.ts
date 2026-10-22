/* Fond topographique de la section d'accueil (design system § TopoBackground) : adaptation du composant
   « Topography » (ogl) en WebGL 2 natif, sans bibliothèque. Pas de suivi du curseur ; lignes estompées
   derrière le texte ; image fixe en mouvement réduit ; boucle en pause hors de l'écran ou onglet caché. */

/** Teinte retenue : violet électrique qui tire vers le rose sur les hauteurs */
const PALETTE = { low: '#4b3cff', mid: '#6f63ff', high: '#ff6bd6', opacity: 0.55 }
const MORPH = 3
const SPEED = 0.25
const MORPH_SPEED = 0.05
const CONTROLS = [
  [1, -2, 3, -4],
  [9, -8, 7, -6],
  [5, 2, 5, -5],
  [-1, -3, 8, 9],
]
/** Instant de référence (secondes) de l'image fixe */
const STILL_TIME = 12

const VERTEX = '#version 300 es\nin vec2 position;void main(){gl_Position=vec4(position,0.,1.);}'
const FRAGMENT = `#version 300 es
precision highp float;
uniform vec2 iResolution;uniform float uMorphAmount,uBands,uThickness,uGlow,uContrast,uOpacity,uFade;
uniform vec3 uLow,uMid,uHigh;uniform vec4 uCtrlA,uCtrlB,uCtrlC,uCtrlD;out vec4 fragColor;
float bez(float t,vec4 c){float w=6.2831853*t;return .5*(c.x*sin(w)+c.y*cos(w)+c.z*sin(2.*w)+c.w*cos(2.*w));}
float field(vec2 uv){vec2 a=vec2(bez(uv.x,uCtrlA),bez(uv.x,uCtrlB));vec2 b=vec2(bez(uv.y,uCtrlC),bez(uv.y,uCtrlD));return distance(a,b);}
vec3 elev(float e){vec3 c=mix(uLow,uMid,smoothstep(0.,.5,e));return mix(c,uHigh,smoothstep(.5,1.,e));}
void main(){vec2 uv=gl_FragCoord.xy/iResolution.xy;float fv=field(uv);float f=fv*uBands;float fr=fract(f);float ld=min(fr,1.-fr);
float aa=fwidth(f)+.0001;float mask=1.-smoothstep(uThickness-aa,uThickness+aa,ld);
float glow=(1.-smoothstep(uThickness,uThickness+uGlow*.5+aa,ld))*step(.0001,uGlow);
float e=clamp(fv/(uMorphAmount*2.5+.001),0.,1.);vec3 col=elev(e);
float cov=pow(clamp(mask+glow*.55,0.,1.),max(uContrast,.001));
vec2 d=(uv-vec2(.5,.52))*vec2(iResolution.x/iResolution.y,1.);float center=mix(1.,smoothstep(.12,.62,length(d*vec2(.55,1.1))),uFade);
float a=cov*uOpacity*center;fragColor=vec4(col*a,a);}`

function rgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16)
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255]
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

  const shader = (type: number, source: string) => {
    const s = gl.createShader(type)!
    gl.shaderSource(s, source)
    gl.compileShader(s)
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) ?? '')
    return s
  }
  const program = gl.createProgram()
  gl.attachShader(program, shader(gl.VERTEX_SHADER, VERTEX))
  gl.attachShader(program, shader(gl.FRAGMENT_SHADER, FRAGMENT))
  gl.linkProgram(program)
  gl.useProgram(program)

  // Un triangle qui couvre tout l'écran
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
  const position = gl.getAttribLocation(program, 'position')
  gl.enableVertexAttribArray(position)
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)
  gl.enable(gl.BLEND)
  gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)
  gl.clearColor(0, 0, 0, 0)

  const u = (name: string) => gl.getUniformLocation(program, name)
  gl.uniform1f(u('uMorphAmount'), MORPH)
  gl.uniform1f(u('uBands'), 1.4)
  gl.uniform1f(u('uThickness'), 0.014)
  gl.uniform1f(u('uGlow'), 0.4)
  gl.uniform1f(u('uContrast'), 3)
  gl.uniform1f(u('uFade'), 1)
  gl.uniform1f(u('uOpacity'), PALETTE.opacity)
  gl.uniform3fv(u('uLow'), rgb(PALETTE.low))
  gl.uniform3fv(u('uMid'), rgb(PALETTE.mid))
  gl.uniform3fv(u('uHigh'), rgb(PALETTE.high))
  const controls = ['uCtrlA', 'uCtrlB', 'uCtrlC', 'uCtrlD'].map(u)
  const resolution = u('iResolution')

  let time = STILL_TIME
  const draw = () => {
    controls.forEach((location, g) => {
      const values = (CONTROLS[g] ?? []).map(
        (i) => MORPH * Math.sin(time * SPEED * Math.sin(i * MORPH_SPEED) + i),
      )
      gl.uniform4fv(location, values)
    })
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.drawArrays(gl.TRIANGLES, 0, 3)
  }
  const resize = () => {
    const r = box.getBoundingClientRect()
    const dpr = Math.min(devicePixelRatio || 1, 1.5)
    canvas.width = Math.max(1, Math.floor(r.width * dpr))
    canvas.height = Math.max(1, Math.floor(r.height * dpr))
    gl.viewport(0, 0, canvas.width, canvas.height)
    gl.uniform2f(resolution, canvas.width, canvas.height)
    draw()
  }

  const reduced = matchMedia('(prefers-reduced-motion: reduce)')
  let frame = 0
  let visible = true
  let origin = 0
  const loop = (now: number) => {
    time = (now - origin) / 1000
    draw()
    frame = requestAnimationFrame(loop)
  }
  const start = () => {
    if (frame || reduced.matches || !visible || document.hidden) return
    frame = requestAnimationFrame((now) => {
      origin = now - time * 1000
      loop(now)
    })
  }
  const stop = () => {
    cancelAnimationFrame(frame)
    frame = 0
  }
  const onVisibility = () => (document.hidden ? stop() : start())
  const onMotion = () => (reduced.matches ? stop() : start())

  box.appendChild(canvas)
  const sizes = new ResizeObserver(resize)
  sizes.observe(box)
  const onScreen = new IntersectionObserver(([entry]) => {
    visible = !!entry?.isIntersecting
    if (visible) start()
    else stop()
  })
  onScreen.observe(box)
  document.addEventListener('visibilitychange', onVisibility)
  reduced.addEventListener('change', onMotion)
  resize()
  start()

  return () => {
    stop()
    sizes.disconnect()
    onScreen.disconnect()
    document.removeEventListener('visibilitychange', onVisibility)
    reduced.removeEventListener('change', onMotion)
    canvas.remove()
  }
}

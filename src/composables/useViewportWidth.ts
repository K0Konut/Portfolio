import { onMounted, ref } from 'vue'

/* Largeur de la fenêtre, partagée par tous les composants qui en dépendent (les vagues sont pleine
   largeur) : un seul écouteur, une mesure par image au plus, arrondie au pixel. */
const width = ref<number>()
let listening = false

function measure() {
  width.value = document.documentElement.clientWidth
}

export function useViewportWidth() {
  onMounted(() => {
    if (listening) return
    listening = true
    let frame = 0
    addEventListener('resize', () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(measure)
    })
    requestAnimationFrame(measure)
  })
  return width
}

import { describe, expect, it } from 'vitest'
import { localizeMedia } from '../../scripts/medias'

describe('copie du contenu : localizeMedia', () => {
  it('remplace les adresses des médias, srcset compris, et liste les fichiers à télécharger', () => {
    const base = 'https://dashility.costamask.dev/api/media/0b7e-a1'
    const { text, files } = localizeMedia(
      JSON.stringify({
        src: `${base}/1280.webp`,
        srcset: `${base}/640.webp 640w, ${base}/1280.webp 1280w`,
      }),
    )
    expect(JSON.parse(text)).toEqual({
      src: '/medias/0b7e-a1/1280.webp',
      srcset: '/medias/0b7e-a1/640.webp 640w, /medias/0b7e-a1/1280.webp 1280w',
    })
    expect([...files]).toEqual([
      ['/medias/0b7e-a1/1280.webp', `${base}/1280.webp`],
      ['/medias/0b7e-a1/640.webp', `${base}/640.webp`],
    ])
  })

  it('laisse les autres liens intacts', () => {
    const text = JSON.stringify({ code: 'https://github.com/K0Konut/Portfolio' })
    expect(localizeMedia(text)).toEqual({ text, files: new Map() })
  })
})

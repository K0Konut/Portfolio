import type { MarkdownExit } from 'unplugin-vue-markdown/types'

/** Identifiant d'ancre lisible : « Choix techniques » → « choix-techniques » */
export function slugify(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

/** Donne un id à chaque h2 et en range la liste dans l'en-tête (`toc`), pour le sommaire de l'étude de cas
    (StickyToc). L'en-tête est déjà lu quand cette règle passe : on le complète. */
export function tocPlugin(md: MarkdownExit) {
  md.core.ruler.push('toc', (state) => {
    const toc: { id: string; label: string }[] = []
    state.tokens.forEach((token, i) => {
      if (token.type !== 'heading_open' || token.tag !== 'h2') return
      const label = state.tokens[i + 1]?.content ?? ''
      const id = slugify(label)
      token.attrSet('id', id)
      toc.push({ id, label })
    })
    state.env.frontmatter = { ...state.env.frontmatter, toc }
  })
}

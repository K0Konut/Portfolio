import { Comment, Fragment, type VNode } from 'vue'

/** Les enfants d'un slot, un nœud par élément : fragments (v-for) dépliés, commentaires (v-if faux) retirés */
export function slotChildren(nodes: VNode[] = []): VNode[] {
  return nodes.flatMap((node) =>
    node.type === Fragment
      ? slotChildren(node.children as VNode[])
      : node.type === Comment
        ? []
        : [node],
  )
}

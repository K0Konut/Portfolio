import { Comment, Fragment, Text, type VNode } from 'vue'

/** Les enfants d'un slot, un nœud par élément : fragments (v-for) dépliés, commentaires (v-if faux) et texte retirés */
export function slotChildren(nodes: VNode[] = []): VNode[] {
  return nodes.flatMap((node) =>
    node.type === Fragment
      ? slotChildren(node.children as VNode[])
      : node.type === Comment || node.type === Text
        ? []
        : [node],
  )
}

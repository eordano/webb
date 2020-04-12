export type ExplorableTree = {
  loading?: boolean
  expanded?: boolean
  hasKeys?: boolean
  keys?: string[]
  values?: Record<string, any>
}

export function renderTree(tree: ExplorableTree | string | number | null | undefined, depth: number = 0): string {
  const start = ''.padStart(depth, ' ')
  if (typeof tree !== 'object' || tree === null) {
    return `${start} ${tree}`
  }
  const { expanded, hasKeys, loading } = tree
  if (loading) {
    return `${start}- [...loading]`
  }
  if (!expanded) {
    if (hasKeys) {
      return `${start}+ [${tree.keys?.length} keys]`
    } else {
      return `${start}+ [unknown]`
    }
  } else {
    if (!hasKeys) {
      return `${start}+ [no data, not loading, expanded]`
    }
    return tree.keys!.map((_) => start + _ + ':\n' + renderTree(tree!.values![_], depth + 2)).join('\n')
  }
}

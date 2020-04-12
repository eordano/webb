export type ExplorableTree = {
  loading?: boolean
  expanded?: boolean
  hasKeys?: boolean
  keys?: string[]
  values?: Record<string, any>
}

export function alterAtPath(tree: ExplorableTree, path: string[], alteration: any): ExplorableTree {
  if (path.length === 0) {
    if (typeof alteration === 'function') {
      return alteration(tree)
    } else {
      return { ...tree, ...alteration }
    }
  }
  if (!tree.values) {
    throw new Error(`Values must be set before altering a subpath.`)
  }
  return {
    ...tree,
    values: {
      ...tree.values,
      [path[0]]: alterAtPath(tree.values[path[0]], path.slice(1), alteration),
    },
  }
}

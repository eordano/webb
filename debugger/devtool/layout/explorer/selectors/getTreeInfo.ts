export type ExplorableTree = {
  loading?: boolean
  expanded?: boolean
  hasKeys?: boolean
  keys?: string[]
  values?: Record<string, any>
}

const LOCAL_VERBOSE_DEBUG = false
function withoutInitialDot(str: string): string {
  if (str.startsWith('.')) {
    return withoutInitialDot(str.slice(1))
  }
  return str
}

export function getTreeInfo(tree: ExplorableTree, path: string | string[]) {
  const leave = (typeof path === 'string' ? withoutInitialDot(path).split('.') : path).reduce(
    (prev, next) => (prev === undefined || prev.values === undefined ? undefined : prev.values[next]),
    tree
  )

  LOCAL_VERBOSE_DEBUG &&
    console.log(`Asked tree info for "${path}" (tree is ${JSON.stringify(tree)}) -- returning ${JSON.stringify(leave)}`)
  return leave
}

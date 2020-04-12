import { ExplorableTree } from '../types'
import { withoutInitialDot } from '../helpers/withoutInitialDot'

const LOCAL_VERBOSE_DEBUG = false

export function getTreeInfo(tree: ExplorableTree, path: string | string[]) {
  const leave = (typeof path === 'string' ? withoutInitialDot(path).split('.') : path).reduce(
    (prev, next) => (prev === undefined || prev.values === undefined ? undefined : prev.values[next]),
    tree
  )

  LOCAL_VERBOSE_DEBUG &&
    console.log(`Asked tree info for "${path}" (tree is ${JSON.stringify(tree)}) -- returning ${JSON.stringify(leave)}`)
  return leave
}

import { ExplorableTree } from '../types'
import { getTreeInfo } from './getTreeInfo'

const LOCAL_VERBOSE_DEBUG = true

export function shouldTriggerLoad(tree: ExplorableTree, path: string | null): boolean {
  if (path === null || path === undefined) {
    LOCAL_VERBOSE_DEBUG && console.log(`path is ${path} -- returning "true" to should trigger load`)
    return true
  }
  const info = getTreeInfo(tree, path)
  if (info === undefined || typeof info !== 'object') {
    LOCAL_VERBOSE_DEBUG &&
      console.log(`getTreeInfo for "${path}" is ${info} -- returning "true" to should trigger load`)
    return true
  }
  if (info.expanded && !info.loading && !info.hasKeys) {
    LOCAL_VERBOSE_DEBUG &&
      console.log(`getTreeInfo for "${path}" is ${JSON.stringify(info)} -- returning "true" to should trigger load`)
    return true
  }
  return false
}

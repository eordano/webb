import { CollapseAction, ExpandAction, LoadingAction, ResolveAction } from './actions'
import { getInfo } from './selectors/getInfo'
import snapshot from './snapshot.json'
export function collapseAction(path: string): CollapseAction {
  return {
    type: 'Collapse',
    payload: path,
  }
}
export function expandAction(path: string): ExpandAction {
  return {
    type: 'Expand',
    payload: path,
  }
}
export function loadAction(path: string): LoadingAction {
  return {
    type: 'Loading',
    payload: path,
  }
}
export function getResolveActionWithSnapshot(path: string): ResolveAction {
  const data = getInfo(snapshot, path)
  return {
    type: 'Resolve',
    payload: {
      keys: data.keys,
      values: data.values,
      path: path,
    },
  }
}

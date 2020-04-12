import { AnyAction } from 'redux'
import { StateAction } from './actions'
import { alterAtPath } from './reducers/alterAtPath'
import { getTreeInfo } from './selectors/getTreeInfo'
import { EmptyTree, ExplorerState, InitialExplorerState } from './types'

function withoutInitialDot(str: string): string {
  if (str.startsWith('.')) {
    return withoutInitialDot(str.slice(1))
  }
  return str
}

export function reducer(state?: ExplorerState, action?: StateAction | AnyAction): ExplorerState {
  if (!state) {
    if (!action) {
      return InitialExplorerState
    }
    return reducer(InitialExplorerState, action)
  }
  if (!action) {
    return state
  }
  const path =
    typeof action.payload === 'string' || (action.payload && action.payload.path)
      ? withoutInitialDot(typeof action.payload === 'string' ? action.payload : action.payload.path)
          .split('.')
          .filter((_) => _ !== '')
      : []
  switch (action.type) {
    case 'Loading':
      return alterAtPath(state, path, { loading: true })
    case 'Resolve':
      return alterAtPath(state, path, {
        ...getTreeInfo(state, path),
        loading: false,
        hasKeys: true,
        keys: action.payload.keys,
        values: action.payload.values,
      })
    case 'Expand':
      return alterAtPath(state, path, { expanded: true })
    case 'Collapse':
      return alterAtPath(state, path, { expanded: false })
    case 'Clear':
      return alterAtPath(state, path, () => EmptyTree)
    default:
      return state
  }
}

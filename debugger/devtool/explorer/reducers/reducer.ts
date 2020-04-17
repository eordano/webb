import { AnyAction } from 'redux'
import { StateAction } from '../actions/actions'
import { alterAtPath } from './alterAtPath'
import { getTreeInfo } from '../selectors/getTreeInfo'
import { EmptyTree, InitialExplorerState, InspectedExplorableTree } from '../../../types/explorer'

function withoutInitialDot(str: string): string {
  if (str.startsWith('.')) {
    return withoutInitialDot(str.slice(1))
  }
  return str
}

export function reducer(state?: InspectedExplorableTree, action?: StateAction | AnyAction): InspectedExplorableTree {
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
    case 'Set Inspected Tab':
      return {
        ...state,
        inspectedTab: action.payload,
      }
    default:
      return state
  }
}

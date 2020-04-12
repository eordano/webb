import { CollapseAction, ExpandAction, LoadingAction } from './actions'
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
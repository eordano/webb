import { CollapseAction, ExpandAction, LoadingAction, SetInspectedTab } from './actions'
export function collapseAction(path: string): CollapseAction {
  return {
    type: 'Collapse',
    payload: path,
  }
}
export function setInspectedTab(tab: number): SetInspectedTab {
  return {
    type: 'Set Inspected Tab',
    payload: tab,
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

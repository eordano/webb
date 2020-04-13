import { AnyAction } from 'redux'

export type LoadingAction = {
  type: 'Loading'
  payload: string
}
export type ResolveAction = {
  type: 'Resolve'
  payload: {
    path: string
    values: Record<string, any>
    keys: string[]
  }
}
export type ExpandAction = {
  type: 'Expand'
  payload: string
}
export type CollapseAction = {
  type: 'Collapse'
  payload: string
}
export type ClearAction = {
  type: 'Clear'
  payload: string
}
export type SetInspectedTab = {
  type: 'Set Inspected Tab'
  payload: number
}
export type StateAction = LoadingAction | ResolveAction | ExpandAction | CollapseAction | ClearAction
export type OtherAction = Exclude<AnyAction, StateAction>

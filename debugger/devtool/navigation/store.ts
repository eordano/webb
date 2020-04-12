import { createStore, AnyAction, Store } from 'redux'

export type NavigationState = {
  currentSection: SectionType
}
export const InitialState: NavigationState = {
  currentSection: 'Status',
}
export const NAVIGATE = 'Navigate'
export type Navigate = typeof NAVIGATE
export type SectionType =
  | 'none'
  | 'Explorer'
  | 'Scenes'
  | 'Renderer'
  | 'Status'
  | 'Networking'
  | 'Map'
  | 'Running scenes'
  | 'ECS State'
  | 'Messages'
  | 'Incoming'
  | 'Outgoing'

export type NavigateAction = {
  type: Navigate
  payload: SectionType
}

export type OtherAction = Exclude<AnyAction, NavigateAction>

export function reducer(state?: NavigationState, action?: NavigateAction | OtherAction): NavigationState {
  if (!state) {
    if (!action) {
      return InitialState
    }
    return reducer(InitialState, action)
  }
  if (!action) {
    return state
  }
  switch (action.type) {
    case NAVIGATE:
      return {
        currentSection: action.payload,
      }
  }
  return state
}
export const store: Store<NavigationState> = createStore(reducer)

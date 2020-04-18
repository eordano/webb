
export type ScenesState = ExplorableTree
export type ExplorerState = ExplorableTree
export const EmptyTree = { expanded: false, hasKeys: false }
export const InitialExplorerState = {
  ...EmptyTree,
}
export type ExplorableTree = {
  loading?: boolean
  expanded?: boolean
  hasKeys?: boolean
  keys?: string[]
  values?: Record<string, any>
}

export type InspectedExplorableTree = ExplorableTree & {
  inspectedTab?: number
}
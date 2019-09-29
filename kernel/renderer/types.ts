export const RENDERER_INITIALIZED = 'Renderer initialized'

// TODO (eordano 2019/09/29): Renderer interface abstraction
export type RendererInstance = any

export type RendererState = {
  initialized: boolean
  instance: RendererInstance
}

export type RootRendererState = {
  renderer: RendererState
}

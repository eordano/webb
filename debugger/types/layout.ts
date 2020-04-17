import { Store } from 'redux'
import { CommsState } from './comms'
import { ExplorerState } from './explorer'
import { RendererState } from './renderer'

export type RootProps = {
  windowContext: Window
  explorerStore: Store<ExplorerState>
  commsStore: Store<CommsState>
  rendererStore: Store<RendererState>
}

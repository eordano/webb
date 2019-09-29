import { action } from 'typesafe-actions'
import { RENDERER_INITIALIZED, RendererInstance } from './types'

export const signalRendererInitialized = (instance: RendererInstance) => action(RENDERER_INITIALIZED, instance)
export type SignalRendererInitialized = ReturnType<typeof signalRendererInitialized>

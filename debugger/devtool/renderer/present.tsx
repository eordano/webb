import React from 'react'
import { Store } from 'redux'
import { RendererState } from '../../types/renderer'
import { useStore2 } from 'dcl/jslibs/hooks/useStore2'

export function Renderer(props: { rendererStore: Store<RendererState> }) {
  if (!props.rendererStore) {
    return <h2>Loading</h2>
  }
  const [state] = useStore2(props.rendererStore)
  return (
    <div>
      <h1>Renderer</h1>
      {state.incoming.map((_, index) => {
        return <div key={index}>{JSON.stringify(_)}</div>
      })}
      {state.outgoing.map((_, index) => {
        return <div key={'o-' + index}>{JSON.stringify(_)}</div>
      })}
    </div>
  )
}

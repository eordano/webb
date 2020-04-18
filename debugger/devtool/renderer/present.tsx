import React from 'react'
import { Store } from 'redux'
import { RendererState } from '../../types/renderer'
import { useStore2 } from '../../../jslibs/hooks/useStore2'

function Renderer(kind: string) {
  return function (props: { rendererStore: Store<RendererState> }) {
    if (!props.rendererStore) {
      return <h2>Loading</h2>
    }
    const [state] = useStore2(props.rendererStore)
    return (
      <div>
        <h1>Renderer ({kind})</h1>
        {state[kind] && state[kind].map((_, index) => {
          return <div key={index}>{JSON.stringify(_)}</div>
        })}
      </div>
    )
  }
}

export const Incoming: any = Renderer('incoming')
export const Outgoing: any = Renderer('outgoing')

import { Store, Dispatch } from 'redux'
import { useState, useEffect } from 'react'

export function useStore2<S>(store: Store<S>): [S, Dispatch] {
  const [state, setState] = useState(store.getState())
  useEffect(() => {
    return store.subscribe(() => {
      setState(store.getState())
    })
  })
  return [state, store.dispatch.bind(store)]
}

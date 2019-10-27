import { createStore, AnyAction } from 'redux'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { connect, Provider } from 'react-redux'
import { configureStore } from 'dcl/kernel/core/store'
import { resolvePositionToSceneManifest } from 'dcl/kernel/scene-atlas/resolvePositionToSceneManifest'

type State = { count: number }
const INITIAL: State = { count: 1 }
const store = createStore((state?: State, action?: AnyAction) => {
  if (!state) {
    return INITIAL
  }
  if (!action) {
    return state
  }
  return { count: state.count + 1 }
})

const otherStore = configureStore()
otherStore.start()

const Hello = connect((state: State) => state)((state: State) => {
  console.log(otherStore.store.getState())
resolvePositionToSceneManifest(otherStore.store)(0,0).then(e => console.log(e))
  return (
    <>
      <h1>Hello world! {state.count} </h1>
      <button onClick={() => store.dispatch({ type: 'Increment' })}>Increment</button>
    </>
  )
})

ReactDOM.render(
  <Provider store={store}>
    <>
      <Hello />
    </>
  </Provider>,
  document.getElementById('root')
)

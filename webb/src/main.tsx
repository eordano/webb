import { createStore, AnyAction } from 'redux'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { connect, Provider } from 'react-redux'

import { createReducer } from 'dcl/kernel/core/reducers'
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

const Hello = connect((state: State) => state)((state: State) => {
  const f = createReducer()
  console.log(f)
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

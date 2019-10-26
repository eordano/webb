// import { configureStore } from 'dcl/kernel/core/store'
// import { ConnectedRouter } from 'connected-react-router'
// import { createBrowserHistory } from 'history'
// import * as React from 'react'
// import * as ReactDOM from 'react-dom'
// import { Provider } from 'react-redux'
//
// (async function() {
//   const store = configureStore()
//   const routes = await import('./routes')
//   ReactDOM.render(
//     <>
//     <ConnectedRouter history={createBrowserHistory()}>
//       { routes }
//     </ConnectedRouter>
//     <Provider store={store.store}>
//       <h1>Hello world!</h1>
//       </Provider>
//     </>,
//     document.getElementById('root')
//   )
// })()

import { createStore, AnyAction } from 'redux'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { connect, Provider } from 'react-redux'
// import * as routes from './routes'

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
// console.log(routes)

const Hello = connect((state: State) => state)((state: State) => {
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
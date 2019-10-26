import { configureStore } from 'dcl/kernel/core/store'
import { ConnectedRouter } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

(async function() {
  const store = configureStore()
  const routes = await import('./routes')
  ReactDOM.render(
    <>
    <ConnectedRouter history={createBrowserHistory()}>
      { routes }
    </ConnectedRouter>
    <Provider store={store.store}>
      <h1>Hello world!</h1>
      </Provider>
    </>,
    document.getElementById('root')
  )
})()

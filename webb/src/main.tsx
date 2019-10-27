import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { connectRouter, RouterState, ConnectedRouter } from 'connected-react-router'
import { configureStore } from 'dcl/kernel/core/store'
import { createBrowserHistory } from 'history'
import { Provider } from 'react-redux'
import { AnyAction } from 'redux'
import { Container, Navbar } from './components/liteui/dcl'
import { Switch, Route } from 'react-router'
import Status from './components/status/StatusFrame'

const history = createBrowserHistory()
const store = configureStore({
  router: connectRouter(history) as (state: any, action: AnyAction) => RouterState
})
store.start()
const context = React.createContext(store.store)
ReactDOM.render(
  <>
    <Provider store={store.store} context={context as any}>
      <>
        <Container>
          <Navbar />
        </Container>
        <ConnectedRouter history={history} context={context as any}>
          <Switch>
            <Route path="/status" component={Status} />
            <Route path="/status/*" component={Status} />

            <Route component={Status} />
          </Switch>
        </ConnectedRouter>
      </>
    </Provider>
  </>,
  document.getElementById('root')
)

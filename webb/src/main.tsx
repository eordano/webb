import { createBrowserHistory } from 'history'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Switch, Route } from 'react-router'
import { Container, Navbar } from './components/liteui/dcl'
import Status from './components/status/StatusFrame'
import { context } from './context'
import { store } from './store'

const history = createBrowserHistory()
store.start()
ReactDOM.render(
  <>
    <Provider store={store.store} context={context as any}>
      <>
        <Container>
          <Navbar />
        </Container>
        <Router history={history}>
          <Switch>
            <Route path="/status" component={Status} />
            <Route path="/status/*" component={Status} />

            <Route component={Status} />
          </Switch>
        </Router>
      </>
    </Provider>
  </>,
  document.getElementById('root')
)

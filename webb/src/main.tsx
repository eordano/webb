import { configureStore } from 'dcl/kernel/core/store'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Container, Navbar } from './components/liteui/dcl'
import { Routes } from './routes'

const store = configureStore({})
store.start()
const context = React.createContext(store.store)
ReactDOM.render(
  <>
    <Provider store={store.store} context={context as any}>
      <>
        <Container>
          <Navbar />
        </Container>
        <Routes />
      </>
    </Provider>
  </>,
  document.getElementById('root')
)

import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'

import { configureStore } from '@dcl/kernel/core/store'

const store = configureStore()

const App = async () => {
  const routes = await import('./routes')
  ReactDOM.render(
    <>
      <Provider store={store.store}>{routes.Routes}</Provider>
    </>,
    document.getElementById('root')
  )
}

export default App

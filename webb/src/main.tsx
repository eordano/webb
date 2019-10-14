import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

const store = createStore(() => ({}))

ReactDOM.render(
  <>
    <Provider store={store}>
    <h1>Hello world!</h1></Provider>
  </>,
  document.getElementById('root')
)

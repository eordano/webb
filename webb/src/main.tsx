import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { createStore } from 'redux'

const store = createStore(() => ({}))

ReactDOM.render(
  <>
    <h1>Hello world!</h1>
  </>,
  document.getElementById('root')
)

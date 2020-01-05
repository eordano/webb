import { Sail, Through } from 'dcl/jslibs/sail'
import React from 'react'
import ReactDOM from 'react-dom'

renderApp(
  <Sail>
    <Through path='/' catchAll renderer={(props: any) => <h1> hi</h1>} />
  </Sail>
)

export function renderApp(paths: any) {
  ReactDOM.render(paths, document.getElementById('root'))
}

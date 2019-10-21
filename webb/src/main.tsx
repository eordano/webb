import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App'

App().then((Main: any) => {
  ReactDOM.render(
    <>
      <h1>Hello world!</h1>
      <Main />
    </>,
    document.getElementById('root')
  )
})

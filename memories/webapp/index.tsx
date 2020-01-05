import { Sail, Through } from 'dcl/jslibs/sail'
import React from 'react'
import ReactDOM from 'react-dom'
import { Index } from './contents'
import { Episode } from './episode'

renderApp(
  <Sail>
    <Through path={_ => _.startsWith('/ep/')} renderer={(props: any) => <Episode {...props} />} />
    <Through path='/' renderer={(props: any) => <Index {...props} />} key='root' />
  </Sail>
)

export function renderApp(paths: any) {
  ReactDOM.render(paths, document.getElementById('root'))
}

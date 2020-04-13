import React, { Dispatch, useReducer } from 'react'
import { MainArea } from './MainArea'
import { Sidebar } from './Sidebar'
import { InitialState, NavigateAction, NavigationState, reducer } from './store'
import { Sections } from './Sections'

export function Root(props: { windowContext: Window }) {
  const [state, dispatch]: [NavigationState, Dispatch<NavigateAction>] = useReducer(reducer, InitialState)
  return (
    <div className='container'>
      <Sidebar sidebar={Sections} state={state} dispatch={dispatch}></Sidebar>
      <MainArea state={state} windowContext={props.windowContext} ></MainArea>
    </div>
  )
}

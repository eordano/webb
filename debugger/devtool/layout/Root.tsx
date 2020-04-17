import React, { Dispatch, useReducer } from 'react'
import { MainArea } from './MainArea'
import { Sidebar } from './Sidebar'
import { InitialState, NavigateAction, NavigationState, reducer } from './store'
import { Sections } from './Sections'
import { RootProps } from '../../types/layout'

export function Root(props: RootProps) {
  const [state, dispatch]: [NavigationState, Dispatch<NavigateAction>] = useReducer(reducer, InitialState)
  return (
    <div className='container'>
      <Sidebar sidebar={Sections} state={state} dispatch={dispatch}></Sidebar>
      <MainArea state={state} {...props} ></MainArea>
    </div>
  )
}

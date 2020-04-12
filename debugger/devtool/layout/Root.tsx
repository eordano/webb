import React, { Dispatch, useReducer } from 'react'
import { Store } from 'redux'
import './App.css'
import { MainArea } from './MainArea'
import { sidebar } from './navigation/sidebar'
import { InitialState, NavigateAction, NavigationState, reducer } from './navigation/store'
import { Sidebar } from './Sidebar'

export function Root(props: { state: Store<any, any>; panelWindow: Window }) {
  const [state, dispatch]: [NavigationState, Dispatch<NavigateAction>] = useReducer(reducer, InitialState)
  return (
    <div className='container'>
      <Sidebar sidebar={sidebar} state={state} dispatch={dispatch}></Sidebar>
      <MainArea state={state}></MainArea>
    </div>
  )
}

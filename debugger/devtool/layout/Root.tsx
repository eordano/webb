import React, { Dispatch, useCallback, useReducer } from 'react'
import './App.css'
import { mapSections, sidebar } from './navigation/sidebar'
import { InitialState, NAVIGATE, NavigateAction, NavigationState, reducer } from './navigation/store'

const voidAction = () => null

function Sidebar(props: { sidebar: typeof sidebar; state: NavigationState; dispatch: Dispatch<NavigateAction> }) {
  const child = []
  const { state, dispatch } = props
  for (let section of props.sidebar) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const setSection = useCallback(() => dispatch({ type: NAVIGATE, payload: section.section }), [
      section.section,
      dispatch,
    ])
    child.push(
      <div
        key={section.section}
        onClick={!!section.cantselect ? voidAction : setSection}
        className={
          'section' +
          (section.section === state.currentSection ? ' active' : '') +
          (section.cantselect ? ' cantselect' : '')
        }
      >
        <span className='logo'>{section.logo}</span> {section.section}{' '}
      </div>
    )
    section.subsections?.map((_: any) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const setSubSection = useCallback(() => dispatch({ type: NAVIGATE, payload: _.section }), [_.section])
      child.push(
        <div
          key={_.section}
          onClick={!!_.cantselect ? voidAction : setSubSection}
          className={
            'subsection' + (_.section === state.currentSection ? ' active' : '') + (_.cantselect ? ' cantselect' : '')
          }
        >
          <span className='logo'>{_.logo}</span> {_.section}
        </div>
      )
    })
  }
  return <div className='sidebar'>{[...child]}</div>
}

function MainArea(props: { children: any; state: NavigationState }) {
  const { currentSection } = props.state
  if (currentSection && mapSections[currentSection]) {
    const Component = mapSections[currentSection].component
    if (Component) {
      return (
        <div className='mainArea'>
          <Component {...props.state} />
        </div>
      )
    }
  }
  return (
    <div className='mainArea'>
      <h1>{props.state.currentSection}</h1>
    </div>
  )
}

export function Root(props: { sidebar: any; mainArea: any }) {
  const [state, dispatch]: [NavigationState, Dispatch<NavigateAction>] = useReducer(reducer, InitialState)
  return (
    <div className='container'>
      <Sidebar sidebar={props.sidebar} state={state} dispatch={dispatch}></Sidebar>
      <MainArea {...props.mainArea} state={state}>
        Placeholder
      </MainArea>
    </div>
  )
}

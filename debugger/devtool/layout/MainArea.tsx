import React from 'react'
import { NavigationState } from './store'
import { mapSections } from './Sections'

export function MainArea(props: { state: NavigationState, windowContext: Window }) {
  const { currentSection } = props.state
  if (currentSection && mapSections[currentSection]) {
    const Component = mapSections[currentSection].component
    if (Component) {
      return (
        <div className='mainArea'>
          <Component {...props.state} windowContext={props.windowContext} />
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

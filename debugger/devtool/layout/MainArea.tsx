import React from 'react'
import { mapSections } from './navigation/sidebar'
import { NavigationState } from './navigation/store'

export function MainArea(props: { state: NavigationState }) {
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

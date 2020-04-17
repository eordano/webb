import React from 'react'
import { RootProps } from '../../types/layout'
import { mapSections } from './Sections'
import { reducer } from './store'

export function MainArea(
  props: RootProps & {
    state: ReturnType<typeof reducer>
  }
) {
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

import React, { Dispatch, useCallback } from 'react'
import { sidebar } from '../navigation/sidebar'
import { NAVIGATE, NavigateAction, NavigationState } from '../navigation/store'

const voidAction = () => undefined

export function Sidebar(props: { sidebar: typeof sidebar; state: NavigationState; dispatch: Dispatch<NavigateAction> }) {
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

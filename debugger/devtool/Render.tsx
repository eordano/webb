import React from 'react'
import { useStore2 } from '../../jslibs/hooks/useStore2'
import { commsStore } from './comms/store'
import { Root } from './layout/Root'

export function Render(props: { panelWindow: Window }) {
  const [state] = useStore2(commsStore)
  return <Root state={state} panelWindow={props.panelWindow} />
}

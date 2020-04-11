import { useStore2 } from '../../jslibs/hooks/useStore2'
import React, { useCallback } from 'react'
import { commsStore } from './comms/store'
import { GlobalChrome } from '../types/chrome'
import { LineChart } from './comms/chart'

declare var chrome: GlobalChrome

export function Render(props: { panelWindow: Window }) {
  const test = useCallback(() => {
    chrome.devtools.inspectedWindow.eval(`window.postMessage(
         {
           name: '[dcl-debugger:panel] Pong!',
           source: 'dcl-debugger',
         },
         '*'
       )`)
  }, [])
  const [state] = useStore2(commsStore)
  return (
    <div>
      <div style={{ color: 'white' }}>Render 5</div>
      <pre>{JSON.stringify(state, null, 2)}</pre>
      <button onClick={test}>Send Test `Ping`</button>
      <LineChart {...props} />
    </div>
  )
}

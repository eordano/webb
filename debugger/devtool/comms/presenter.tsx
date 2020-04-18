import React, { useCallback, useState, useMemo } from 'react'
import { LineChart } from './LineChart'
import { MessageTypeFilterList, StatTypeFilterList, CommsState } from '../../types/comms'
import { Store } from 'redux'
import { useStore2 } from '../../../jslibs/hooks/useStore2'

export function Networking(props: { windowContext: Window; commsStore: Store<CommsState> }) {
  if (!props.commsStore) {
    return <h2>Loading</h2>
  }
  const [selectedStat, setStat] = useState('totalBytes')
  const [selectedType, setType] = useState('all')
  const [state] = useStore2(props.commsStore)

  const callbacks: Record<string, any> = {}
  for (let stat of StatTypeFilterList) {
    // eslint-disable-next-line no-loop-func
    // eslint-disable-next-line react-hooks/rules-of-hooks
    callbacks[stat] = useCallback(() => setStat(stat), [stat])
  }
  for (let type of MessageTypeFilterList) {
    // eslint-disable-next-line no-loop-func
    // eslint-disable-next-line react-hooks/rules-of-hooks
    callbacks[type] = useCallback(() => setType(type), [type])
  }
  const history = state.history.filter(
    (_) => (_ && _.statsByType && selectedType === 'all') || _.statsByType[selectedType]
  )
  const values = useMemo(
    () => history.map((_) => (selectedType === 'all' ? _ : _.statsByType[selectedType])[selectedStat]),
    [selectedStat, selectedType, history]
  )
  return (
    <div>
      <h2>Networking stats ({history.length} entry points)</h2>
      <div className='netSection'>
        <div className='netSidebar'>
          <h3>Filter</h3>
          <div>
            <h4>by Message Type</h4>
            {MessageTypeFilterList.map((_) => {
              return (
                <div key={_}>
                  <button onClick={callbacks[_]}>
                    {_ === selectedType ? '✅' : '⏺'} {_}
                  </button>
                </div>
              )
            })}
          </div>
          <div>
            <h4>by Stat</h4>
            {StatTypeFilterList.map((_) => {
              return (
                <div key={_}>
                  <span onClick={callbacks[_]}>
                    {_ === selectedStat ? '✅' : '⏺'} {_}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
        <div className='netGraphs'>
          <LineChart windowContext={props.windowContext} id='netgraph' values={values} />
          <canvas id='netgraph'></canvas>
        </div>
      </div>
    </div>
  )
}

export default Networking

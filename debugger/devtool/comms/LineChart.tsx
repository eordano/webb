import Chart from 'chart.js'
import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react'
import { deepEqual } from '../../../jslibs/deepEqual'
import { useStore2 } from '../../../jslibs/hooks/useStore2'
import { store } from './store'

/**
 * Get a `2d` canvas out of an element, extracted by its id.
 */
function getContextFromCanvas(windowContext: Window, id: string = 'canvas') {
  const document = windowContext.document
  if (!document) {
    return
  }
  const canvas = windowContext.document.getElementById(id) as HTMLCanvasElement
  if (canvas) {
    return canvas.getContext('2d')
  }
}

/**
 * Creates a chart using hard-coded data (see `initialConfig` in `//devtool/comms/chart.tsx`)
 */
export function LineChart(props: { windowContext: Window }) {
  const [state] = useStore2(store)
  const [context, setContext] = useState(null as CanvasRenderingContext2D | null)
  useEffect(() => {
    if (!context) {
      const tryContext = getContextFromCanvas(props.windowContext)
      if (tryContext) {
        setContext(tryContext)
      }
    }
  })
  const [myLine, setMyLine] = useState(null as Chart | null)
  const lineData = useMemo(() => buildConfigFromNumberArray(state.history.map((_) => 1)), state.history)
  useEffect(() => {
    if (context && !myLine) {
      setMyLine(new Chart(context, lineData))
    }
  }, [context, myLine, setMyLine])
  const [config, setConfig] = useState(lineData)
  useLayoutEffect(() => {
    if (myLine && !deepEqual(lineData, config)) {
      myLine.data = lineData.data
      setConfig(lineData)
      myLine.update()
    }
  }, [config, myLine, state.history])
  return (
    <ul>
      {state &&
        state.history &&
        state.history.map((_: any, index: number | string) => {
          return <li key={index}>{_.totalBytes}</li>
        })}
    </ul>
  )
}

export var MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]
function buildConfigFromNumberArray(array: number[]) {
  return {
    type: 'line',
    data: {
      labels: array.map((_, index) => index),
      datasets: [
        {
          label: 'Data Series #1',
          labels: MONTHS,
          backgroundColor: '#ffffff',
          borderColor: '#ff0000',
          data: array,
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: 'Provided data',
      },
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Order',
            },
          },
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Value',
            },
          },
        ],
      },
    },
  }
}

import Chart from 'chart.js'
import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react'
import { deepEqual } from '../../../jslibs/deepEqual/index'

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
export function LineChart(props: { values: number[]; windowContext: Window; id: string }) {
  const [context, setContext] = useState(null as CanvasRenderingContext2D | null)
  useEffect(() => {
    if (!context) {
      const tryContext = getContextFromCanvas(props.windowContext, props.id || 'canvas')
      if (tryContext) {
        setContext(tryContext)
      }
    }
  })
  const [myLine, setMyLine] = useState(null as Chart | null)
  const lineData = useMemo(() => buildConfigFromNumberArray(props.values), [props.values])
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
  }, [config, myLine, props.values])
  return <span></span>
}

function buildConfigFromNumberArray(array: number[]) {
  return {
    type: 'line',
    data: {
      labels: array.map((_, index) => index),
      datasets: [
        {
          fill: false,
          lineTension: 0,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt' as any,
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter' as any,
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          animation: {
            duration: 0,
          },
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: array,
        },
      ],
      animation: {
        duration: 0,
      },
      options: {
        animation: {
          duration: 0
        }
      }
    },
    animation: {
      duration: 0,
    },
    options: {
      animation: {
        duration: 0
      }
    }
  }
}

import Chart from 'chart.js'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useStore2 } from '../../../jslibs/hooks/useStore2'
import { getCommsStore } from './store'

function getContextFromCanvas(panelWindow: Window) {
  const document = panelWindow.document
  if (!document) {
    return
  }
  const canvas = panelWindow.document.getElementById('canvas') as HTMLCanvasElement
  if (canvas) {
    return canvas.getContext('2d')
  }
}

export function LineChart(props: { panelWindow: Window }) {
  const [state] = useStore2(getCommsStore())
  const [context, setContext] = useState(null as CanvasRenderingContext2D | null)
  useEffect(() => {
    if (!context) {
      const tryContext = getContextFromCanvas(props.panelWindow)
      if (tryContext) {
        setContext(tryContext)
      }
    }
  })
  const [myLine, setMyLine] = useState(null as Chart | null)
  useEffect(() => {
    if (context && !myLine) {
      setMyLine(new Chart(context, initialConfig))
    }
  }, [context, myLine, setMyLine])
  const [configChangeRequests, setChangeRequests] = useState([])
  useLayoutEffect(() => {
    if (myLine && configChangeRequests.length) {
      for (let change of configChangeRequests) {
        change(initialConfig)
      }
      setChangeRequests([])
      myLine.update()
    }
  }, [configChangeRequests, myLine, setChangeRequests])
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
var initialConfig = {
  type: 'line',
  data: {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'My First dataset',
        labels: MONTHS,
        backgroundColor: '#ffffff',
        borderColor: '#ff0000',
        data: [0.1, 0.2, 0.3, 0.25, 0.35, 0.5, 0.7],
        fill: false,
      },
      {
        label: 'My Second dataset',
        labels: MONTHS,
        fill: false,
        backgroundColor: '#0000ff',
        borderColor: '#0000ff',
        data: [0.15, 0.12, 0.26, 0.37, 0.29, 0.4, 0.65],
      },
    ],
  },
  options: {
    responsive: true,
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
    scales: {
      xAxes: [
        {
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Month',
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

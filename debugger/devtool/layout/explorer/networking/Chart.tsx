import Chart from "chart.js";
import React, { useEffect, useLayoutEffect, useState } from "react";

function getContextFromCanvas(panelWindow: Window) {
  const document = panelWindow.document;
  if (!document) {
    return;
  }
  const canvas = panelWindow.document.getElementById(
    "netgraph"
  ) as HTMLCanvasElement;
  if (canvas) {
    return canvas.getContext("2d");
  }
}

export function LineChart(props: { dataPoints: number[] }) {
  const [context, setContext] = useState(
    null as CanvasRenderingContext2D | null
  );
  useEffect(() => {
    if (!context) {
      const tryContext = getContextFromCanvas(window);
      if (tryContext) {
        setContext(tryContext);
      }
    }
  }, [context]);
  const [myLine, setMyLine] = useState(null as Chart | null);
  useEffect(() => {
    if (context && !myLine) {
      setMyLine(new Chart(context, initialConfig));
    }
  }, [context, myLine, setMyLine]);
  const [configChangeRequests, setChangeRequests] = useState([] as number[]);
  useLayoutEffect(() => {
    if (props.dataPoints !== configChangeRequests) {
      initialConfig.data.datasets[0].data = props.dataPoints;
      setChangeRequests(props.dataPoints);
      myLine?.update();
    }
  }, [configChangeRequests, props.dataPoints, myLine, setChangeRequests]);
  return <div />;
}

export var MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
var initialConfig = {
  type: "line",
  data: {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "My First dataset",
        labels: MONTHS,
        backgroundColor: "#ffffff",
        borderColor: "#ff0000",
        data: [0.1, 0.2, 0.3, 0.25, 0.35, 0.5, 0.7],
        fill: false,
      },
    ],
  },
  options: {
    responsive: true,
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
    scales: {
      xAxes: [
        {
          display: true,
          scaleLabel: {
            display: true,
            labelString: "Month",
          },
        },
      ],
      yAxes: [
        {
          display: true,
          scaleLabel: {
            display: true,
            labelString: "Value",
          },
        },
      ],
    },
  },
};

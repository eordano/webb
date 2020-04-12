import React, { useCallback, useState } from "react";
import { LineChart } from "./LineChart"
import { MessageTypeFilterList, StatTypeFilterList } from "./types";

export function Networking(props: { windowContext: Window }) {
  const [selectedStat, setStat] = useState("totalBytes");
  const [selectedType, setType] = useState("all");

  const callbacks: Record<string, any> = {};
  for (let stat of StatTypeFilterList) {
    // eslint-disable-next-line no-loop-func
    // eslint-disable-next-line react-hooks/rules-of-hooks
    callbacks[stat] = useCallback(() => setStat(stat), [stat]);
  }
  for (let type of MessageTypeFilterList) {
    // eslint-disable-next-line no-loop-func
    // eslint-disable-next-line react-hooks/rules-of-hooks
    callbacks[type] = useCallback(() => setType(type), [type]);
  }
  return (
    <div>
      <h2>Networking stats</h2>
      <div className="netSection">
        <div className="netSidebar">
          <h3>Filter</h3>
          <div>
            <h4>by Message Type</h4>
            {MessageTypeFilterList.map((_) => {
              return (
                <div key={_}>
                  <button onClick={callbacks[_]}>
                    {_ === selectedType ? "✅" : "⏺"} {_}
                  </button>
                </div>
              );
            })}
          </div>
          <div>
            <h4>by Stat</h4>
            {StatTypeFilterList.map((_) => {
              return (
                <div key={_}>
                  <span onClick={callbacks[_]}>
                    {_ === selectedStat ? "✅" : "⏺"} {_}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="netGraphs">
          <LineChart windowContext={props.windowContext} />
          <canvas id="netgraph"></canvas>
        </div>
      </div>
    </div>
  );
}

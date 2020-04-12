import React, { useCallback, useState } from "react";
import { LineChart } from "./Chart";

const messageTypeFilter = [
  "all",
  "profile",
  "position",
  "sceneComms",
  "parcelUpdate",
  "chat",
];
const statTypeFilter = [
  "expired",
  "expiredPercentage",
  "packetDuplicates",
  "duplicatePercentage",
  "averagePacketSize",
  "optimistic",
  "packets",
  "totalBytes",
];
function GetStatFilter(key: number) {
  return statTypeFilter[key];
}
function GetMessageFilter(key: number) {
  return messageTypeFilter[key];
}
export type StatFilter = ReturnType<typeof GetStatFilter>;
export type MessageTypeFilter = ReturnType<typeof GetMessageFilter>;

export function Networking(props: { datapoints: any }) {
  const [selectedStat, setStat] = useState("totalBytes");
  const [selectedType, setType] = useState("all");

  const callbacks: Record<string, any> = {};
  for (let stat of statTypeFilter) {
    // eslint-disable-next-line no-loop-func
    // eslint-disable-next-line react-hooks/rules-of-hooks
    callbacks[stat] = useCallback(() => setStat(stat), [stat]);
  }
  for (let type of messageTypeFilter) {
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
            {messageTypeFilter.map((_) => {
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
            {statTypeFilter.map((_) => {
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
          <LineChart dataPoints={props.datapoints} />
          <canvas id="netgraph"></canvas>
        </div>
      </div>
    </div>
  );
}

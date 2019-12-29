import { Loader, Table } from 'decentraland-ui'
import React, { useEffect, useState } from 'react'
import { englishTimeAgo } from 'dcl/jslibs/datefun/englishTimeAgo'
import { THREE_MINUTES } from 'dcl/jslibs/datefun/timeConstants'
import { humanizeTimeDifference } from 'dcl/jslibs/datefun/humanizeTimeDifference'

export function WorldSessions(props: { userId: string }) {
  const { userId } = props
  const [positions, setPositions] = useState(undefined)
  const [perf, setPerf] = useState(undefined)

  useEffect(() => {
    ;(async function() {
      if (positions !== undefined) {
        return
      }
      setPositions(null)
      setPerf(null)
      const positionsRes = await fetch(`http://${window.location.hostname}:1338/users/movements/${userId}`)
      const perfRes = await fetch(`http://${window.location.hostname}:1338/users/perf/${userId}`)
      setPositions(await positionsRes.json())
      setPerf(await perfRes.json())
    })()
  })
  if (!positions || !perf) {
    return <Loader />
  }
  var segments = positions
    .map(_ => ({ ..._, timestamp: new Date(_.timestamp).getTime() }))
    .reduce(
      (cumm, next) =>
        !cumm.length
          ? [[next]]
          : cumm[0][0].timestamp - next.timestamp > THREE_MINUTES
          ? [[next], cumm[0].filter(_ => _.distance > 0), ...cumm.slice(1)]
          : [[next, ...cumm[0]], ...cumm.slice(1)],
      []
    )
    .filter(_ => _.length)
    .reverse()
  const now = new Date().getTime()
  return (
    <>
      <h3>World Sessions</h3>
      <Table basic="very">
        <Table.Header>
          <Table.HeaderCell>When</Table.HeaderCell>
          <Table.HeaderCell>Session Time</Table.HeaderCell>
          <Table.HeaderCell>Parcels explored</Table.HeaderCell>
          <Table.HeaderCell>Perf Score: (95th)</Table.HeaderCell>
        </Table.Header>
        <Table.Body>
          {segments.slice(0, 5).map(segment => (
            <Table.Row key={segment.timestamp}>
              <Table.Cell>{englishTimeAgo(now - segment[0].timestamp)}</Table.Cell>
              <Table.Cell>
                {humanizeTimeDifference(segment[segment.length - 1].timestamp - segment[0].timestamp)}
              </Table.Cell>
              <Table.Cell>
                {(function() {
                  const freqPairs = getFreqPairs(segment)
                  const best = getBest(freqPairs)
                  if (best.length > 4) {
                    return (
                      <>
                        {' '}
                        {best.map(_ => (
                          <>
                            <a href={`https://explorer.decentraland.org/?position=${_}`}>{_}</a>;&nbsp;
                          </>
                        ))}
                        and {freqPairs.length - 4} more
                      </>
                    )
                  } else {
                    return (
                      <>
                        {' '}
                        {best.map(_ => (
                          <>
                            <a href={`https://explorer.decentraland.org/?position=${_}`}>{_}</a>;&nbsp;
                          </>
                        ))}
                      </>
                    )
                  }
                })()}
              </Table.Cell>
              <Table.Cell>24.56</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  )
}

function mapToFrequency(cumm: any, item: any) {
  return { ...cumm, [item]: cumm[item] ? cumm[item] + 1 : 1 }
}
function getParcel(item: any) {
  return `${Math.floor(item.position_x / 16)},${Math.floor(item.position_z / 16)}`
}

function getFreqPairs(segment: any) {
  const frequencyMap = segment.map(getParcel).reduce(mapToFrequency, {})
  const freqPairs = Object.keys(frequencyMap)
    .map(_ => [_, frequencyMap[_]])
    .sort((a, b) => a[1] - b[1])
  return freqPairs
}
function getBest(freqPairs: any) {
  const best = freqPairs.slice(Math.max(0, freqPairs.length - 5), freqPairs.length)
  return best.map(_ => _[0])
}

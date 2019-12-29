import { RootState } from 'dcl/kernel/core/types'
import { isValidNumber } from 'dcl/utils'
import React from 'react'
// import { Atlas as DCLAtlas } from 'decentraland-ui'

function generatecolor(name: string) {
  const r = (name.charCodeAt(3) * 431) % 256
  const g = (name.charCodeAt(4) * 431) % 256
  const b = (name.charCodeAt(5) * 431) % 256
  return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`
}
export type AtlasParams = RootState & { setCurrentScene: (sceneId: string) => void }

function createRange(from: number, length: number) {
  return Array.from(new Array(length)).map((_, index) => from + index)
}

function shortSceneName(name: string) {
  return name.substr(0, 5) + '...' + name.substr(name.length - 4)
}

export class Atlas extends React.Component<AtlasParams> {
  render() {
    const { setCurrentScene } = this.props
    if (!isValidNumber(this.props.userPosition.grid.x)) {
      debugger
      return <div />
    }
    const headers = createRange(
      this.props.userPosition.grid.x - this.props.userPosition.lineOfSightRadius,
      this.props.userPosition.lineOfSightRadius * 2 + 1
    ).map(index => <th key={'head_' + index}>{index}</th>)
    const rows = createRange(
      this.props.userPosition.grid.y - this.props.userPosition.lineOfSightRadius,
      this.props.userPosition.lineOfSightRadius * 2 + 1
    ).map(index => (
      <tr key={'row_' + index}>
        <td>
          <strong>{index}</strong>
        </td>
        {createRange(
          this.props.userPosition.grid.x - this.props.userPosition.lineOfSightRadius,
          this.props.userPosition.lineOfSightRadius * 2 + 1
        ).map(col => {
          const sceneId = this.props.positionToSceneId.positionToScene[`${col},${index}`]
          return (
            <td
              key={index + '_' + col + '_' + sceneId}
              style={{
                backgroundColor: generatecolor(sceneId ? shortSceneName(sceneId) : 'unknown')
              }}
            >
              {sceneId ? (
                <a href={`#${sceneId}`} onClick={ev => [setCurrentScene(sceneId), ev.preventDefault()]}>
                  {shortSceneName(sceneId)}
                </a>
              ) : (
                'unknown'
              )}
            </td>
          )
        })}
      </tr>
    ))
    return (
      <div>
        <h2>Atlas</h2>
        <table>
          <thead>
            <tr>
              <th> {/* empty */} </th>
              {headers}
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    )
  }
}

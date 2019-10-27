import * as React from 'react'
import { Segment } from '../../liteui/dcl'

export class StatusNav extends React.Component<{
  current: string
  tryStart: Function
}> {
  render() {
    return (
      <Segment>
        <div className="ui secondary fluid stackable menu" style={{ flexFlow: 'row wrap' }}>
          Console
        </div>
      </Segment>
    )
  }
}

import * as React from 'react'

export default class SystemNavComponent extends React.Component<{
  current: string
  tryStart: Function
}> {
  render() {
    return (
      <div className="ui secondary fluid stackable menu" style={{ flexFlow: 'row wrap' }}>
        Console
      </div>
    )
  }
}

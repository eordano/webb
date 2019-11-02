import { Segment, Stats } from 'decentraland-ui'
import React from 'react'

export const Overview = () => {
  return (
    <>
      <Segment>
        <h1>World Users</h1>
        <Stats title="Right now">2</Stats>
        <Stats title="1d">50</Stats>
        <Stats title="1w">100</Stats>
        <Stats title="1m">500</Stats>
      </Segment>
    </>
  )
}

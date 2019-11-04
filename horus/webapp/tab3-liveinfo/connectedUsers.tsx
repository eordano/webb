import { configureStore } from '@dcl/kernel/core/store'
import { Segment } from 'decentraland-ui'
import React, { useEffect } from 'react'

export function ConnectedUsers() {
  useEffect(() => {
    console.log(configureStore())
  })
  return <Segment style={{ width: '100%' }}></Segment>
}

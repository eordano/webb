import React from 'react'
import { Menu } from 'decentraland-ui'

export const LiveInfoMenu = () => {
  return (
    <Menu vertical>
      <Menu.Item>Current users</Menu.Item>
      <Menu.Item>User heatmap</Menu.Item>
      <Menu.Item>Chat</Menu.Item>
    </Menu>
  )
}

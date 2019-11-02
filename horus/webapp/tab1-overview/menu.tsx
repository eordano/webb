import { Menu } from 'decentraland-ui'
import React from 'react'

export const OverviewMenu = () => {
  return (
    <Menu vertical>
      <Menu.Item>
        <strong>Comms</strong>
      </Menu.Item>
      <Menu.Item>Users</Menu.Item>
      <Menu.Item>Deployments</Menu.Item>
      <Menu.Item>Scene State</Menu.Item>
      <Menu.Item>Giveaways</Menu.Item>
    </Menu>
  )
}

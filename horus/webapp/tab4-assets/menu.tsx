import { Menu } from 'decentraland-ui'
import React from 'react'

export const AssetsMenu = () => {
  return (
    <>
      <Menu vertical>
        <Menu.Header className='item'>Wearables</Menu.Header>
        <Menu.Item active>Basic Wearables</Menu.Item>
        <Menu.Item>Exclusive Masks</Menu.Item>
        <Menu.Item>Halloween</Menu.Item>
      </Menu>
      <Menu vertical>
        <Menu.Header className='item'>Builder</Menu.Header>
        <Menu.Item>Genesis City</Menu.Item>
      </Menu>
    </>
  )
}

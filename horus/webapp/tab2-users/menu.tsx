import React from 'react'
import { Container, Item, ItemHeader, Segment } from 'decentraland-ui'

export const UserMenu = () => {
  return (
    <Container>
      <Segment>
        <ItemHeader>Latest Users</ItemHeader>
        <Item>John</Item>
        <Item>Esteban</Item>
        <Item>Marco</Item>
      </Segment>
    </Container>
  )
}

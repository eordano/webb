import { Button, Container, Field, Header, HeaderMenu, Segment } from 'decentraland-ui'
import React from 'react'


export const InviteUsers = () => {
  return (
    <Container>
      <Segment style={{ width: '100%' }}>
        <HeaderMenu>
          <HeaderMenu.Left>
            <Header>Invite new user</Header>
          </HeaderMenu.Left>
          <HeaderMenu.Right>
            <Header sub>Environment: Production</Header>
          </HeaderMenu.Right>
        </HeaderMenu>
        <Field label="Address" placeholder="satoshi@nakamoto.net" type="email" value="" />
        <Button primary>Invite</Button>
      </Segment>
    </Container>
  )
}

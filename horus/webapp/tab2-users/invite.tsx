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
        <HeaderMenu>
          <HeaderMenu.Right>
            <Header sub><a href="https://manage.auth0.com/dashboard/us/decentraland/apis/5cd32415197e9808b4862ef5/explorer">Get your token</a></Header>
          </HeaderMenu.Right>
        </HeaderMenu>
        <Field label="Address" placeholder="satoshi@nakamoto.net" type="email" value="" />
        <Field label="Auth0 Token" placeholder="" value="" />
        <Button primary>Invite</Button>
      </Segment>
    </Container>
  )
}

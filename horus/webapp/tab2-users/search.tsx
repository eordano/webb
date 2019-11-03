import { Button, Container, Field, Header, HeaderMenu, Segment } from 'decentraland-ui'
import React, { useState } from 'react'


export const UserSearch = () => {
  const [searchParam, triggerSearch] = useState('')
  return (
    <Container>
      <Segment style={{ width: '100%' }}>
        <HeaderMenu>
          <HeaderMenu.Left>
            <Header>Find users</Header>
          </HeaderMenu.Left>
        </HeaderMenu>
        <Field
          label="Enter the user's email, ethereum address, claimed name, or userId"
          placeholder="satoshi@nakamoto.net"
          value={searchParam}
          onChange={ev => triggerSearch(ev.target.value)}
        />
        <Button primary disabled={!searchParam}>
          Search
        </Button>
      </Segment>
    </Container>
  )
}

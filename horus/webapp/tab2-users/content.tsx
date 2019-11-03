import { Address, Button, Container, Field, Header, HeaderMenu, Mana, Segment, Table } from 'decentraland-ui'
import React, { useState } from 'react'
import { redirectTo, routeFor } from '../route/redirectCache'


export const Users = () => {
  const [searchParam, triggerSearch] = useState('')
  const rows = [
    {
      userId: 'email|395728123451231',
      name: 'Satoshi',
      email: 'sathoshi@nakamoto.net',
      ethereumAddress: '0x00012345satoshidoesntdoethereum12837182',
      mana: 1000,
      lastConnection: new Date()
    },
    {
      userId: 'email|395728012351346',
      name: 'Satoshi',
      email: 'sathoshi@nakamoto.net',
      ethereumAddress: '0x00012345satoshidoesntdoethereum12837182',
      mana: 1000,
      lastConnection: new Date()
    },
    {
      userId: 'email|395728037502934',
      name: 'Satoshi',
      email: 'sathoshi@nakamoto.net',
      ethereumAddress: '0x00012345satoshidoesntdoethereum12837182',
      mana: 1000,
      lastConnection: new Date()
    }
  ]
  return (
    <Container>
      <Segment style={{ width: '100%' }}>
        <HeaderMenu>
          <HeaderMenu.Left>
            <Header>Search Results</Header>
          </HeaderMenu.Left>
        </HeaderMenu>
        <Table basic="very">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Claimed Name</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>Ethereum Address</Table.HeaderCell>
              <Table.HeaderCell>MANA balance</Table.HeaderCell>
              <Table.HeaderCell>Last Connected</Table.HeaderCell>
              <Table.HeaderCell>userId</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {rows.map(userInfo => {
              const { userId, name, email, ethereumAddress, mana, lastConnection } = userInfo
              const path = routeFor('Users', 'detail/' + userId)
              return (
                <tr key={userId}>
                  <Table.Cell><a href={path} onClick={redirectTo('Users', 'detail/' + userId)}>{name}</a></Table.Cell>
                  <Table.Cell>{email}</Table.Cell>
                  <Table.Cell>
                    <Address value={ethereumAddress} />
                  </Table.Cell>
                  <Table.Cell>
                    <Mana inline />
                    {mana}
                  </Table.Cell>
                  <Table.Cell>{lastConnection.toLocaleDateString()}</Table.Cell>
                  <Table.Cell>
                    <small>{userId.split('|')[0]}|</small>
                    <br />
                    <small>{userId.split('|')[1]}</small>
                  </Table.Cell>
                </tr>
              )
            })}
          </Table.Body>
        </Table>
      </Segment>
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

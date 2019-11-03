import React from 'react'

import { Header, HeaderMenu, Segment, Table } from 'decentraland-ui'

export function ConnectedUsers() {
  const rows = [
    {
      userId: 'email|395728123451231',
      name: 'Satoshi',
      email: 'sathoshi@nakamoto.net',
      position: '0,0',
      lastActivity: new Date()
    }
  ]
  return (
    <Segment style={{ width: '100%' }}>
      <HeaderMenu>
        <HeaderMenu.Left>
          <Header>Currently connected users</Header>
        </HeaderMenu.Left>
      </HeaderMenu>
      <Table basic="very">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Claimed name</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Current position</Table.HeaderCell>
            <Table.HeaderCell>Last activity</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {rows.map(userInfo => {
            const { name, email, lastActivity, position } = userInfo
            return (
              <Table.Row key={name}>
                <Table.Cell>{name}</Table.Cell>
                <Table.Cell>{email}</Table.Cell>
                <Table.Cell>{position}</Table.Cell>
                <Table.Cell>{lastActivity.toLocaleDateString()}</Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table>
    </Segment>
  )
}

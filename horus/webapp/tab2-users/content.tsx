import { Address, Container, Field, HeaderMenu, Pagination, Segment, Table } from 'decentraland-ui'
import React, { useState } from 'react'
import { Link } from '../route/Link'
import { routeFor } from '../route/redirectCache'

export const Users = () => {
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
  const [searchParam, triggerSearch] = useState('')
  return (
    <Container>
      <Segment style={{ width: '100%' }}>
        <HeaderMenu>
          <div className="ui userSearch" style={{ width: '100%' }}>
            <Field
              fluid
              placeholder="Enter the user's email, ethereum address, claimed name, or userId"
              value={searchParam}
              focus={true}
              onChange={ev => triggerSearch(ev.target.value)}
            />
          </div>
        </HeaderMenu>
        <Table basic="very">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Claimed Name</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>Ethereum Address</Table.HeaderCell>
              <Table.HeaderCell>Last Connected</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {rows.map(userInfo => {
              const { userId, name, email, ethereumAddress, lastConnection } = userInfo
              const path = routeFor('Users', 'detail/' + userId)
              return (
                <tr key={userId}>
                  <Table.Cell>
                    <Link path={path}>
                      {name}
                      <br />
                      <small>{userId}</small>
                    </Link>
                  </Table.Cell>
                  <Table.Cell>{email}</Table.Cell>
                  <Table.Cell>
                    <Address value={ethereumAddress} />
                  </Table.Cell>
                  <Table.Cell>{lastConnection.toLocaleDateString()}</Table.Cell>
                  <Table.Cell></Table.Cell>
                </tr>
              )
            })}
          </Table.Body>
        </Table>
        <Pagination totalPages={10} siblingRange={2} activePage={5}></Pagination>
      </Segment>
    </Container>
  )
}

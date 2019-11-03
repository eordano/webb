import { Header, Address, Container, Table } from 'decentraland-ui'
import React from 'react'

export const LatestDeployments = () => {
    const data = [
    {base: '11,15', parcels: 10, name: 'My Scene', deployer: '0x138572349423', time: new Date()}
    ]
  return (
    <Container>
      <h1>Latest Deployments</h1>
      <Table basic="very">
        <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Scene Name</Table.HeaderCell>
          <Table.HeaderCell>Location</Table.HeaderCell>
          <Table.HeaderCell>Scene Size</Table.HeaderCell>
          <Table.HeaderCell>Deployer</Table.HeaderCell>
          <Table.HeaderCell>Time</Table.HeaderCell>
        </Table.Row>
        </Table.Header>
        <Table.Body>
        {
            data.map(_ => <Table.Row key={_.base}>
          <Table.Cell><Header>{_.name}</Header></Table.Cell>
          <Table.Cell><a href='#'>{_.base}</a></Table.Cell>
          <Table.Cell>{_.parcels}</Table.Cell>
          <Table.Cell><Address value={_.deployer}/></Table.Cell>
          <Table.Cell>{_.time.toLocaleString()}</Table.Cell>
        </Table.Row>
            )
        }
        </Table.Body>
      </Table>
    </Container>
  )
}

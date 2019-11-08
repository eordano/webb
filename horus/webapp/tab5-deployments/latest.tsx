import { Container, Header, Loader, Segment, Table } from 'decentraland-ui'
import React from 'react'
import { Link } from '../route/Link'
import { useFetch } from '../useFetch/useFetch'

export const LatestDeployments = () => {
  const { data, isLoading } = useFetch(`http://${window.location.hostname}:1338/deployments`)
  return (
    <Container>
      {isLoading || !data ? (
        <Loader />
      ) : (
        <Segment>
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
              {data.map(_ => (
                <Table.Row key={_.id}>
                  <Table.Cell>
                    <Header>
                      <Link path={`/scene/${_.cid}`}>{_.parcels}</Link>
                    </Header>
                  </Table.Cell>
                  <Table.Cell>
                    <a href="#">{_.origin}</a>
                  </Table.Cell>
                  <Table.Cell>{_.user_id}</Table.Cell>
                  <Table.Cell>
                    <span>{_.deployer} </span>
                  </Table.Cell>
                  <Table.Cell>{_.timestamp}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Segment>
      )}
    </Container>
  )
}

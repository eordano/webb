import { Address, Container, Loader, Segment, Table } from 'decentraland-ui'
import React from 'react'
import { englishTimeAgo } from 'dcl/jslibs/datefun/englishTimeAgo'
import { Link } from '../route/Link'
import { usePromise } from 'dcl/jslibs/hooks/usePromise'
import { deployments } from './deploymentsPromise'

export const LatestDeployments = () => {
  const { result, isLoading } = usePromise(() => deployments(), [])
  const now = new Date().getTime()
  return (
    <Container>
      {isLoading || !result ? (
        <Loader />
      ) : (
        <Segment>
          <h1>Latest Deployments</h1>
          <Table basic="very">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Scene Name</Table.HeaderCell>
                <Table.HeaderCell>Location</Table.HeaderCell>
                <Table.HeaderCell>Type</Table.HeaderCell>
                <Table.HeaderCell>Deployer</Table.HeaderCell>
                <Table.HeaderCell>Time</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {result.map(_ => (
                <Table.Row key={_.id}>
                  <Table.Cell>{_.name}</Table.Cell>
                  <Table.Cell>
                    <Link path={`/scenes/details/${_.cid}`}>
                      {_.parcels.slice(0, 15)}
                      {_.parcels.length >= 15 ? '...' : ''}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <a href="#">{_.origin}</a>
                  </Table.Cell>
                  <Table.Cell><Address value={_.user_id} /></Table.Cell>
                  <Table.Cell>{englishTimeAgo(now - new Date(_.timestamp).getTime())}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Segment>
      )}
    </Container>
  )
}

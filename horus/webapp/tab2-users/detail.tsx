import { PassportAsPromise } from 'dcl/kernel/passports/PassportAsPromise'
import { Profile } from 'dcl/kernel/passports/types'
import { Container, Grid, Loader, Segment, Table } from 'decentraland-ui'
import React, { useEffect, useState } from 'react'
import { store } from '../kernel/store'
import { WorldSessions } from './worldSessions'

export const UserDetail = (props: any) => {
  const userId = 'email|' + props.pathname.split('-')[1]
  const [profile, setProfile] = useState(undefined)

  useEffect(() => {
    ;(async function() {
      if (profile !== undefined) {
        return
      }
      setProfile(null)
      const response = await PassportAsPromise(store)(userId)
      setProfile(response)
    })()
  })
  if (!profile) {
    return <Loader />
  }
  const passport: Profile = profile
  return (
    <Container>
      <Segment style={{ width: '100%' }}>
        <Grid>
          <Grid.Row>
            <Grid.Column width={12}>
              <h1>{passport.name}</h1>
              <h5 style={{ marginTop: 0 }}>{passport.email}</h5>
              <h4>{userId}</h4>
            </Grid.Column>
            <Grid.Column width={4}>
              <img src={passport.snapshots.body} width="100%" />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <WorldSessions userId={userId} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <h3>Builder Scenes</h3>
              <h5>Latest editions</h5>
              <Table basic="very">
                <Table.Header>
                  <Table.HeaderCell>What</Table.HeaderCell>
                  <Table.HeaderCell>Stats</Table.HeaderCell>
                  <Table.HeaderCell>Deployed?</Table.HeaderCell>
                  <Table.HeaderCell>Link</Table.HeaderCell>
                </Table.Header>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>The Haunted House</Table.Cell>
                    <Table.Cell>45 objects, 10 kinds</Table.Cell>
                    <Table.Cell>No</Table.Cell>
                    <Table.Cell>
                      <a href="#">Preview</a>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <h3>Inventory</h3>
              <Table basic="very">
                <Table.Header>
                  <Table.HeaderCell></Table.HeaderCell>
                  <Table.HeaderCell>Item</Table.HeaderCell>
                  <Table.HeaderCell>Rarity (link)</Table.HeaderCell>
                  <Table.HeaderCell>Acquired</Table.HeaderCell>
                </Table.Header>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell></Table.Cell>
                    <Table.Cell>Halloween Mask</Table.Cell>
                    <Table.Cell>
                      <a href="#">#145</a>/<a href="#">400</a>
                    </Table.Cell>
                    <Table.Cell>4 days ago</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </Container>
  )
}

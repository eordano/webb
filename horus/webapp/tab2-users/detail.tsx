import { PassportAsPromise } from 'dcl/kernel/passports/PassportAsPromise'
import { Container, Grid, Icon, Segment, Table } from 'decentraland-ui'
import React, { useEffect, useState } from 'react'
import { store } from '../kernel/store'

export const UserDetail = (props: any) => {
  const userId = props.pathname.split('-')[1]
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
  return (
    <Container>
      <Segment style={{ width: '100%' }}>
        <Grid>
          <Grid.Row>
            <Grid.Column width={12}>
              <h1>John</h1>
              <h5 style={{ marginTop: 0 }}>jophn@doe.com</h5>
              <h4>email|5d384h13418203124</h4>
              <h5>
                Name claim: 56 days ago <a href="#">(link)</a>
              </h5>
              <p>
                No moderator notes attached to this user <Icon key="edit" />
              </p>
            </Grid.Column>
            <Grid.Column width={4}>
              <img src="/static/body.png" width="100%" />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <h3>World Sessions</h3>
              <Table basic="very">
                <Table.Header>
                  <Table.HeaderCell>When</Table.HeaderCell>
                  <Table.HeaderCell>Session Time</Table.HeaderCell>
                  <Table.HeaderCell>Parcels explored</Table.HeaderCell>
                  <Table.HeaderCell>Perf Score: (95th)</Table.HeaderCell>
                </Table.Header>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>2 days ago</Table.Cell>
                    <Table.Cell>3m:45s</Table.Cell>
                    <Table.Cell>
                      <a href="#">11,30</a>, <a href="#">50,60</a>, and 40 more
                    </Table.Cell>
                    <Table.Cell>24.56</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
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

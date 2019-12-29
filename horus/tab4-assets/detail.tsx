import { Button, Container, Grid, Segment, Table } from 'decentraland-ui'
import React from 'react'

export const AssetDetail = () => {
  return (
    <Container>
      <Segment style={{ width: '100%' }}>
        <Grid>
          <Grid.Row>
            <Grid.Column width={12}>
              <h1>Blue Star Earring</h1>
              <h4>
                Category: <strong>Earring</strong>
              </h4>
              <h4>
                Available for: <strong>Male</strong>, <strong>Female</strong>
              </h4>
              <h4>
                Category: <strong>Earring</strong>
              </h4>
              <h4>Behavior</h4>
              <h5>
                Hides: <strong>Earring</strong>
              </h5>
              <h5>
                Replaces: <strong>Earring</strong>
              </h5>
            </Grid.Column>
            <Grid.Column width={4}>
              <Button primary>Edit</Button>
              <br />
              <img src="/static/body.png" width="100%" />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <h3>Files</h3>
              <Table basic="very">
                <Table.Header>
                  <Table.HeaderCell></Table.HeaderCell>
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>Size</Table.HeaderCell>
                  <Table.HeaderCell></Table.HeaderCell>
                </Table.Header>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>
                      <img src="/static/head.png" />
                    </Table.Cell>
                    <Table.Cell>
                      thumbnail.png
                      <br />
                      <small>QmNLpwwWL2Y1FXRUBfDtvvX7xqX4fK57nnECwbyW4XH4mn</small>
                    </Table.Cell>
                    <Table.Cell>32kb</Table.Cell>
                    <Table.Cell>
                      <a href="#">Download</a>
                    </Table.Cell>
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

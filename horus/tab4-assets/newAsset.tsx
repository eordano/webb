import { Button, Container, Field, Grid, Segment, Table } from 'decentraland-ui'
import React from 'react'

export const NewAsset = () => {
  return (
    <Container>
      <Segment style={{ width: '100%' }}>
        <h1>New Asset</h1>
        <Grid>
          <Grid.Row>
            <Grid.Column width={16}>
              <Field label="id" />
              <Field label="collection" />
              <Field type="checkbox" label="exclusive" />
              <Field label="Open Sea Thumbnail" />
              <Field label="Open Sea Name" />
              <Field label="Open Sea Description" />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={12}>
              <h3>Files</h3>
            </Grid.Column>
            <Grid.Column width={4}>
              <Button secondary>Add File</Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
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

import { Container, Grid, Segment, Table } from 'decentraland-ui'
import React from 'react'

export const ListOnline = () => {
  return (
    <Container>
      <Segment style={{ width: '100%' }}>
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <h3>World Sessions</h3>
              <Table basic="very">
                <Table.Header>
                  <Table.HeaderCell>Who</Table.HeaderCell>
                  <Table.HeaderCell>Session Time</Table.HeaderCell>
                  <Table.HeaderCell>Position</Table.HeaderCell>
                  <Table.HeaderCell>Perf Score: (95th)</Table.HeaderCell>
                </Table.Header>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>ElonMusk</Table.Cell>
                    <Table.Cell>2m:45s</Table.Cell>
                    <Table.Cell>
                      <a href="#">11,30</a>: Koko Jones
                    </Table.Cell>
                    <Table.Cell>24.56</Table.Cell>
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

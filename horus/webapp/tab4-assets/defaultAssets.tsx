import { Container, Grid, Segment } from 'decentraland-ui'
import React from 'react'

export const DefaultAssets = () => {
  return (
    <Container>
      <h1>Assets</h1>
      <Grid>
        <Grid.Row>
        <Grid.Column width={1}>
        </Grid.Column>
        <Grid.Column width={4}>
          <Segment>Smart Items</Segment>
        </Grid.Column>
        <Grid.Column width={1}>
        </Grid.Column>
        <Grid.Column width={4}>
          <Segment>Wearables</Segment>
        </Grid.Column>
        <Grid.Column width={1}>
        </Grid.Column>
        <Grid.Column width={4}>
          <Segment>Static</Segment>
        </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  )
}

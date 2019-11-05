import { Container, Grid, Segment } from 'decentraland-ui'
import React from 'react'

export const DefaultAssets = () => {
  return (
    <Container>
      <h1>Assets</h1>
      <Grid>
        <Grid.Row>
          <Segment>Smart Itens</Segment>
          <Segment>Wearables</Segment>
          <Segment>Static</Segment>
        </Grid.Row>
      </Grid>
    </Container>
  )
}

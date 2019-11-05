import { Button, Container, Grid, Segment } from 'decentraland-ui'
import React from 'react'
import { redirectToRoute } from '../route/redirectCache'

export const DefaultAssets = () => {
  return (
    <Container>
      <Segment>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>
              <h1>Assets</h1>
            </Grid.Column>
            <Grid.Column width={2}></Grid.Column>
            <Grid.Column width={4}>
              <Button primary onClick={redirectToRoute('Assets', 'New asset')}>
                New Asset
              </Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={4}>
              <Segment>Smart Items</Segment>
            </Grid.Column>
            <Grid.Column width={4}>
              <Segment>Wearables</Segment>
            </Grid.Column>
            <Grid.Column width={4}>
              <Segment>Static</Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </Container>
  )
}

import { DataResponse } from 'dcl/descartes/datadog/getConnectedUsers'
import { Grid, Header, Loader, Segment, Stats, Button } from 'decentraland-ui'
import React from 'react'
import { useFetch } from '../useFetch/useFetch'
import { GraphUsersOverTime } from './graphUsersOverTime'

export const Overview = () => {
  const { data, isLoading } = useFetch('http://localhost:1338/comms/prod/users')
  return (
    <>
      <Segment style={{ paddingBottom: '0px' }}>
        <h1>World Users</h1>
        <Grid>
          <Grid.Column width={12}>
            {isLoading ? <Loader /> : <GraphUsersOverTime data={data as DataResponse} />}
          </Grid.Column>
          <Grid.Column width={3}>
            <Grid.Row>
              <Stats title="Right now">
                {isLoading || !data ? 'Loading...' : data.series[0].pointlist[data.series[0].pointlist.length - 1][1]}
              </Stats>
            </Grid.Row>
            <Grid.Row>
              <Button size="small" style={{ marginTop: '30px' }} primary>
                Scan location
              </Button>
            </Grid.Row>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment>
        <h1>Deployments</h1>
        <Stats title="2hr ago">
          <Header>
            <a href="#">33,14</a>
          </Header>
        </Stats>
        <Stats title="1d">10</Stats>
        <Stats title="1w">100</Stats>
        <Stats title="1m">500</Stats>
      </Segment>
      <Segment>
        <Header>
          <h2>Events</h2>
        </Header>
        <Segment>
          <h3>Hallowing NFT Giveaway</h3>
          <p>Runs over the weekend</p>
        </Segment>
      </Segment>
    </>
  )
}

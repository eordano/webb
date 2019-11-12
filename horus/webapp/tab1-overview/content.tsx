import { DataResponse } from 'dcl/descartes/datadog/getConnectedUsers'
import { Button, Grid, Header, Loader, Segment, Stats } from 'decentraland-ui'
import React from 'react'
import { routeFor } from '../route/redirectCache'
import { useFetch } from '../useFetch/useFetch'
import { GraphUsersOverTime } from './graphUsersOverTime'
import { Link } from '../route/Link'
import { englishTimeAgo } from '../datefun/englishTimeAgo'
import { getMillisEllapsed } from '../datefun/timeConstants'

function getSceneHash(response: any) {
  return response.cid
}

function getParcel(response: any) {
  return JSON.parse(response.parcels)[0]
}

export const Overview = () => {
  const { data, isLoading } = useFetch(`http://${window.location.hostname}:1338/comms/prod/users`)
  const { data: dep, isLoading: depLoad } = useFetch(`http://${window.location.hostname}:1338/dashboard/deployments`)
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
      {depLoad || !dep ? (
        <Loader />
      ) : (
        <Segment>
          <h1>Deployments</h1>
          <Stats title={englishTimeAgo(getMillisEllapsed(dep[3][0]))}>
            <Header>
              <Link path={routeFor('Scenes', 'Details', '/' + getSceneHash(dep[3][0]))}>{getParcel(dep[3][0])}</Link>
            </Header>
          </Stats>
          <Stats title="1d">
            <Header>{dep[2]}</Header>
          </Stats>
          <Stats title="1w">
            <Header>{dep[1]}</Header>
          </Stats>
          <Stats title="1m">
            <Header>{dep[0]}</Header>
          </Stats>
        </Segment>
      )}
    </>
  )
}

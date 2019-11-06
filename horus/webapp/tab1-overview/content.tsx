import { DataResponse } from 'dcl/descartes/datadog/getConnectedUsers'
import { Button, Grid, Header, Loader, Segment, Stats } from 'decentraland-ui'
import React from 'react'
import { routeFor } from '../route/redirectCache'
import { useFetch } from '../useFetch/useFetch'
import { GraphUsersOverTime } from './graphUsersOverTime'
import { Link } from '../route/Link'

const ONE_MINUTE = 60 * 1000
const ONE_HOUR = 60 * ONE_MINUTE
const ONE_DAY = 24 * ONE_HOUR
const ONE_WEEK = 7 * ONE_DAY

function englishTimeAgo(elapsed: number) {
  if (elapsed < ONE_MINUTE) {
    return 'seconds ago'
  }
  if (elapsed < ONE_HOUR) {
    return Math.round(elapsed / ONE_MINUTE).toFixed(0) + ' minutes ago'
  }
  if (elapsed < ONE_DAY) {
    return Math.round(elapsed / ONE_HOUR).toFixed(0) + ' hours ago'
  }
  if (elapsed < ONE_WEEK) {
    return Math.round(elapsed / ONE_DAY).toFixed(0) + ' days ago'
  }
  return Math.round(elapsed / ONE_WEEK).toFixed(0) + ' weeks ago'
}

function getMillisEllapsed(response: any) {
  return new Date().getTime() - new Date(response.timestamp).getTime()
}

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
              <Link path={routeFor('Scene', 'Detail', '/' + getSceneHash(dep[3][0]))}>{getParcel(dep[3][0])}</Link>
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

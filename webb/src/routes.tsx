import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch, withRouter } from 'react-router'
import Status from './components/status/StatusFrame'

function RouteDefinition() {
  return (
    <Switch>
      <Route path="/status" component={Status} />
      <Route path="/status/*" component={Status} />

      <Route component={Status} />
    </Switch>
  )
}

export const Routes = withRouter(connect()(RouteDefinition))

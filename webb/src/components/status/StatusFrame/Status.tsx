import React from 'react'
import { Route, Switch } from 'react-router'
import Console from '../Console'
import { StatusNav } from '../StatusNav'
import { Page, Grid, Row, Column } from '../../liteui/dcl'

export default (_: any) => (
  <Page>
    <StatusNav />
    <Grid>
      <Row>
        <Column>
          <Switch>
            <Route path="/*" exact={false} component={Console} />
          </Switch>
        </Column>
      </Row>
    </Grid>
  </Page>
)

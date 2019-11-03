import React from 'react'
import { Application } from '../route/Application'
import { routeFor } from '../route/redirectCache'
import { Through } from '../sail/sail'
import { DeploymentAtlas } from './deployAtlas'
import { LatestDeployments } from './latest'
import { DeploymentMenu } from './menu'
import { PoolScenes } from './poolScenes'
import { EmptyParcels } from './emptyParcels'

export const DeploymentsRoutes = [
  <Through
    key="rm"
    path="/deployments"
    renderer={(props: any) => (
      <Application key="default" section={'Deployments'} Content={DeploymentAtlas} Menu={DeploymentMenu} {...props} />
    )}
  />,
  <Through
    key="map"
    path={routeFor('Deployments', 'Map')}
    renderer={(props: any) => (
      <Application key="dm" section={'Deployments'} Content={DeploymentAtlas} Menu={DeploymentMenu} {...props} />
    )}
  />,
  <Through
    key="latest"
    path={routeFor('Deployments', 'Latest deployments')}
    renderer={(props: any) => (
      <Application
        key="dl"
        section={'Deployments'}
        subsection={'Latest deployments'}
        Content={LatestDeployments}
        Menu={DeploymentMenu}
        {...props}
      />
    )}
  />,
  <Through
    key="listuser"
    path={routeFor('Deployments', 'Empty parcels')}
    renderer={(props: any) => (
      <Application
        key="de"
        section={'Deployments'}
        subsection={'Empty parcels'}
        Content={EmptyParcels}
        Menu={DeploymentMenu}
        {...props}
      />
    )}
  />,
  <Through
    key="invite"
    path={routeFor('Deployments', 'Builder Scene Pool')}
    renderer={(props: any) => (
      <Application
        key="dp"
        section={'Deployments'}
        subsection={'Builder Scene Pool'}
        Content={PoolScenes}
        Menu={DeploymentMenu}
        {...props}
      />
    )}
  />
]

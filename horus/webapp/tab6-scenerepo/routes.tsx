import React from 'react'
import { Application } from '../route/Application'
import { routeFor } from '../route/redirectCache'
import { Through } from '../sail/sail'
import { PoolScenes } from './builderPool'
import { SceneDetail } from './detail'
import { EmptyParcels } from './emptyParcels'
import { ScenerepoMenu } from './menu'

export const SceneRoutes = [
  <Through
    key="s"
    path={routeFor('Scene Repo')}
    renderer={(props: any) => (
      <Application key="sr" section={'Scene Repo'} Content={PoolScenes} Menu={ScenerepoMenu} {...props} />
    )}
  />,
  <Through
    key="sbp"
    path={routeFor('Scene Repo', 'Builder Pool')}
    renderer={(props: any) => (
      <Application
        key="sr"
        section={'Scene Repo'}
        subsection="Builder Pool"
        Content={PoolScenes}
        Menu={ScenerepoMenu}
        {...props}
      />
    )}
  />,
  <Through
    key="sd"
    path={_ => _.startsWith('/scene/')}
    renderer={(props: any) => (
      <Application
        key="dd"
        section={'Deployments'}
        subsection={'Details'}
        Content={SceneDetail}
        Menu={ScenerepoMenu}
        {...props}
      />
    )}
  />,
  <Through
    key="semp"
    path={routeFor('Scene Repo', 'Empty parcels')}
    renderer={(props: any) => (
      <Application
        key="dp"
        section={'Scene Repo'}
        subsection={'Empty Parcels'}
        Content={EmptyParcels}
        Menu={ScenerepoMenu}
        {...props}
      />
    )}
  />
]

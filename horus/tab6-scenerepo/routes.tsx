import React from 'react'
import { Application } from '../route/Application'
import { routeFor } from '../route/redirectCache'
import { Through } from 'dcl/jslibs/sail'
import { PoolScenes } from './builderPool'
import { SceneDetail } from './detail'
import { EmptyParcels } from './emptyParcels'
import { ScenerepoMenu } from './menu'

export const SceneRoutes = [
  <Through
    key="s"
    path={routeFor('Scenes')}
    renderer={(props: any) => (
      <Application key="sr" section={'Scenes'} Content={PoolScenes} Menu={ScenerepoMenu} {...props} />
    )}
  />,
  <Through
    key="sbp"
    path={routeFor('Scenes', 'Builder Pool')}
    renderer={(props: any) => (
      <Application
        key="sr"
        section={'Scenes'}
        subsection="Builder Pool"
        Content={PoolScenes}
        Menu={ScenerepoMenu}
        {...props}
      />
    )}
  />,
  <Through
    key="sd"
    path={_ => _.startsWith('/scenes/details')}
    renderer={(props: any) => (
      <Application
        key="dd"
        section={'Scenes'}
        subsection={'Details'}
        Content={SceneDetail}
        Menu={ScenerepoMenu}
        {...props}
      />
    )}
  />,
  <Through
    key="semp"
    path={routeFor('Scenes', 'Empty parcels')}
    renderer={(props: any) => (
      <Application
        key="dp"
        section={'Scenes'}
        subsection={'Empty Parcels'}
        Content={EmptyParcels}
        Menu={ScenerepoMenu}
        {...props}
      />
    )}
  />
]

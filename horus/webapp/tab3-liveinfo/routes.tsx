import React from 'react'
import { Application } from '../route/Application'
import { routeFor } from '../route/redirectCache'
import { Through } from '../sail/sail'
import { ListOnline } from './listOnline'
import { ActivityMap } from './map'
import { LiveInfoMenu } from './menu'

export const LiveRoutes = [
  <Through
    key="liveDefaultonline"
    path={routeFor('Live info')}
    renderer={(props: any) => (
      <Application
        key="i"
        section="Live info"
        subsection="Online users"
        Content={ListOnline}
        Menu={LiveInfoMenu}
        {...props}
      />
    )}
  />,
  <Through
    key="liveonline"
    path={routeFor('Live info', 'Online users')}
    renderer={(props: any) => (
      <Application
        key="i"
        section="Live info"
        subsection="Online users"
        Content={ListOnline}
        Menu={LiveInfoMenu}
        {...props}
      />
    )}
  />,
  <Through
    key="invite"
    path={routeFor('Live info', 'Activity Map')}
    renderer={(props: any) => (
      <Application
        key="i"
        section={'Live info'}
        subsection={'Activity Map'}
        Content={ActivityMap}
        Menu={LiveInfoMenu}
        {...props}
      />
    )}
  />
]

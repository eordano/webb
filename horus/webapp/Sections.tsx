import React from 'react'
import ReactDOM from 'react-dom'
import { Application } from './route/Application'
import { Sail, Through } from './sail/sail'
import { Overview } from './tab1-overview/content'
import { Users } from './tab2-users/content'
import { UserMenu } from './tab2-users/menu'
import { UserRoutes } from './tab2-users/routes'
import { LiveInfo } from './tab3-liveinfo/content'
import { LiveInfoMenu } from './tab3-liveinfo/menu'
import { Assets } from './tab4-assets/content'
import { AssetsMenu } from './tab4-assets/menu'
import { DeploymentsRoutes } from './tab5-deployments/routes'

renderApp(
  <Sail>
    <Through
      path="/"
      catchAll
      renderer={(props: any) => <Application key="a" section={'Overview'} Content={Overview} {...props} />}
    />
    <Through
      path="/overview"
      renderer={(props: any) => <Application key="b" section={'Overview'} Content={Overview} {...props} />}
    />
    <Through
      path="/users"
      renderer={(props: any) => <Application key="c" section={'Users'} Menu={UserMenu} Content={Users} {...props} />}
    />
    <Through
      path="/live-info"
      renderer={(props: any) => (
        <Application key="d" section={'Live info'} Menu={LiveInfoMenu} Content={LiveInfo} {...props} />
      )}
    />
    <Through
      path="/assets"
      renderer={(props: any) => (
        <Application key="e" section={'Assets'} Content={Assets} Menu={AssetsMenu} {...props} />
      )}
    />
    {...UserRoutes}
    {...DeploymentsRoutes}
  </Sail>
)

export function renderApp(paths: any) {
  ReactDOM.render(paths, document.getElementById('root'))
}

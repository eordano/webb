import React from 'react'
import ReactDOM from 'react-dom'
import { Application } from './route/Application'
import { Sail, Through } from './sail/sail'
import { Overview } from './tab1-overview/content'
import { Users } from './tab2-users/content'
import { UserMenu } from './tab2-users/menu'
import { UserRoutes } from './tab2-users/routes'
import { LiveRoutes } from './tab3-liveinfo/routes'
import { AssetRoutes } from './tab4-assets/routes'
import { DeploymentsRoutes } from './tab5-deployments/routes'
import { SceneRoutes } from './tab6-scenerepo/routes'

import { configureStore } from 'dcl/kernel/core/store'

const store = configureStore()
console.log(store)

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
    {...AssetRoutes}
    {...SceneRoutes}
    {...LiveRoutes}
    {...UserRoutes}
    {...DeploymentsRoutes}
  </Sail>
)

export function renderApp(paths: any) {
  ReactDOM.render(paths, document.getElementById('root'))
}

import React from 'react'
import { Application } from '../route/Application'
import { routeFor } from '../route/redirectCache'
import { Through } from '../sail/sail'
import { Assets } from './content'
import { DefaultAssets } from './defaultAssets'
import { AssetDetail } from './detail'
import { AssetsMenu } from './menu'

export const AssetRoutes = [
  <Through
    key="assetsdef"
    path={routeFor('Assets')}
    renderer={(props: any) => (
      <Application
        key="a"
        section="Assets"
        subsection="Show assets"
        Content={DefaultAssets}
        Menu={AssetsMenu}
        {...props}
      />
    )}
  />,
  <Through
    key="assetlist"
    path={_ => _.startsWith('/assets/') && !_.startsWith('/assets/detail') && !_.startsWith('/assets/admin')}
    renderer={(props: any) => <Application key="al" section="Assets" Content={Assets} Menu={AssetsMenu} {...props} />}
  />,
  <Through
    key="assetdetail"
    path={_ => _.startsWith('/assets/detail/')}
    renderer={(props: any) => (
      <Application key="i" section={'Assets'} Content={AssetDetail} Menu={AssetsMenu} {...props} />
    )}
  />
]

import React from 'react'
import { Application } from '../route/Application'
import { routeFor } from '../route/redirectCache'
import { Through } from 'dcl/jslibs/sail'
import { Assets } from './content'
import { DefaultAssets } from './defaultAssets'
import { AssetDetail } from './detail'
import { AssetsMenu } from './menu'
import { NewAsset } from './newAsset'

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
    key="an"
    path={routeFor('Assets', 'New Asset')}
    renderer={(props: any) => <Application key="al" section="Assets" Content={NewAsset} Menu={AssetsMenu} {...props} />}
  />,
  <Through
    key="assetlist"
    path={_ =>
      _.startsWith('/assets/') &&
      !_.startsWith('/assets/detail') &&
      !_.startsWith('/assets/admin') &&
      !_.startsWith('/assets/new-asset')
    }
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

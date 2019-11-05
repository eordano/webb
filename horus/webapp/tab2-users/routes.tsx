import React from 'react'
import { Application } from '../route/Application'
import { routeFor } from '../route/redirectCache'
import { Through } from '../sail/sail'
import { Users } from './content'
import { UserDetail } from './detail'
import { InviteUsers } from './invite'
import { UserMenu } from './menu'

export const UserRoutes = [
  <Through
    key="userId"
    path={(path: string) => path.startsWith('/users/detail')}
    renderer={(props: any) => <Application key="f" section={'Users'} Content={UserDetail} Menu={UserMenu} {...props} />}
  />,
  <Through
    key="search"
    path={routeFor('Users', 'Search')}
    renderer={(props: any) => (
      <Application key="i" section="Users" subsection="Search" Content={Users} Menu={UserMenu} {...props} />
    )}
  />,
  <Through
    key="invite"
    path={routeFor('Users', 'Invite')}
    renderer={(props: any) => (
      <Application key="i" section={'Users'} subsection={'Invite'} Content={InviteUsers} Menu={UserMenu} {...props} />
    )}
  />
]

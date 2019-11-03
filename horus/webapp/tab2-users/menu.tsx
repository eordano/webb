import React from 'react'
import { HorusMenu } from '../route/HorusMenu'

export const UserMenu = (props: any) => {
  return <HorusMenu {...props} defaultCurrent='List' names={[
    'Search',
    'List',
    'Invite'
  ]} />
}

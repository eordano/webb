import React from 'react'
import { HorusMenu } from '../route/HorusMenu'

export const LiveInfoMenu = (props: any) => {
  return <HorusMenu {...props} names={[{ title: 'Production' }, 'Online users', 'Activity Map']} />
}

import React from 'react'
import { HorusMenu } from '../route/HorusMenu'

export const DeploymentMenu = (props: { subsection: string, section: string }) => {
  return (
    <HorusMenu
      {...props}
      defaultCurrent='Map'
      names={['Map', 'Latest deployments', 'Empty parcels', 'Builder Scene Pool']}
    />
  )
}

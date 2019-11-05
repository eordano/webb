import React from 'react'
import { HorusMenu } from '../route/HorusMenu'

export const DeploymentMenu = (props: { subsection: string; section: string }) => {
  return (
    <HorusMenu
      {...props}
      defaultCurrent="Latest deployments"
      names={[{ title: 'Deployments' }, 'Latest deployments', 'Map']}
    />
  )
}

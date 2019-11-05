import { Tabs } from 'decentraland-ui'
import React from 'react'
import { redirectToRoute } from './redirectCache'
import { slugify } from './slugify'
export function HorusTabs(props: { section: string; subsection?: string }) {
  const { section } = props
  const Sections = ['Overview', 'Users', 'Live info', 'Assets', 'Deployments', 'Scene Repo']
  return (
    <Tabs>
      {Sections.map(name => {
        const slug = slugify(name)
        return (
          <Tabs.Tab key={slug} active={name === section} onClick={redirectToRoute(name)}>
            {name}
          </Tabs.Tab>
        )
      })}
    </Tabs>
  )
}

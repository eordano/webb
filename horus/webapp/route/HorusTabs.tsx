import React from 'react'
import { Tabs } from 'decentraland-ui'
import { slugify } from './slugify'
import { redirectTo } from './redirectCache'
export function HorusTabs(props: {
  section: string;
  subsection?: string;
}) {
  const { section } = props;
  const Sections = ['Overview', 'Users', 'Live info', 'Assets', 'Deployments'];
  return (<Tabs>
    {Sections.map(name => {
      const slug = slugify(name);
      return (<Tabs.Tab key={slug} active={name === section} onClick={redirectTo(name)}>
        {name}
      </Tabs.Tab>);
    })}
  </Tabs>);
}

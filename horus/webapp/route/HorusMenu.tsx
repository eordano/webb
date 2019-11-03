import { Menu } from 'decentraland-ui'
import React from 'react'
import { redirectTo } from './redirectCache'
import { slugify } from './slugify'

const and = ($: any, _: any) => $ && _
export function HorusMenu(props: { section: string; defaultCurrent?: string; names: string[]; subsection?: string }) {
  const { subsection, names, section, defaultCurrent } = props
  const isDefault = names.map(name => name === subsection).reduce(and, true)
  const defaultToFirst = !isDefault && names.map(name => name !== defaultCurrent).reduce(and, true)
  return (
    <Menu vertical>
      {names.map((name, index) => {
        const slug = slugify(name)
        const active = name === subsection || (isDefault && defaultCurrent === name) || (defaultToFirst && (index === 0))
        return (
          <Menu.Item key={slug} active={active} onClick={redirectTo(section, name)}>
            {name}
          </Menu.Item>
        )
      })}
    </Menu>
  )
}

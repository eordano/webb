import { Menu } from 'decentraland-ui'
import React from 'react'
import { redirectTo } from './redirectCache'
import { slugify } from './slugify'

const and = ($: any, _: any) => $ && _
export function HorusMenu(props: {
  section: string
  defaultCurrent?: string
  names: (string | any)[]
  subsection?: string
}) {
  const { subsection, names, section, defaultCurrent } = props
  const isDefault = names.map(name => name === subsection).reduce(and, true)
  const defaultToFirst = !isDefault && names.map(name => name !== defaultCurrent).reduce(and, true)
  return (
    <Menu vertical>
      {names.map((value, index) => {
        if (typeof value === 'string') {
          return SimpleItem(value, index, {
            isDefault,
            defaultCurrent,
            defaultToFirst,
            subsection,
            section
          })
        }
        if (typeof value === 'object') {
          return SimpleItem(value.title, index, {
            isDefault,
            isHeader: true,
            defaultCurrent,
            defaultToFirst,
            subsection,
            section
          })
        }
      })}
    </Menu>
  )
}

function SimpleItem(name: string, index: number, options: any) {
  const { subsection, isHeader, isDefault, defaultCurrent, section, defaultToFirst } = options
  const slug = slugify(name)
  const active = name === subsection || (isDefault && defaultCurrent === name) || (defaultToFirst && index === 0)
  const Clazz = isHeader ? Menu.Header : Menu.Item
  const additionalOptions = isHeader ? { className: 'item' } : {}
  return (
    <Clazz key={slug} active={active ? 'active' : ''} onClick={redirectTo(section, name)} { ...additionalOptions}>
      {name}
    </Clazz>
  )
}

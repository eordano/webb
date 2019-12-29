import React from 'react'
import { redirectTo } from './redirectCache'

export function Link(props: { path: string; children?: any }) {
  if (!Array.isArray(props.children)) {
    return (
      <a href={props.path} onClick={redirectTo(props.path)} {...props}>
        {props.children}
      </a>
    )
  }
  return (
    <a href={props.path} onClick={redirectTo(props.path)} {...props}>
      {...props.children}
    </a>
  )
}

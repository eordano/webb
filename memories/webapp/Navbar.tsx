import React from 'react'
import { daySort } from './daySort'
export function Navbar(props: { id: string; episodeList: string[]; hideLast?: boolean }) {
  const { episodeList } = props
  const id = decodeURIComponent(props.id)
  const sorted = typeof episodeList === 'object' ? episodeList.filter(_ => !!_).sort(daySort) : []
  const current = sorted.indexOf(id)
  return (
    <>
      {current > 0 && (
        <a className='navbar' href={'/ep/' + sorted[current - 1]}>
          &lt; back
        </a>
      )}
      <a
        className='navbar'
        href={'/ep/' + sorted.filter(_ => _ != id)[Math.floor(Math.random() * (sorted.length - 1))]}
      >
        🎲
      </a>
      {current < sorted.length - 1 && (
        <a className='navbar' href={'/ep/' + sorted[current + 1]}>
          next &gt;
        </a>
      )}
    </>
  )
}

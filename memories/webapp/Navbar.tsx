import React from 'react'
export function Navbar(props: { id: string; episodeList: string[] }) {
  const { episodeList } = props
  const id = decodeURIComponent(props.id)
  const sorted = typeof episodeList === 'object' ? episodeList.filter(_ => !!_).sort() : []
  const current = sorted.indexOf(id)
  console.log(current, 'afe', id, sorted)
  return (
    <>
      {current > 0 && (
        <a className='navbar' href={'/ep/' + sorted[0]}>
          &lt;&lt; first{' '}
        </a>
      )}
      {current > 0 && (
        <a className='navbar' href={'/ep/' + sorted[current - 1]}>
          &lt; back
        </a>
      )}
      <a className='navbar' href={'/ep/' + sorted[Math.floor(Math.random() * sorted.length)]}>
        🎲
      </a>
      {current < sorted.length - 1 && (
        <a className='navbar' href={'/ep/' + sorted[current + 1]}>
          next &gt;
        </a>
      )}
      {current < sorted.length - 1 && (
        <a className='navbar' href={'/ep/' + sorted[sorted.length - 1]}>
          last &gt; &gt;
        </a>
      )}
    </>
  )
}

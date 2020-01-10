import React, { useEffect, useState } from 'react'
import { Navbar } from './Navbar'
export function Episode(props) {
  const { pathname } = props
  const id = decodeURIComponent(pathname.split('/')[2])
  const [data, setData] = useState()
  useEffect(() => {
    if (data === undefined) {
      setData('loading')
    }
    if (data === 'loading') {
      return
    }
    if (typeof data === 'object') {
      return
    }
    ;(async function() {
      const request = await fetch(`/api/ep/${id}`)
      const body = await request.json()
      setData(body)
    })()
  })
  const [episodeList, setEpisodeList] = useState()
  useEffect(() => {
    if (episodeList === undefined) {
      setEpisodeList('loading')
    }
    if (episodeList === 'loading') {
      return
    }
    if (typeof episodeList === 'object') {
      return
    }
    ;(async function() {
      const request = await fetch('/api/list')
      const body = await request.json()
      setEpisodeList(body)
    })()
  })
  return (
    <div key='index'>
      <h3>
        <a href='/'>Memorias Fragmentadas</a>
      </h3>
      <h4>
        <Navbar id={id} episodeList={episodeList} />
      </h4>
      {data === 'loading' || data === undefined ? (
        'Loading..'
      ) : (
        <div>
          <h1>{data.id}</h1>
          <div className='content'>{data.episode}</div>
        </div>
      )}
    </div>
  )
}

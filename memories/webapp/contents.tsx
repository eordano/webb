import React, { useEffect, useState } from 'react'
import { Navbar } from './Navbar'
import { daySort } from './daySort'

export function Index() {
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
      const request = await fetch('/api/list')
      const body = await request.json()
      setData(body)
    })()
  })
  return (
    <div key='index'>
      <h1>Memorias Fragmentadas</h1>
      <div className='apertura'>
        <p>
          En una memoria fragmentada, aquello que se supone real pierde sentido
          <br />y engendra entendimiento
        </p>
        <p>
          Cualquier día es un final
          <br />
          Cualquier día es un inicio
        </p>
        <p>Círculos dentro de círculos</p>
        <p>
          El tiempo uno solo
          <br />Y el caos vida
        </p>
      </div>
      {data === 'loading' || data === undefined ? (
        'Loading..'
      ) : (
        <Navbar episodeList={data.sort(daySort)} id='Apertura' hideLast={true} />
      )}
    </div>
  )
}

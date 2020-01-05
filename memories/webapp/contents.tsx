import React, { useState, useEffect } from 'react'

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
      const request = await fetch('http://localhost:8000/list')
      const body = await request.json()
      setData(body)
    })()
  })
  return (
    <div key='index'>
      <h1>Memorias Fragmentadas</h1>
      <ul>{data === 'loading' || data === undefined ? 'Loading..' : data.map(_ => <li key={`_${_}`}>{_}</li>)}</ul>
      <form action='http://localhost:8000/steps' method='POST'>
        <div>
          <label htmlFor='id'>Episode name:</label>
          <br />
          <input name='id'></input>
        </div>
        <div>
          <label htmlFor='body'>Content:</label>
          <br />
          <textarea name='body'></textarea>
        </div>
        <input type='hidden' name='add' value='true'></input>
        <div>
          <button>Submit</button>
        </div>
      </form>
    </div>
  )
}

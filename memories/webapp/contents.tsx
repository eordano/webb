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
      const request = await fetch('/api/list')
      const body = await request.json()
      setData(body)
    })()
  })
  const [addVisible, setAdd] = useState(false)
  return (
    <div key='index'>
      <h1>Memorias Fragmentadas</h1>
      <ul>
        {data === 'loading' || data === undefined
          ? 'Loading..'
          : data.sort().map(_ => (
              <li key={`_${_}`}>
                <a href={`/ep/${_}`}>{_}</a>
              </li>
            ))}
      </ul>

      <button className='addButton' onClick={() => setAdd(true)} style={{ display: addVisible ? 'none' : 'block' }}>
        Add Chapter
      </button>
      <form action='/api/steps' method='POST' style={{ display: addVisible ? 'block' : 'none' }}>
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

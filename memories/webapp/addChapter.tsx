import React, { useEffect, useState } from 'react'

export function AddChapter(props: any) {
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
      <form action='/api/steps' className='addChapter' method='POST' >
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
          <button className='learn-more'>
            <span className='circle'>
              <span className='icon arrow'></span>
            </span>
            <span className='button-text'>Submit</span>
          </button>
        </div>
      </form>
    </div>
  )
}

import React, { useEffect, useState } from 'react'
import { Navbar } from './Navbar'
export function Episode(props) {
  const { pathname } = props
  const id = decodeURIComponent(pathname.split('/')[2])
  const [data, setData] = useState()
  const [showEdit, setEdit] = useState()
  const [newName, setNewName] = useState(id)
  const [newBody, setNewBody] = useState(data)
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
      setNewBody(body.episode)
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
      <h3><a href='/'>Memorias Fragmentadas</a></h3>
      <h4>
        <Navbar id={id} episodeList={episodeList} />
      </h4>
      {data === 'loading' || data === undefined ? (
        'Loading..'
      ) : (
        <div>
          <h1>{data.id}</h1>
          <div>{data.episode}</div>
        </div>
      )}
      <button className='editButton' style={{ display: showEdit ? 'none' : 'block' }} onClick={() => setEdit(true)}>
        Edit Chapter
      </button>
      <form action='/api/steps' className='addChapter' method='POST' style={{ display: showEdit ? 'block' : 'none' }}>
        <h4>Editing {newName}</h4>
        <div>
          <label htmlFor='id'>Episode name:</label>
          <br />
          <input name='new-id' value={newName} onChange={ev => setNewName(ev.target.value)}></input>
        </div>
        <div>
          <label htmlFor='body'>Content:</label>
          <br />
          <textarea name='body' value={newBody} onChange={ev => setNewBody(ev.target.value)}></textarea>
        </div>
        <input type='hidden' name='id' value={id}></input>
        <input type='hidden' name='edit' value='true'></input>
        <div>
          <button>Submit</button>
        </div>
      </form>
    </div>
  )
}

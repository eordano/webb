import React from 'react'
export function Navbar(props: { id: string }) {
  return (
    <>
      <a className='navbar' href='#prev'>&lt;&lt; first </a>
      <a className='navbar' href='#prev'>&lt; back</a>
      <a className='navbar' href='#prev'>🎲</a>
      <a className='navbar' href='#prev'>next &gt;</a>
      <a className='navbar' href='#prev'>last &gt; &gt;</a>
    </>
  )
}

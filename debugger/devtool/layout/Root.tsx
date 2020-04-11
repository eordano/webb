import React from 'react'

function Sidebar(props: { children: any }) {
  return <div className='sidebar'>{...props.children}</div>
}
function MainContent(props: { children: any }) {
  return <div className='main-content'>{...props.children}</div>
}
`.root-panel {

}`

export function Root(props: { panel: Window; sidebar: any; mainContent: any }) {
  return (
    <div className='root-panel'>
      <Sidebar {...props.sidebar} />
      <MainContent {...props.mainContent} />
    </div>
  )
}

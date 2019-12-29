import React from 'react'
import { HorusMenu } from '../route/HorusMenu'

export const AssetsMenu = (props: any) => {
  return (
    <>
      <HorusMenu
        {...props}
        names={[{ title: 'Wearable Collections' }, 'Basic Wearables', 'Exclusive Masks', 'Halloween']}
      />
      <HorusMenu {...props} names={[{ title: 'Builder' }, 'Genesis City', 'Year of the Pig', 'Sci-fi', 'Fantasy']} />
      <HorusMenu {...props} names={[{ title: 'Administration' }, 'New asset', 'New collection', 'Issue NFTs']} />
    </>
  )
}

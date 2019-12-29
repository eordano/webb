import { Atlas, Container } from 'decentraland-ui'
import React from 'react'

export const ActivityMap = (props: any) => {
  return (
    <Container>
      <h1>Most active areas</h1>
      <Atlas height={700} />
    </Container>
  )
}

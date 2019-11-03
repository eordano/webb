import { Container, Segment } from 'decentraland-ui'
import React from 'react'

export const UserDetail = (props: any) => {
  return (
    <Container>
      <Segment style={{ width: '100%' }}>
        <h1>Detail for {JSON.stringify(props)}</h1>
      </Segment>
    </Container>
  )
}

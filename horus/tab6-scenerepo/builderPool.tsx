import { Container, Loader, Segment } from 'decentraland-ui'
import React, { useEffect, useState } from 'react'

export const PoolScenes = () => {
  const [pool, setPool] = useState(undefined)
  useEffect(() => {
    ;(async function() {
      if (pool !== undefined) {
        return
      }
      setPool('loading')
    })()
  })
  return (
    <Container>
      <Segment>
        <h1>Pool Scenes</h1>
        {!pool || pool === 'loading' ? <Loader /> : <pre>JSON.stringify(pool)</pre>}
      </Segment>
    </Container>
  )
}

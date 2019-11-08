import { restoreSession } from 'dcl/kernel/auth/actions'
import { getAccessToken, isLoggedIn } from 'dcl/kernel/auth/selectors'
import { waitFor } from 'dcl/kernel/core/store'
import { Container, Loader, Segment } from 'decentraland-ui'
import React, { useEffect, useState } from 'react'
import { store } from '../kernel/store'

export const PoolScenes = () => {
  const [pool, setPool] = useState(undefined)
  useEffect(() => {
    ;(async function() {
      if (pool !== undefined) {
        return
      }
      setPool('loading')
      store.dispatch(restoreSession())
      await waitFor(store, isLoggedIn)
      const token = getAccessToken(store.getState())
      const result = await fetch(
        'https://builder-api.decentraland.org/v1/projects/d81388bc-5539-4958-beac-05b49ac9f8bb/public',
        {
          headers: {
            Authorization: 'Bearer ' + token
          }
        }
      )
      console.log(result, await result.json())
      setPool(result)
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

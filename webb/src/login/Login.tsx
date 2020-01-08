import { enableWeb3 } from 'dcl/decentraland/c2-data/web3/browser/unlockWeb3'
import React, { useEffect, useState } from 'react'

export function Login(props: {}) {
  const [status, setStatus] = useState()
  useEffect(() => {
    ;(async () => {
      if (status === undefined) {
        setStatus('loading')
        const result = await enableWeb3()
        setStatus(result)
      }
    })()
  })
  return (
    <div>
      <ul>
        <li>Checking Web3: {status} </li>
      </ul>
    </div>
  )
}

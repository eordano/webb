import { Store } from 'redux'
import { useState, useEffect } from 'react'

export function useStore2(store: Store) {
    const [state, setState] = useState(store.getState())
    useEffect(() => {
        return store.subscribe(() => {
            setState(store.getState())
        })
    })
    return [state, store.dispatch.bind(store)]
}

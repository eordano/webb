import { Store } from 'redux'
import { passportRequest } from './actions'
import { getProfile } from './selectors'
import { Profile } from './types'

export function PassportAsPromise(store: Store) {
  return async function(userId: string, version?: number): Promise<Profile> {
    const existingProfile = getProfile(store.getState(), userId)
    if (existingProfile && (!version || existingProfile.version >= version)) {
      return Promise.resolve(existingProfile)
    }
    return new Promise(resolve => {
      const unsubscribe = store.subscribe(() => {
        const profile = getProfile(store.getState(), userId)
        if (profile) {
          unsubscribe()
          return resolve(profile)
        }
        // TODO (eordano, 16/Sep/2019): Timeout or catch errors
      })
      store.dispatch(passportRequest(userId))
    })
  }
}

import { Store } from 'redux'
import { RootState } from '../reducers'

import { Profile } from '../passports/types'
import { getProfile } from '../passports/selectors'
import { passportRequest } from '../passports/actions'

/**
 * This API provides a different way to access the redux store which would be more familiar
 * to users expecting a Object-Oriented access mechanism to the data stored by the kernel.
 */

export class ClientKernel {
  constructor(private store: Store<RootState>) {}

  profile(userId: string, version?: number): Promise<Profile | undefined> {
    const existingProfile = getProfile(this.store.getState(), userId)
    if (existingProfile && (!version || existingProfile.version >= version)) {
      return Promise.resolve(existingProfile)
    }
    return new Promise(resolve => {
      const unsubscribe = this.store.subscribe(() => {
        const profile = getProfile(this.store.getState(), userId)
        if (profile) {
          unsubscribe()
          return resolve(profile)
        }
        // TODO (eordano, 16/Sep/2019): Timeout or catch errors
      })
      this.store.dispatch(passportRequest(userId))
    })
  }
}

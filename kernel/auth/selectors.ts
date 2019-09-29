import { createSelector } from 'reselect'

import { AuthState, RootAuthState } from './types'
import { AUTH_REQUEST } from './actions'

export function isTokenExpired(expiresAt: number | Date | string) {
  const value =
    typeof expiresAt === 'number'
      ? expiresAt
      : typeof expiresAt === 'string'
      ? new Date(expiresAt).getTime()
      : expiresAt.getTime
      ? expiresAt.getTime()
      : expiresAt
  return value > 0 && value < Date.now()
}

export const getMyCurrentUserId = (state: RootAuthState) => (isLoggedIn(state) ? getSub(state) : null)

/**
 * Accessors for the actual tokens used in requests and by the user
 */
export const getCommsToken = (state: RootAuthState) => state.auth.commsToken
export const getEphemeralKey = (state: RootAuthState) => state.auth.ephemeral

export const getState = (state: RootAuthState) => state.auth
export const getData = (state: RootAuthState) => state.auth.data
export const getLoading = (state: RootAuthState) => state.auth.loading
export const isLoggedIn = (state: RootAuthState) => getData(state) !== null
export const isLoggingIn = (state: RootAuthState) => state.loading.includes(AUTH_REQUEST)
export const getIdToken = createSelector<RootAuthState, AuthState['data'], string | null>(
  getData,
  data => (data ? data.idToken : null)
) as (store: any) => string
export const getAccessToken = createSelector<RootAuthState, AuthState['data'], string | null>(
  getData,
  data => (data ? data.accessToken : null)
) as (store: any) => string
export const getSub = createSelector<RootAuthState, AuthState['data'], string | null>(
  getData,
  data => (data ? data.sub : null)
) as (store: any) => string

export const getCurrentUserId = getSub

export const getEmail = createSelector<RootAuthState, AuthState['data'], string | null>(
  getData,
  data => (data ? data.email : null)
) as (store: any) => string

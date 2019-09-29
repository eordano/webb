import { BasicEphemeralKey, EphemeralKey } from './ephemeral'

export type RootAuthState = { auth: AuthState; loading: any }

export type AuthState = {
  loading: string[]
  data: AuthData | null
  commsToken: string | null
  ephemeral: BasicEphemeralKey | EphemeralKey
  error: string | null
}

export type AuthData = {
  email: string
  sub: UserId
  idToken: string
  accessToken: string
  expiresAt: number
}

export type UserId = string

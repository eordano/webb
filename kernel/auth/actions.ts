import { action } from 'typesafe-actions'
import { AuthData } from './types'
import { EphemeralKey } from './ephemeral'

// Logout
export const LOGIN = 'Login'
export const login = (redirectUrl?: string) => action(LOGIN, { redirectUrl })
export type LoginAction = ReturnType<typeof login>

// Logout
export const LOGOUT = 'Logout'
export const logout = () => action(LOGOUT)
export type LogoutAction = ReturnType<typeof logout>

// Auth
export const AUTH_REQUEST = '[Request] Auth'
export const AUTH_SUCCESS = '[Success] Auth'
export const AUTH_FAILURE = '[Failure] Auth'

export const authRequest = () => action(AUTH_REQUEST)
export const authSuccess = (data: AuthData, redirectUrl: string | null) => action(AUTH_SUCCESS, { data, redirectUrl })
export const authFailure = (error: string) => action(AUTH_FAILURE, { error })

export type AuthRequestAction = ReturnType<typeof authRequest>
export type AuthSuccessAction = ReturnType<typeof authSuccess>
export type AuthFailureAction = ReturnType<typeof authFailure>

export const RESTORE_SESSION = '[Auth] Restore session'
export const restoreSession = () => action(RESTORE_SESSION)
export type RestoreSession = ReturnType<typeof restoreSession>

// Comms Token
export const TOKEN_REQUEST = '[Request] Comms token request'
export const TOKEN_SUCCESS = '[Success] Comms token request'
export const TOKEN_FAILURE = '[Failure] Comms token request'

export const tokenRequest = () => action(TOKEN_REQUEST)
export const tokenSuccess = (commsToken: string) => action(TOKEN_SUCCESS, { commsToken })
export const tokenFailure = (error: string) => action(TOKEN_FAILURE, { error })

export type TokenRequestAction = ReturnType<typeof tokenRequest>
export type TokenSuccessAction = ReturnType<typeof tokenSuccess>
export type TokenFailureAction = ReturnType<typeof tokenFailure>

// Ephemeral Token
export const EPHEMERAL_GET = '[Ephemeral] Ensure token'
export const EPHEMERAL_PUT = '[Ephemeral] Setting token'
export const EPHEMERAL_PRESENT = '[Ephemeral] Confirmed token present'

export const ephemeralGet = () => action(EPHEMERAL_GET)
export const ephemeralPut = (token: EphemeralKey) => action(EPHEMERAL_PUT, { token })
export const ephemeralPresent = (token: EphemeralKey) => action(EPHEMERAL_PRESENT, token)

export type EphemeralGet = ReturnType<typeof ephemeralGet>
export type EphemeralPut = ReturnType<typeof ephemeralPut>
export type EphemeralPresent = ReturnType<typeof ephemeralPresent>

// Ephemeral Token
export const COMMS_SIGNATURE_REQUEST = '[Comms + Sign] Signature request'
export const COMMS_SIGNATURE_SUCCESS = '[Comms + Sign] Signature success'

export const commsSignatureRequest = (message: string) => action(EPHEMERAL_GET, message)
export const commsSignatureSuccess = (bytes: Uint8Array) => action(EPHEMERAL_PUT, bytes)

export type commsSignatureRequestAction = ReturnType<typeof commsSignatureRequest>
export type commsSignatureSuccessAction = ReturnType<typeof commsSignatureSuccess>
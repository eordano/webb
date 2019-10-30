import auth0 from 'auth0-js'
import { getConfiguration, getServerConfigurations } from 'dcl/config'
import { ephemeralPresent, EPHEMERAL_PRESENT } from 'dcl/kernel/auth/actions'
import { AuthMessage, MessageType, Role } from 'dcl/protos/broker_pb'
import { AuthData as AuthDataProto } from 'dcl/protos/comms_pb'
import jwt from 'jsonwebtoken'
import { all, call, put, select, take, takeLatest } from 'redux-saga/effects'
import { v4 as uuid } from 'uuid'
import { authFailure, authSuccess, AUTH_FAILURE, AUTH_REQUEST, commsSignatureRequestAction, commsSignatureSuccess, COMMS_SIGNATURE_REQUEST, ephemeralGet, ephemeralPut, EphemeralPut, EPHEMERAL_GET, EPHEMERAL_PUT, LOGIN, login, LoginAction, LOGOUT, RESTORE_SESSION, tokenFailure, tokenSuccess, TOKEN_REQUEST } from './actions'
import { BasicEphemeralKey, EphemeralKey, getCurrentEpoch, MessageInput } from './ephemeral'
import { getAccessToken, getCommsToken, getEphemeralKey } from './selectors'
import { AuthData } from './types'
import { Buffer } from 'buffer'

export function* authSaga(): any {
  yield takeLatest(EPHEMERAL_GET, handleGetEphemeral)
  yield takeLatest(EPHEMERAL_PUT, handlePutEphemeralToPresent)
  yield takeLatest(COMMS_SIGNATURE_REQUEST, handleSignCommsMessage)
  const webAuth = new auth0.WebAuth({
    clientID: getConfiguration('AUTH0_CLIENT_ID'),
    domain: getConfiguration('AUTH0_DOMAIN'),
    redirectUri: getConfiguration('AUTH0_REDIRECT'),
    responseType: 'token id_token',
    audience: getConfiguration('AUTH0_AUDIENCE'),
    scope: 'openid email'
  })
  yield all([
    takeLatest(RESTORE_SESSION, handleRestoreSession),
    takeLatest(LOGIN, handleLogin),
    takeLatest(LOGOUT, handleLogout),
    takeLatest(AUTH_REQUEST, handleAuthRequest),
    takeLatest(AUTH_FAILURE, handleLogin),
    takeLatest(TOKEN_REQUEST, handleTokenRequest)
  ])
  function* handleRestoreSession() {
    try {
      const result = yield call(restoreSession)
      yield put(authSuccess(result, ''))
    } catch (e) {}
  }

  function restoreSession(): Promise<AuthData> {
    return new Promise((resolve, reject) => {
      webAuth.checkSession({}, (err, auth) => {
        if (err) {
          return reject(err)
        }
        return resolve({
          email: auth.idTokenPayload.email,
          sub: auth.idTokenPayload.sub,
          expiresAt: auth.expiresIn! * 1000 + new Date().getTime(),
          accessToken: auth.accessToken!,
          idToken: auth.idToken!
        } as AuthData)
      })
    })
  }

  function* handleLogin(action: LoginAction): any {
    const redirectUrl = action.payload.redirectUrl
    let options: auth0.AuthorizeOptions = {}
    if (redirectUrl) {
      const nonce = uuid()
      localStorage.setItem(nonce, redirectUrl)
      options.state = nonce
    }
    try {
      webAuth.authorize(options)
    } catch (e) {
      console.log(e)
    }
  }

  function* handleLogout(): any {
    webAuth.logout({
      returnTo: window.location.origin
    })
  }

  function* handleAuthRequest(): any {
    let data: AuthData
    let redirectUrl: string | null = null
    try {
      const result: CallbackResult = yield call(handleCallback)
      data = result.data
      redirectUrl = result.redirectUrl
    } catch (error) {
      try {
        data = yield call(restoreSession)
      } catch (error) {
        yield put(authFailure(error))
        return
      }
    }
    yield put(authSuccess(data, redirectUrl))
  }

  function handleCallback(): Promise<CallbackResult> {
    return new Promise((resolve, reject) => {
      webAuth.parseHash((err, auth) => {
        if (err) {
          reject(err)
          return
        }
        if (auth && auth.accessToken && auth.idToken) {
          webAuth.client.userInfo(auth.accessToken, (err, user) => {
            if (err) {
              reject(err)
              return
            }

            let redirectUrl = null
            if (auth.state) {
              redirectUrl = localStorage.getItem(auth.state)
              if (redirectUrl) {
                localStorage.removeItem(auth.state)
              }
            }

            const data: AuthData = {
              email: user.email!,
              sub: user.sub,
              expiresAt: auth.expiresIn! * 1000 + new Date().getTime(),
              accessToken: auth.accessToken!,
              idToken: auth.idToken!
            }
            resolve({ data, redirectUrl })
          })
        } else {
          reject(new Error('No access token found in the url hash'))
        }
      })
    })
  }

  function* handleTokenRequest(): any {
    const accessToken = yield select(getAccessToken)
    let ephemeral = yield select(getEphemeralKey)
    if (!ephemeral) {
      yield put(ephemeralGet())
      ephemeral = (yield take(EPHEMERAL_PRESENT)).payload
    }
    try {
      const request = yield call(fetchToken, accessToken, ephemeral)
      yield put(tokenSuccess(request))
    } catch (error) {
      yield put(tokenFailure(error))
    }
  }

  async function fetchToken(userToken: string, ephemeral: EphemeralKey) {
    const publicKey = ephemeral.key.publicKeyAsHexString
      ? ephemeral.key.publicKeyAsHexString()
      : ephemeral.key.publicKey.toString('hex')
    const response = await fetch(getServerConfigurations().auth + '/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_token: userToken, pub_key: publicKey })
    })
    if (!response.ok) {
      throw new Error('Invalid request to auth/token')
    }
    const token = await response.json()
    if (token.error) {
      throw new Error('Error parsing json response from auth/token')
    }
    const decoded = jwt.decode(token.access_token)
    if ((decoded as any).ephemeral_key !== publicKey) {
      throw new Error('Returned ephemeral key does not match our public key')
    }
    return token.access_token
  }
}

export function* handleGetEphemeral(): any {
  const token = yield select(getEphemeralKey)
  if (!token || (token as BasicEphemeralKey).hasExpired()) {
    const newEphemeral = BasicEphemeralKey.generateNewKey(getConfiguration('EPHEMERAL_KEY_TTL'))
    yield put(ephemeralPut(newEphemeral))
  } else {
    yield put(ephemeralPresent(token))
  }
}
export function* handlePutEphemeralToPresent(action: EphemeralPut): any {
  yield put(ephemeralPresent(action.payload.token))
}

export type CallbackResult = { data: AuthData; redirectUrl: string | null }

export async function fetchServerPublicKey() {
  return await (await fetch(getServerConfigurations().auth + '/public_key')).text()
}

export function* tryRestoreSession(): any {
  yield put(login())
}

export function* handleSignCommsMessage(action: commsSignatureRequestAction): any {
  let ephemeral = yield select(getEphemeralKey)
  let accessToken = yield select(getCommsToken)
  if (!ephemeral) {
    yield put(ephemeralGet())
    ephemeral = (yield take(EPHEMERAL_PRESENT)).payload
  }
  const timestamp = getCurrentEpoch()
  const message = MessageInput.fromMessage(Buffer.from(action.payload))
  const hash = yield call(() => message.timeBasedHash(timestamp))
  const signature = yield call(() => (ephemeral as BasicEphemeralKey).sign(hash))

  const authData = new AuthDataProto()
  const identity = `public key derived address: ${(ephemeral as BasicEphemeralKey).key.publicKeyAsHexString()}`
  authData.setSignature(signature)
  authData.setIdentity(identity)
  authData.setTimestamp(timestamp.toString())
  authData.setAccessToken(accessToken)
  const authMessage = new AuthMessage()
  authMessage.setType(MessageType.AUTH)
  authMessage.setRole(Role.CLIENT)
  authMessage.setBody(authData.serializeBinary())
  const messageBytes = authMessage.serializeBinary()

  yield put(commsSignatureSuccess(messageBytes))
}

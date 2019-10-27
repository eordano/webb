import { getServerConfigurations } from 'dcl/config'
import { expectSaga } from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import { call, select } from 'redux-saga/effects'
import { tokenRequest, TOKEN_SUCCESS } from '../../auth/actions'
import { MessageInput } from '../../auth/ephemeral'
import { getEphemeralKey } from '../../auth/selectors'
import { setBrokerConnection } from '../actions'
import { createWebRTCBroker } from './createWebRTCBroker'
import { setupWebRTCBroker } from './WebRTCSaga'


// export function* setupWebRTCBroker(): any {
//   const coordinatorURL = getServerConfigurations().worldInstanceUrl
//   const body = `GET:${coordinatorURL}`
//   yield put(tokenRequest())
//   const tokenSuccessAction = (yield take(TOKEN_SUCCESS)) as TokenSuccessAction
//   const accessToken = tokenSuccessAction.payload.commsToken
//   const msg = Buffer.from(body)
//   const input = MessageInput.fromMessage(msg)
//
//   const ephemeral = BasicEphemeralKey.generateNewKey(1000000)
// const connection = yield call(createWebRTCBroker, coordinatorURL, input, accessToken, ephemeral)
//   yield setBrokerConnection(connection)
// }

fdescribe('webrtc start saga', () => {
  it('initializes', async () => {
    const coordinatorURL = getServerConfigurations().worldInstanceUrl
    const msg = `GET${coordinatorURL}`
    // if const token is sent, then tokenSuccess('comms token')
    const connection = { data: 'dummy' }
    const input = MessageInput.fromMessage(Buffer.from(msg))
    const ephemeral = { data: 'eph' }
    await expectSaga(setupWebRTCBroker)
      .provide([
        [select(getEphemeralKey), ephemeral],
        [call(createWebRTCBroker,coordinatorURL, input, 'comms token', ephemeral as any), connection],
        [matchers.call.fn(createWebRTCBroker), connection]
      ])
      .put(tokenRequest())
      .take(TOKEN_SUCCESS)
      .call(createWebRTCBroker, msg, () => true, () => true, ephemeral)
      .put(setBrokerConnection(connection as any))
      .run()
  })
})

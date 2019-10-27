import { getServerConfigurations } from 'dcl/config'
import { ephemeralGet } from 'dcl/kernel/auth/actions'
import { expectSaga } from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import { call, take } from 'redux-saga/effects'
import { tokenRequest, TOKEN_SUCCESS, EPHEMERAL_PUT, tokenSuccess, ephemeralPut } from '../../auth/actions'
import { MessageInput } from '../../auth/ephemeral'
import { setBrokerConnection } from '../actions'
import { createWebRTCBroker } from './createWebRTCBroker'
import { setupWebRTCBroker } from './WebRTCSaga'

describe('webrtc start saga', () => {
  it('initializes', async () => {
    const coordinatorURL = getServerConfigurations().worldInstanceUrl
    const msg = `GET${coordinatorURL}`
    const connection = { data: 'dummy' }
    const input = MessageInput.fromMessage(Buffer.from(msg))
    const ephemeral = { data: 'eph' }
    await expectSaga(setupWebRTCBroker)
      .provide([
        [take(TOKEN_SUCCESS), tokenSuccess('comms token')],
        [take(EPHEMERAL_PUT), ephemeralPut(ephemeral as any)],
        [call(createWebRTCBroker,coordinatorURL, input, 'comms token', ephemeral as any), connection],
        [matchers.call.fn(createWebRTCBroker), connection]
      ])
      .put(tokenRequest())
      .put(ephemeralGet())
      .put(setBrokerConnection(connection as any))
      .run()
  })
})

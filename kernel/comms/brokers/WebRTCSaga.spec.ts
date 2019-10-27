import { ephemeralGet } from 'dcl/kernel/auth/actions'
import { expectSaga } from 'redux-saga-test-plan'
import { take } from 'redux-saga/effects'
import { ephemeralPut, EPHEMERAL_PUT, tokenRequest, tokenSuccess, TOKEN_SUCCESS } from '../../auth/actions'
import { setBrokerConnection } from '../actions'
import { setupWebRTCBroker } from './WebRTCSaga'

describe('webrtc start saga', () => {
  xit('initializes', async () => {
    // const coordinatorURL = getServerConfigurations().worldInstanceUrl
    // const msg = `GET${coordinatorURL}`
    const connection = { data: 'dummy' }
    // const input = MessageInput.fromMessage(Buffer.from(msg))
    const ephemeral = { data: 'eph' }
    await expectSaga(setupWebRTCBroker)
      .provide([
        [take(TOKEN_SUCCESS), tokenSuccess('comms token')],
        [take(EPHEMERAL_PUT), ephemeralPut(ephemeral as any)],
        // [call(createWebRTCBroker,coordinatorURL, input, 'comms token', ephemeral as any), connection],
        // [matchers.call.fn(createWebRTCBroker), connection]
      ])
      .put(tokenRequest())
      .put(ephemeralGet())
      .put(setBrokerConnection(connection as any))
      .run()
  })
})

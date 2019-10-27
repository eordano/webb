import { expectSaga } from 'redux-saga-test-plan'
import { select } from 'redux-saga/effects'
import { ephemeralPut, EPHEMERAL_PUT } from './actions'
import { handleGetEphemeral } from './sagas'
import { getEphemeralKey } from './selectors'

describe('auth saga: ephemeral', () => {
  it('replies with tokens', async () => {
    await expectSaga(handleGetEphemeral)
      .provide([[select(getEphemeralKey), null]])
      .put.like({ action: { type: EPHEMERAL_PUT } })
      .run()
  })
  it('replies the same token', async () => {
    const token = {
      hasExpired: () => false
    }
    await expectSaga(handleGetEphemeral)
      .provide([[select(getEphemeralKey), token]])
      .put(ephemeralPut(token as any))
      .run()
  })
})

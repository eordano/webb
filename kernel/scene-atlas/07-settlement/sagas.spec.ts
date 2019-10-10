import { expectSaga } from 'redux-saga-test-plan'
import { select } from 'redux-saga/effects'
import { userEnteredCoordinate } from '../01-user-position/actions'
import { getCurrentStringPosition } from '../02-parcel-sight/selectors'
import { getSightedScenesRunningReport, isSceneAtPositionRendereable } from '../06-scripts/selectors'
import { settlePosition, teleportToGridString, unsettlePosition } from './actions'
import { handleTeleport, tryToSettle } from './sagas'
import { isPositionSettled } from './selectors'

describe('position settlement saga', () => {
  it('do settle if running', async () => {
    await expectSaga(tryToSettle)
      .provide([
        [select(isPositionSettled), false],
        [select(getSightedScenesRunningReport), { '1,1': 'running' }]
      ])
      .put(settlePosition())
      .run()
  })
  it('do not settle if not running', async () => {
    await expectSaga(tryToSettle)
      .provide([[select(isPositionSettled), false], [select(getSightedScenesRunningReport), { '1,1': '' }]])
      .not.put(settlePosition())
      .run()
  })
  it('handles teleport gracefully if teleporting to running scene: dont trigger unsettle', async () => {
    await expectSaga(handleTeleport, teleportToGridString('1,1'))
      .provide([
        [select(getCurrentStringPosition), '0,0'],
        [select(isSceneAtPositionRendereable, '1,1'), true],
        [select(isPositionSettled), true]
      ])
      .not.put(unsettlePosition())
      .put(userEnteredCoordinate({ x: 1, y: 1 }))
      .run()
  })
  it('handles teleport gracefully: triggers unsettle if it was settled before', async () => {
    await expectSaga(handleTeleport, teleportToGridString('1,1'))
      .provide([
        [select(getCurrentStringPosition), '0,0'],
        [select(isSceneAtPositionRendereable, '1,1'), false],
        [select(isPositionSettled), true]
      ])
      .put(unsettlePosition())
      .put(userEnteredCoordinate({ x: 1, y: 1 }))
      .run()
  })
})

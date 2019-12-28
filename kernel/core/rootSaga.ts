import { fork } from 'redux-saga/effects'
import { passportSaga } from '../passports/sagas'
import { presenceSaga } from '../presence/sagas'
import { rendererSaga } from '../renderer/sagas'
import { gridPositionSaga } from '../scene-atlas/01-user-position/sagas'
import { parcelSightSaga } from '../scene-atlas/02-parcel-sight/sagas'
import { positionToSceneIdSaga } from '../scene-atlas/04-sceneId-resolution/sagas'
import { sceneIdToManifestSaga } from '../scene-atlas/05-sceneManifest-resolution/sagas'
import { rootSceneLifecycleSaga } from '../scene-atlas/06-scripts/sagas'
import { positionSettlementSaga } from '../scene-atlas/07-settlement/sagas'

export function* rootSaga(): any {
  yield fork(rootSceneLifecycleSaga)
  yield fork(sceneIdToManifestSaga)
  yield fork(positionToSceneIdSaga)
  yield fork(positionSettlementSaga)
  yield fork(parcelSightSaga)
  yield fork(gridPositionSaga)
  yield fork(rendererSaga)
  yield fork(passportSaga)
  yield fork(presenceSaga)
}

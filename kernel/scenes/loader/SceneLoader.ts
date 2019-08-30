import { EventEmitter } from 'events'
import { Vector2 } from '@dcl/utils'
import { SceneDataDownloadManager } from './SceneDataDownloadManager'
import { ParcelLifeCycleController } from './ParcelLifeCycleController'
import { SceneLifeCycleController } from './SceneLifeCycleController'

export class SceneLoader extends EventEmitter {
  downloadManager: SceneDataDownloadManager
  parcelController: ParcelLifeCycleController
  sceneController: SceneLifeCycleController

  constructor(contentServer: string, lineOfSightRadius: number) {
    super()
    this.downloadManager = new SceneDataDownloadManager({ contentServer })
    this.parcelController = new ParcelLifeCycleController({ lineOfSightRadius })
    this.sceneController = new SceneLifeCycleController({ downloadManager: this.downloadManager })
    // Internal hooks
    this.parcelController.on('Parcel.onSight', (parcels: string[]) => this.sceneController.onSight(parcels))
    this.parcelController.on('Parcel.lostSight', (parcels: string[]) => this.sceneController.lostSight(parcels))
    // External hooks
    this.sceneController.on('Scene.awake', (...args) => this.emit('Scene.awake', ...args))
    this.sceneController.on('Scene.start', (...args) => this.emit('Scene.start', ...args))
    this.sceneController.on('Scene.unload', (...args) => this.emit('Scene.unload', ...args))
  }

  getSceneForCoordinates(x: number | string, y: number | string) {
    return this.downloadManager.getParcelData(`${x},${y}`)
  }

  reportCurrentPosition(currentPosition: Vector2) {
    return this.parcelController.reportCurrentPosition(currentPosition)
  }
}

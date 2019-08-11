import { AssetSystem } from './impl/Assets'
import { SubsystemController } from './subsystems'
import { ConfigSystem } from './impl/Config'
import { AuthSystem } from './impl/Auth'
import { CommsSystem } from './impl/Comms'
import { PassportSystem } from './impl/Passport'
import { PeerPresenceSystem } from './impl/PeerPresence'
import { SocialModerationSystem } from './impl/SocialModeration'
import { InWorldAvatarSystem } from './impl/InWorldAvatars'
import { WorldMapSystem } from './impl/WorldMap'
import { SceneLoaderSystem } from './impl/SceneLoader'
import { SceneRunnerSystem } from './impl/SceneRunner'

export type Subsystems =
  | 'Assets'
  | 'Auth'
  | 'Comms'
  | 'Config'
  | 'Passports'
  | 'PeerPresence'
  | 'MyPresence'
  | 'SocialModeration'
  | 'InWorldAvatars'
  | 'WorldMap'
  | 'SceneLoader'
  | 'SceneRunner'

export class MainController {
  subsystems: SubsystemController[] = []
  indexedSystems: Map<string, SubsystemController> = new Map<
    string,
    SubsystemController
  >()

  constructor() {
    const config = new ConfigSystem('Config', [])
    this.indexedSystems.set('Config', config)
    const assets = new AssetSystem('Assets', [config])
    this.indexedSystems.set('Assets', assets)
    const auth = new AuthSystem('Auth', [config])
    this.indexedSystems.set('Auth', auth)
    const comms = new CommsSystem('Comms', [auth])
    this.indexedSystems.set('Comms', comms)
    const passports = new PassportSystem('Passports', [assets, auth])
    this.indexedSystems.set('Passports', passports)
    const presence = new PeerPresenceSystem('PeerPresence', [comms, passports])
    this.indexedSystems.set('PeerPresence', presence)
    const socialModeration = new SocialModerationSystem('SocialModeration', [
      passports
    ])
    this.indexedSystems.set('SocialModeration', socialModeration)
    const inworldAvatars = new InWorldAvatarSystem('InWorldAvatars', [
      comms,
      passports,
      socialModeration,
      presence,
      assets
    ])
    this.indexedSystems.set('InWorldAvatars', inworldAvatars)
    const worldMap = new WorldMapSystem('WorldMap', [config])
    this.indexedSystems.set('WorldMap', worldMap)
    const sceneLoader = new SceneLoaderSystem('SceneLoader', [
      worldMap,
      inworldAvatars
    ])
    this.indexedSystems.set('SceneLoader', sceneLoader)
    const sceneRunner = new SceneRunnerSystem('SceneRunner', [
      sceneLoader,
      inworldAvatars
    ])
    this.indexedSystems.set('SceneRunner', sceneRunner)
    this.subsystems = [
      assets,
      config,
      auth,
      comms,
      passports,
      presence,
      socialModeration,
      inworldAvatars,
      worldMap,
      sceneLoader,
      sceneRunner
    ]

    config.tryStart()
  }
}

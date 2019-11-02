import { ILogOpts, ScriptingTransport, EventSubscriber, WebWorkerTransport } from 'dcl/rpc'
import { inject, Script } from 'dcl/rpc'
import { IRendererParcelSceneToScript } from 'dcl/scene-api/interface/IRendererParcelSceneToScript'
import { GamekitScene } from './GamekitScene'
import { loadGamekitEntrypoint } from './loadGamekitEntrypoint'

export class APILoadedScriptGamekit extends GamekitScene {
  constructor(private factory: GamekitFactory) {
    super()
  }
  getSource(): Promise<string | void> {
    return loadGamekitEntrypoint(this.factory.loadAPIs)
  }
}

export class GamekitFactory extends Script {
  @inject('EngineAPI')
  engine!: IRendererParcelSceneToScript

  @inject('DevTools')
  devTools: any

  eventSubscriber!: EventSubscriber

  constructor(transport: ScriptingTransport, opt?: ILogOpts) {
    super(transport, opt)
  }

  _gamekit?: GamekitScene

  get gamekit(): GamekitScene {
    if (!this._gamekit) {
      this._gamekit = new APILoadedScriptGamekit(this)
      this._gamekit.engine = this.engine
      this._gamekit.devTools = this.devTools
    }
    return this._gamekit
  }

  systemDidEnable() {
    this.eventSubscriber = new EventSubscriber(this.engine)
    return this.gamekit.startLoop()
  }
}

export default new GamekitFactory(WebWorkerTransport(self as any))
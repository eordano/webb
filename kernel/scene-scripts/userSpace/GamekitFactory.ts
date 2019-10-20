import { Script } from "@dcl/rpc/client"
import { ILogOpts, ScriptingTransport } from '@dcl/rpc'
import { inject } from '@dcl/rpc/client'
import { GamekitScene } from './GamekitScene'
import { loadGamekitEntrypoint } from './loadGamekitEntrypoint'
import { IRendererParcelSceneToScript } from "../kernelSpace/IRendererParcelSceneToScript"

export class APILoadedScriptGamekit extends GamekitScene {
    constructor(private factory: GamekitFactory) {
        super()
    }
    async getSource(): Promise<string> {
        return loadGamekitEntrypoint(this.factory.loadAPIs)
    }
}

export class GamekitFactory extends Script {
  @inject('EngineAPI')
  engine: IRendererParcelSceneToScript

  @inject('DevTools')
  devTools: any

  constructor(transport: ScriptingTransport, opt?: ILogOpts) {
    super(transport, opt)
  }

  _gamekit: GamekitScene

  get gamekit(): GamekitScene {
      if (!this._gamekit) {
        this._gamekit = new APILoadedScriptGamekit(this)
        this._gamekit.engine = this.engine
        this._gamekit.devTools = this.devTools
      }
      return this._gamekit
  }

  async systemDidEnable() {
      return this._gamekit.startLoop()
  }
}
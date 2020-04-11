import { DecentralandInterface, DevTools } from 'dcl/scene-api'
import { IRendererParcelSceneToScript } from 'dcl/scene-api/interface/IRendererParcelSceneToScript'
import { ISceneRunningScript } from 'dcl/scene-api/interface/ISceneRunningScript'
import { defaultLogger, EntityAction } from 'dcl/utils'
import { BuildDCLInterface } from './DCLInterface/BuildDCLInterface'
import { BuildECSInterface } from './DCLInterface/BuildECSInterface'
import { customEval, getES5Context } from './sandbox'

const LOADING = 'loading'
const AWAKE = 'awake'
const RUNNING = 'running'

/**
 * Scripts contain custom logic that is executed outside of the context of the ScriptingHost. They can run either
 * locally using the Webworker transport, or in another server through HTTP Requests/Web Sockets.
 *
 * This is the class that runs all the magic (see `runFirstRound`)
 */
export abstract class GamekitScene implements ISceneRunningScript {
  rendererInterface!: IRendererParcelSceneToScript

  devTools: any
  devToolsAdapter?: DevTools

  outboundEventQueue: EntityAction[] = []
  status: typeof LOADING | typeof AWAKE | typeof RUNNING = LOADING

  dcl!: DecentralandInterface

  /**
   * Main lifecycle of the GamekitScene
   */
  setupLifecycle() {
    this.setupDCLInterface()
    this.setupDevtools()

    this.status = AWAKE
    ;(this.rendererInterface as any).on('sceneStart')

    try {
      this.runFirstRound().then(() => this.startSignal())
    } catch (error) {
      throw error
    }
  }

  /**
   * Merge together the core `dcl` functions (like `loadModule` to send messages to the main thread) and the more
   * GameKit specific functions (like `addEntity`)
   */
  protected setupDCLInterface() {
    Object.defineProperty(this, 'engine', {
      get: () => this.rendererInterface,
      enumerable: false,
    })
    this.dcl = { ...BuildDCLInterface(this), ...BuildECSInterface(this.outboundEventQueue) }
    this.fixupDeprecations()
  }

  protected sendBatch() {
    try {
      const batch = this.outboundEventQueue.slice()
      this.outboundEventQueue.length = 0
      this.rendererInterface.sendBatch(batch).catch((e: Error) => this.onError(e))
    } catch (e) {
      this.onError(e)
    }
  }

  abstract getSource(): Promise<string | void>

  runFirstRound() {
    return this.getSource()
      .then((source) => {
        if (!source) {
          throw new Error('Could not load source')
        }
        return customEval(source, getES5Context({ dcl: this.dcl }))
      })
      .catch((error) => {
        console.log(error)
      })
  }

  runStartFunctions() {
    for (let startFunction of this.onStartFunctions) {
      try {
        startFunction()
      } catch (e) {
        this.onError(e)
      }
    }
  }

  protected startSignal() {
    const handler = (name: string) => {
      if (name !== 'sceneStart') {
        return
      }

      this.status = RUNNING
      if (!this.managedUpdateCalls) {
        this.startLoop()
      }
      this.runStartFunctions()

      // Only run this handler once
      this.onEventFunctions.splice(this.onEventFunctions.indexOf(handler), 1)
    }
    this.dcl.subscribe('sceneStart')
    this.onEventFunctions.push(handler)

    this.enqueueInitMessagesFinished()

    this.sendBatch()

    this.rendererInterface.startSignal()
  }

  update(dt: number) {
    for (let updateFunction of this.onUpdateFunctions) {
      try {
        updateFunction(dt)
      } catch (e) {
        this.onError(e)
      }
    }
    this.sendBatch()
  }

  currentTimeout?: number = undefined
  targetFramesPerSecond = 30
  updateInterval = 1000 / this.targetFramesPerSecond

  startLoop() {
    const that = this
    let start = this.now()
    function update() {
      const now = that.now()
      const dt = now - start
      start = now
      that.currentTimeout = setTimeout(update, that.updateInterval) as any
      that.update(dt)
    }
    update()
  }

  now() {
    return new Date().getTime() / 1000
  }

  pauseLoop() {
    if (this.currentTimeout) {
      clearTimeout(this.currentTimeout)
    }
    this.currentTimeout = undefined
  }

  onStartFunctions: Array<Function> = []
  onUpdateFunctions: Array<(dt: number) => void> = []
  onEventFunctions: Array<(event: any) => void> = []

  fireEvent(event: any) {
    try {
      for (let trigger of this.onEventFunctions) {
        trigger(event)
      }
    } catch (e) {
      defaultLogger.error('', e)
    }
  }

  setupDevtools() {
    // this.devToolsAdapter = new DevTools(this.devTools)
  }

  /**
   * Set this member to `true` if you don't need `onUpdate` to be called.
   */
  managedUpdateCalls: boolean = false

  enqueueInitMessagesFinished() {
    this.outboundEventQueue.push({ type: 'SceneStarted', tag: 'scene', payload: '{}' })
  }

  fixupDeprecations() {
    /**
     * `manualUpdate` is now called `managedUpdateCalls`
     */
    Object.defineProperty(this, 'manualUpdate', {
      get: () => this.managedUpdateCalls,
      set: (value: boolean) => (this.managedUpdateCalls = value),
      enumerable: false,
    })
    Object.defineProperty(this, 'events', {
      get: () => this.outboundEventQueue,
      enumerable: false,
    })
  }

  onError(error: Error) {
    if (this.devToolsAdapter) {
      this.devToolsAdapter.logger.error(error.toString())
    } else {
      defaultLogger.error('', error)
    }
  }

  onLog(...messages: any[]) {
    if (messages[0].startsWith('The entity is already in the engine. Please fix this')) {
      return
    }
    if (this.devToolsAdapter) {
      this.devToolsAdapter.logger.error(JSON.stringify([...messages]))
    } else {
      defaultLogger.info('', ...messages)
    }
  }
}

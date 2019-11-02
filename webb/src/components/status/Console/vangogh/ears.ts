import { GamekitScene } from 'dcl/gamekit/GamekitScene'

export class PlainGameKit extends GamekitScene {
  constructor(public source: string) {
    super()
  }
  getSource(): Promise<string> {
    return Promise.resolve(this.source)
  }
}

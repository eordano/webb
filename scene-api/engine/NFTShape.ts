import { DisposableComponent } from '../ecs/Component'
import { Shape } from './Shape'
import { CLASS_ID } from './Components'
/**
 * @public
 */
@DisposableComponent('engine.shape', CLASS_ID.NFT_SHAPE)
export class NFTShape extends Shape {
  @Shape.readonly
  readonly src!: string
  constructor(src: string) {
    super()
    this.src = src
  }
}

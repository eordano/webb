import { DisposableComponent } from '../ecs/Component'
import { CLASS_ID } from './Components'
import { Shape } from './Shape'

/**
 * @public
 */
@DisposableComponent('engine.shape', CLASS_ID.GLTF_SHAPE)
export class GLTFShape extends Shape {
  @Shape.readonly
  readonly src!: string
  constructor(src: string) {
    super()
    this.src = src
  }
}

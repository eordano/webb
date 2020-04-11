import { DisposableComponent } from '../ecs/Component'
import { Shape } from './Shape'
import { CLASS_ID } from './Components'
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

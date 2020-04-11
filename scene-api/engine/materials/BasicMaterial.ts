import { ObservableComponent, DisposableComponent } from '../ecs/Component'
import { Texture } from './Texture'
import { CLASS_ID } from './Components'
/**
 * @public
 */
@DisposableComponent('engine.material', CLASS_ID.BASIC_MATERIAL)
export class BasicMaterial extends ObservableComponent {
  /**
   * The source of the texture image.
   */
  @ObservableComponent.component
  texture?: Texture
  /**
   * A number between 0 and 1.
   * Any pixel with an alpha lower than this value will be shown as transparent.
   */
  @ObservableComponent.field
  alphaTest: number = 0.5
}

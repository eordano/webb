import { ObservableComponent, DisposableComponent } from '../ecs/Component'
import { Shape } from './Shape'
import { CLASS_ID } from './Components'
/**
 * @public
 */
@DisposableComponent('engine.shape', CLASS_ID.CIRCLE_SHAPE)
export class CircleShape extends Shape {
  @ObservableComponent.field
  segments?: number
  @ObservableComponent.field
  arc?: number
}

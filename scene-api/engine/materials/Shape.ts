import { ObservableComponent } from '../../ecs/Component'
/**
 * @public
 */
export class Shape extends ObservableComponent {
  /**
   * Set to true to turn on the collider for the entity.
   * @alpha
   */
  @ObservableComponent.field
  withCollisions: boolean = false
  /**
   * Defines if the entity and its children should be rendered
   * @alpha
   */
  @ObservableComponent.field
  visible: boolean = true
}

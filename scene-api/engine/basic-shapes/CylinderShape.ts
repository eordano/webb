import { ObservableComponent, DisposableComponent } from '../ecs/Component'
import { Shape } from './Shape'
import { CLASS_ID } from './Components'
/**
 * @public
 */
@DisposableComponent('engine.shape', CLASS_ID.CYLINDER_SHAPE)
export class CylinderShape extends Shape {
  /**
   * The radius of the top of the cylinder. Defaults to 0.
   */
  @ObservableComponent.field
  radiusTop: number = 0
  /**
   * The radius of the base of the cylinder. Defaults to 1.
   */
  @ObservableComponent.field
  radiusBottom: number = 1
  /**
   * Sets the number of rings along the cylinder height (positive integer). Defaults to 1.
   */
  @ObservableComponent.field
  segmentsHeight: number = 1
  /**
   * Sets the number of cylinder sides (positive integer). Defaults to 36.
   */
  @ObservableComponent.field
  segmentsRadial: number = 36
  /**
   * Adds two extra faces per subdivision to enclose the cylinder around its height axis.
   * Defaults to false.
   */
  @ObservableComponent.field
  openEnded: boolean = false
  /**
   * Sets the radius of the top and bottom caps at once.
   *
   * Properties `radiusTop` and `radiusBottom` are prioritized over this one.
   */
  @ObservableComponent.field
  radius: number | null = null
  /**
   * Sets the ratio (max 1) to apply to the circumference to slice the cylinder. Defaults to 360.
   */
  @ObservableComponent.field
  arc: number = 360
}

import { ObservableComponent, DisposableComponent } from '../../ecs/Component'
import { Shape } from '../Shape'
import { CLASS_ID } from '../Components'
/**
 * @public
 */
@DisposableComponent('engine.shape', CLASS_ID.PLANE_SHAPE)
export class PlaneShape extends Shape {
  /**
   * Sets the horizontal length of the plane. Defaults to 1.
   */
  @ObservableComponent.field
  width: number = 1
  /**
   * Sets the vertical length of the plane. Defaults to 1.
   */
  @ObservableComponent.field
  height: number = 1
  /**
   * Sets the UV coordinates for the plane.
   * Used to map specific pieces of a Material's texture into the plane's geometry.
   */
  @ObservableComponent.field
  uvs?: number[]
}

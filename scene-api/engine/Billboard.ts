import { Component, ObservableComponent } from '../ecs/Component'
import { CLASS_ID } from './Components'
/**
 * Billboard defines a behavior that makes the entity face the camera in any moment.
 * @public
 */
@Component('engine.billboard', CLASS_ID.BILLBOARD)
export class Billboard extends ObservableComponent {
  @ObservableComponent.field
  x: boolean = true
  @ObservableComponent.field
  y: boolean = true
  @ObservableComponent.field
  z: boolean = true
  constructor(x: boolean = true, y: boolean = true, z: boolean = true) {
    super()
    this.x = x
    this.y = y
    this.z = z
  }
}

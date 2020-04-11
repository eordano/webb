import { MVector3, MQuaternion, Matrix, MathTmp } from 'dcl/utils'
import { Component, ObservableComponent } from '../ecs/Component'
import { CLASS_ID, TranformConstructorArgs } from './Components'
/**
 * @public
 */
@Component('engine.transform', CLASS_ID.TRANSFORM)
export class Transform extends ObservableComponent {
  @ObservableComponent.field
  position!: MVector3
  @ObservableComponent.field
  rotation!: MQuaternion
  @ObservableComponent.field
  scale!: MVector3
  constructor(args: TranformConstructorArgs = {}) {
    super()
    this.position = args.position || MVector3.Zero()
    this.rotation = args.rotation || MQuaternion.Identity
    this.scale = args.scale || new MVector3(1, 1, 1)
  }
  /**
   * @public
   * The rotation as Euler angles in degrees.
   */
  get eulerAngles() {
    return this.rotation.eulerAngles
  }
  /**
   * @public
   * Rotates the transform so the forward vector points at target's current position.
   */
  lookAt(target: MVector3, worldUp: MVector3 = MathTmp.staticUp) {
    const result = new Matrix()
    Matrix.LookAtLHToRef(this.position, target, worldUp, result)
    result.invert()
    MQuaternion.FromRotationMatrixToRef(result, this.rotation)
    return this
  }
  /**
   * @public
   * Applies a rotation of euler angles around the x, y and z axis.
   */
  rotate(axis: MVector3, angle: number) {
    this.rotation.multiplyInPlace(this.rotation.angleAxis(angle, axis))
    return this
  }
  /**
   * @public
   * Moves the transform in the direction and distance of translation.
   */
  translate(vec: MVector3) {
    this.position.addInPlace(vec)
    return this
  }
}

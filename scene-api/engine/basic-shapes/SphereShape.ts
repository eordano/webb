import { DisposableComponent } from '../../ecs/Component'
import { Shape } from '../Shape'
import { CLASS_ID } from '../Components'
/**
 * @public
 */
@DisposableComponent('engine.shape', CLASS_ID.SPHERE_SHAPE)
export class SphereShape extends Shape {}

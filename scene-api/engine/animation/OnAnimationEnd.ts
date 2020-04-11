import { Component, ObservableComponent } from '../../ecs/Component'
import { OnUUIDEvent } from '../events/OnUUIDEvent'
import { CLASS_ID } from '../Components'
/**
 * @public
 */
@Component('engine.onAnimationEnd', CLASS_ID.UUID_CALLBACK)
export class OnAnimationEnd extends OnUUIDEvent<'onAnimationEnd'> {
  @ObservableComponent.readonly
  readonly type: string = 'onAnimationEnd'
}

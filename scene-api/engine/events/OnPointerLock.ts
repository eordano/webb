import { Component, ObservableComponent } from '../../ecs/Component'
import { OnUUIDEvent } from './OnUUIDEvent'
import { CLASS_ID } from '../Components'
/**
 * @internal
 */
@Component('engine.onPointerLock', CLASS_ID.UUID_CALLBACK)
export class OnPointerLock extends OnUUIDEvent<'onPointerLock'> {
  @ObservableComponent.readonly
  readonly type: string = 'onPointerLock'
}

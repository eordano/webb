import { ObservableComponent, Component } from '../../ecs/Component'
import { CLASS_ID } from '../Components'
import { Wearable } from './Wearable'
import { Skin } from './Skin'
import { Hair } from './Hair'
import { Face } from './Face'
import { Eyes } from './Eyes'

/**
 * @public
 */
@Component('engine.avatarShape', CLASS_ID.AVATAR_SHAPE)
export class AvatarShape extends ObservableComponent {
  @ObservableComponent.field
  id!: string

  @ObservableComponent.field
  baseUrl!: string

  @ObservableComponent.field
  name!: string

  @ObservableComponent.field
  bodyShape!: Wearable

  @ObservableComponent.field
  wearables!: Wearable[]

  @ObservableComponent.field
  skin!: Skin

  @ObservableComponent.field
  hair!: Hair

  @ObservableComponent.field
  eyes!: Eyes

  @ObservableComponent.field
  eyebrows!: Face

  @ObservableComponent.field
  mouth!: Face
}

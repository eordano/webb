import { DisposableComponent, ObservableComponent } from '../../ecs/Component'
import { CLASS_ID } from '../Components'

/**
 * @public
 */
@DisposableComponent('engine.AudioClip', CLASS_ID.AUDIO_CLIP)
export class AudioClip extends ObservableComponent {
  @ObservableComponent.readonly
  readonly url: string

  /**
   * Is this clip looping by default?
   */
  @ObservableComponent.field
  loop: boolean = false

  // @internal
  @ObservableComponent.field
  loadingCompleteEventId?: string

  /**
   * Clip's master volume. This volume affects all the AudioSources.
   * Valid ranges from 0 to 1
   */
  @ObservableComponent.field
  volume: number = 1

  constructor(url: string) {
    super()
    this.url = url
  }
}

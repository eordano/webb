import { Component, ObservableComponent } from '../../ecs/Component'
import { AnimationState } from './AnimationState'
import { Shape } from '../Shape'
import { CLASS_ID } from '../Components'
/**
 * @public
 */
@Component('engine.animator', CLASS_ID.ANIMATION)
export class Animator extends Shape {
  @ObservableComponent.readonly
  private states: AnimationState[] = []
  /**
   * Adds an AnimationState to the animation lists.
   */
  addClip(clip: AnimationState) {
    this.states.push(clip)
    clip.onChange(() => {
      this.dirty = true
    })
    return this
  }
  /**
   * Gets the animation clip instance for the specified clip name.
   * If the clip doesn't exist a new one will be created.
   */
  getClip(clipName: string): AnimationState {
    for (let i = 0; i < this.states.length; i++) {
      const clip = this.states[i]
      if (clip.clip === clipName) {
        return clip
      }
    }
    const newClip = new AnimationState(clipName)
    this.addClip(newClip)
    return newClip
  }
}

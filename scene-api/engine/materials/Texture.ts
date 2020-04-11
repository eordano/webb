import { ObservableComponent, DisposableComponent } from '../ecs/Component'
import { CLASS_ID } from './Components'
/**
 * @public
 */
@DisposableComponent('engine.texture', CLASS_ID.TEXTURE)
export class Texture extends ObservableComponent {
  @ObservableComponent.readonly
  readonly src!: string
  /**
   * Enables crisper images based on the provided sampling mode.
   * | Value | Type      |
   * |-------|-----------|
   * |     1 | NEAREST   |
   * |     2 | BILINEAR  |
   * |     3 | TRILINEAR |
   */
  @ObservableComponent.readonly
  readonly samplingMode!: number
  /**
   * Enables texture wrapping for this material.
   * | Value | Type      |
   * |-------|-----------|
   * |     1 | CLAMP     |
   * |     2 | WRAP      |
   * |     3 | MIRROR    |
   */
  @ObservableComponent.readonly
  readonly wrap!: number
  /**
   * Defines if this texture has an alpha channel
   */
  @ObservableComponent.readonly
  readonly hasAlpha!: boolean
  constructor(src: string, opts?: Partial<Pick<Texture, 'samplingMode' | 'wrap' | 'hasAlpha'>>) {
    super()
    this.src = src
    if (opts) {
      for (let i in opts) {
        ;(this[i as 'samplingMode' | 'wrap' | 'hasAlpha'] as any) = (opts as any)[i]
      }
    }
  }
}

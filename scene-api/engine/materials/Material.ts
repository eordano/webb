import { Color3 } from 'dcl/utils'
import { ObservableComponent, DisposableComponent } from '../ecs/Component'
import { Texture } from './Texture'
import { CLASS_ID } from './Components'
/**
 * @public
 */
@DisposableComponent('engine.material', CLASS_ID.PRB_MATERIAL)
export class Material extends ObservableComponent {
  /**
   * Opacity level between 0 and 1.
   * Defaults to 1.
   */
  @ObservableComponent.field
  alpha?: number
  /**
   * AKA Diffuse Color in other nomenclature.
   * Defaults to #CCCCCC.
   */
  @ObservableComponent.field
  albedoColor?: Color3
  /**
   * The color emitted from the material.
   * Defaults to black.
   */
  @ObservableComponent.field
  emissiveColor?: Color3
  /**
   * Specifies the metallic scalar of the metallic/roughness workflow.
   * Can also be used to scale the metalness values of the metallic texture.
   * Defaults to  0.5.
   */
  @ObservableComponent.field
  metallic?: number
  /**
   * Specifies the roughness scalar of the metallic/roughness workflow.
   * Can also be used to scale the roughness values of the metallic texture.
   * Defaults to  0.5.
   */
  @ObservableComponent.field
  roughness?: number
  /**
   * AKA Diffuse Color in other nomenclature.
   * Defaults to black.
   */
  @ObservableComponent.field
  ambientColor?: Color3
  /**
   * The color reflected from the material.
   * Defaults to white.
   */
  @ObservableComponent.field
  reflectionColor?: Color3
  /**
   * AKA Specular Color in other nomenclature.
   * Defaults to white.
   */
  @ObservableComponent.field
  reflectivityColor?: Color3
  /**
   * Intensity of the direct lights e.g. the four lights available in scene.
   * This impacts both the direct diffuse and specular highlights.
   * Defaults to 1.
   */
  @ObservableComponent.field
  directIntensity?: number
  /**
   * AKA Glossiness in other nomenclature.
   * Defaults to 1.
   */
  @ObservableComponent.field
  microSurface?: number
  /**
   * Intensity of the emissive part of the material.
   * This helps controlling the emissive effect without modifying the emissive color.
   * Defaults to 1.
   */
  @ObservableComponent.field
  emissiveIntensity?: number
  /**
   * Intensity of the environment e.g. how much the environment will light the object
   * either through harmonics for rough material or through the refelction for shiny ones.
   * Defaults to 1.
   */
  @ObservableComponent.field
  environmentIntensity?: number
  /**
   * This is a special control allowing the reduction of the specular highlights coming from the
   * four lights of the scene. Those highlights may not be needed in full environment lighting.
   * Defaults to 1.
   */
  @ObservableComponent.field
  specularIntensity?: number
  /**
   * Texture applied as material.
   */
  @ObservableComponent.component
  albedoTexture?: Texture
  /**
   * Texture applied as opacity. Default: the same texture used in albedoTexture.
   */
  @ObservableComponent.component
  alphaTexture?: Texture
  /**
   * Emissive texture.
   */
  @ObservableComponent.component
  emissiveTexture?: Texture
  /**
   * Stores surface normal data used to displace a mesh in a texture.
   */
  @ObservableComponent.component
  bumpTexture?: Texture
  /**
   * Stores the refracted light information in a texture.
   */
  @ObservableComponent.component
  refractionTexture?: Texture
  /**
   * If sets to true, disables all the lights affecting the material.
   * Defaults to false.
   */
  @ObservableComponent.field
  disableLighting?: boolean
  /**
   * Sets the transparency mode of the material.
   * Defaults to -1.
   *
   * | Value | Type                                           |
   * | ----- | ---------------------------------------------- |
   * | 0     | OPAQUE  (default)                              |
   * | 1     | ALPHATEST                                      |
   * | 2     | ALPHABLEND                                     |
   * | 3     | ALPHATESTANDBLEND                              |
   * | 4     | AUTO (ALPHABLEND if alpha OPAQUE otherwise     |
   */
  @ObservableComponent.field
  transparencyMode: number = 4
  /**
   * Does the albedo texture has alpha?
   * Defaults to false.
   */
  @ObservableComponent.field
  hasAlpha?: boolean
}

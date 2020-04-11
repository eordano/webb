import { Color3 } from 'dcl/utils'
import { Component, ObservableComponent } from '../../ecs/Component'
import { Shape } from '../Shape'
import { CLASS_ID } from '../Components'
/**
 * @public
 */
@Component('engine.text', CLASS_ID.TEXT_SHAPE)
export class TextShape extends Shape {
  @ObservableComponent.field
  outlineWidth: number = 0
  @ObservableComponent.field
  outlineColor: Color3 = new Color3(1, 1, 1)
  @ObservableComponent.field
  color: Color3 = new Color3(1, 1, 1)
  @ObservableComponent.field
  fontSize: number = 10
  @ObservableComponent.field
  fontWeight: string = 'normal'
  @ObservableComponent.field
  opacity: number = 1.0
  @ObservableComponent.field
  value: string = ''
  @ObservableComponent.field
  lineSpacing: string = '0px'
  @ObservableComponent.field
  lineCount: number = 0
  @ObservableComponent.field
  resizeToFit: boolean = false
  @ObservableComponent.field
  textWrapping: boolean = false
  @ObservableComponent.field
  shadowBlur: number = 0
  @ObservableComponent.field
  shadowOffsetX: number = 0
  @ObservableComponent.field
  shadowOffsetY: number = 0
  @ObservableComponent.field
  shadowColor: Color3 = new Color3(1, 1, 1)
  @ObservableComponent.field
  zIndex: number = 0
  @ObservableComponent.field
  hTextAlign: string = 'center'
  @ObservableComponent.field
  vTextAlign: string = 'center'
  @ObservableComponent.field
  width: number = 1
  @ObservableComponent.field
  height: number = 1
  @ObservableComponent.field
  paddingTop: number = 0
  @ObservableComponent.field
  paddingRight: number = 0
  @ObservableComponent.field
  paddingBottom: number = 0
  @ObservableComponent.field
  paddingLeft: number = 0
  @ObservableComponent.field
  isPickable: boolean = false
  @ObservableComponent.field
  billboard: boolean = false
  constructor(value?: string) {
    super()
    if (value) {
      this.value = value
    }
  }
}

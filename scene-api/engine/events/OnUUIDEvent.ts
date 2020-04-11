import { ObservableComponent } from '../../ecs/Component'
import { newId } from '../../ecs/IdGenerator'
import { IEvents } from '../Types'
/**
 * @public
 */
export class OnUUIDEvent<T extends keyof IEvents> extends ObservableComponent {
  readonly type: string | undefined
  readonly uuid: string = newId('UUID')
  @ObservableComponent.field
  callback!: (event: any) => void
  constructor(callback: (event: IEvents[T]) => void) {
    super()
    if (!callback || !('apply' in callback) || !('call' in callback)) {
      throw new Error('Callback is not a function')
    }
    this.callback = callback
  }
  static uuidEvent(target: ObservableComponent, propertyKey: string) {
    if (delete (target as any)[propertyKey]) {
      const componentSymbol = propertyKey + '_' + Math.random()
      ;(target as any)[componentSymbol] = undefined
      Object.defineProperty(target, componentSymbol, {
        ...Object.getOwnPropertyDescriptor(target, componentSymbol),
        enumerable: false,
      })
      Object.defineProperty(target, propertyKey.toString(), {
        get: function () {
          return this[componentSymbol]
        },
        set: function (value) {
          const oldValue = this[componentSymbol]
          if (value) {
            if (value instanceof OnUUIDEvent) {
              this.data[propertyKey] = value.uuid
            } else {
              throw new Error('value is not an OnUUIDEvent')
            }
          } else {
            this.data[propertyKey] = null
          }
          this[componentSymbol] = value
          if (value !== oldValue) {
            this.dirty = true
            for (let i = 0; i < this.subscriptions.length; i++) {
              this.subscriptions[i](propertyKey, value, oldValue)
            }
          }
        },
        enumerable: true,
      })
    }
  }
  toJSON() {
    return { uuid: this.uuid, type: this.type }
  }
}

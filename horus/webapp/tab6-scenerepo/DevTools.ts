import { API, exposeMethod } from 'dcl/rpc/common/API'
import { registerAPI } from 'dcl/rpc/host'

/**
 * @public
 */
@registerAPI('DevTools')
export class DevTools extends API {
  history: any[]

  @exposeMethod
  async event<T, R>(type: T, params: R): Promise<void> {
    console.log(type, params)
    this.history.push({ type, params })
  }
}

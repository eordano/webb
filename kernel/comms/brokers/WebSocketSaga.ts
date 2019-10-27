import { defaultLogger } from 'dcl/utils'
import { setBrokerConnection } from '../actions'
import { WebSocketBrokerConnection } from './WebSocketBrokerConnection'

export function* setupCliBroker(): any {
  const commsUrl = document.location.toString().replace(/^http/, 'ws')
  defaultLogger.log('Using WebSocket comms: ' + commsUrl)
  yield setBrokerConnection(new WebSocketBrokerConnection(commsUrl))
}

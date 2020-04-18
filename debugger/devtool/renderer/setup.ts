import { clientLog } from '../jslibs/clientLog'
import { setup as incoming } from './hooks/incoming'
import { setup as outgoing } from './hooks/outgoing'

export function setup() {
  outgoing((data: any) => {
    clientLog(`outgoing log` + JSON.stringify(data))
  })
  incoming((data: any) => {
    clientLog(`incoming log` + JSON.stringify(data))
  })
}

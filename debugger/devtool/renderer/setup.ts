import { setup as outgoing } from './hooks/outgoing'
import { setup as incoming } from './hooks/incoming'

export function setup() {
    outgoing()
    incoming()
}
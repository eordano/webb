import { ChatState } from '../types'

export function createUIScene(_: ChatState) {
  return ['CreateUIScene', { id: 'dcl-ui-scene', baseUrl: '/' }]
}

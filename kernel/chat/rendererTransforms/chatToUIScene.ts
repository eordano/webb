import { ChatState } from '../types'
import { createUIComponents } from './createUIComponents'
import { createUIScene } from './createUIScene'
import { updateUIComponentState } from './updateUIComponentState'

export function chatToUIScene(state: ChatState) {
  return [...createUIScene(state), ...createUIComponents(state), ...updateUIComponentState(state)]
}

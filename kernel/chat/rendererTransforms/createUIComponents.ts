import { Color4, UIText } from '@dcl/scene-api'
import { ChatMessage, ChatState, SYSTEM_MESSAGE } from '../types'

export function createUIComponents(state: ChatState) {
  return [
    createMainContainer('a', 'b'),
    createChatInnerTopConteiner(),
    messagesLogScrollContainer(),
    messagesLogStackContainer(),
    textInputContainer(),
    textInput(),
    state.messages.map(createChatMessage)
  ]
}

const PRIMARY_TEXT_COLOR = Color4.White()
const COMMAND_COLOR = Color4.FromHexString('#ffd7a9ff')

function createChatMessage(message: ChatMessage) {
  return {
    id: '?',
    classId: UIText,
    color: message.from === SYSTEM_MESSAGE ? COMMAND_COLOR : PRIMARY_TEXT_COLOR,
    value: `<b>${message.from}:</b> ${message.message}`,
    fontSize: 14,
    vAlign: 'top',
    hAlign: 'left',
    vTextAlign: 'top',
    hTextAlign: 'left',
    width: '350px',
    adaptWidth: false,
    adaptHeight: true,
    textWrapping: true,
    outlineColor: Color4.Black()
  }
}

function createMainContainer(id: string, parentId: string) {
  return {
    id,
    classId: 111 /* FIXME */,
    name: 'chat-container',
    color: Color4.Clear(),
    vAlign: 'bottom',
    hAlign: 'left',
    width: '400px',
    height: '300px',
    positionX: 10,
    positionY: 10,
    thickness: 0
  }
}

function createChatInnerTopConteiner() {}
function messagesLogScrollContainer() {}
function messagesLogStackContainer() {}
function textInputContainer() {}
function textInput() {}

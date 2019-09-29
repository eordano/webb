export const SYSTEM_MESSAGE = '[Chat] Add system message'
export const OTHER_USER_YELL = '[Chat] Add user public chat message'
export const OTHER_USER_PRIVATE = '[Chat] Add user private chat message'
export const SELF_USER_YELL = '[Chat] Current user sent public chat message'
export const SELF_USER_PRIVATE = '[Chat] Current user sent user private chat message'

export const CHAT_MINIMIZED = '[Chat] Chat minimized'
export const CHAT_MAXIMIZED = '[Chat] Chat maximized'
export const CHAT_FOCUS = '[Chat] Chat focused'
export const CHAT_LOST_FOCUS = '[Chat] Chat focused'

export const CONSOLE_COMMAND = '[Chat] User command submitted'
export const CONSOLE_COMMAND_SUCCESS = '[Chat] User command successfully executed'
export const CONSOLE_COMMAND_UNKNOWN = '[Chat] User command not understood'
export const CONSOLE_COMMAND_INVALID = '[Chat] User command invalid semantic'
export const CONSOLE_COMMAND_FAILURE = '[Chat] User command failed to execute'

export const CHAT_SYSTEM_INITIALIZING = '[Chat] Initializing'
export const CHAT_SYSTEM_SUCCESSFUL_START = '[Chat] System successfully started'
export const CHAT_SYSTEM_FAILURE = '[Chat] System failed to start'

export type ChatState = {
  status: 'not started' | 'initializing' | 'started' | 'failure'
  minimized: boolean
  focused: boolean
  command: ChatCommand
  messages: ChatMessage[]
}

export type RootChatState = {
  chat: ChatState
}

export type ChatCommand = {
  command: string
  status: 'empty' | 'executing' | 'not understood' | 'invalid semantic' | 'failure' | 'success'
}

export type ChatMessage = {
  timestamp: number
  from: string
  channel: string
  message: string
}

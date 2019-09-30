import { AnyAction } from 'redux'
import {
  ChatState,
  CHAT_FOCUS,
  CHAT_LOST_FOCUS,
  CHAT_MAXIMIZED,
  CHAT_MINIMIZED,
  CHAT_SYSTEM_FAILURE,
  CHAT_SYSTEM_INITIALIZING,
  CHAT_SYSTEM_SUCCESSFUL_START,
  CONSOLE_COMMAND,
  CONSOLE_COMMAND_FAILURE,
  CONSOLE_COMMAND_INVALID,
  CONSOLE_COMMAND_SUCCESS,
  CONSOLE_COMMAND_UNKNOWN,
  OTHER_USER_PRIVATE,
  OTHER_USER_YELL,
  SELF_USER_PRIVATE,
  SELF_USER_YELL,
  SYSTEM_MESSAGE
} from './types'
import { chatOtherUserPrivateAction } from './actions'

export const INITIAL_CHAT_STATE: ChatState = {
  status: 'not started',
  minimized: true,
  focused: false,
  command: undefined,
  messages: []
}

export const SYSTEM = 'System Message'
export const MAIN_LOBBY = 'Main chat thread'
export const SELF = 'me'

export function chatReducer(state?: ChatState, action?: AnyAction): ChatState {
  if (!state) {
    return INITIAL_CHAT_STATE
  }

  if (!action) {
    return state
  }
  if (!action.startsWith('[Chat]')) {
    return state
  }

  switch (action.type) {
    case SYSTEM_MESSAGE:
      return {
        ...state,
        messages: [
          { timestamp: 1, from: SYSTEM, channel: MAIN_LOBBY, message: action.payload.message },
          ...state.messages
        ]
      }
    case OTHER_USER_YELL:
      return {
        ...state,
        messages: [
          { timestamp: 1, from: SYSTEM, channel: MAIN_LOBBY, message: action.payload.message },
          ...state.messages
        ]
      }
    case OTHER_USER_PRIVATE:
      return {
        ...state,
        messages: [
          {
            timestamp: 1,
            from: (action as chatOtherUserPrivateAction).payload.from,
            channel: (action as chatOtherUserPrivateAction).payload.from,
            message: action.payload.message
          },
          ...state.messages
        ]
      }
    case SELF_USER_YELL:
      return {
        ...state,
        messages: [
          { timestamp: 1, from: SELF, channel: MAIN_LOBBY, message: action.payload.message },
          ...state.messages
        ]
      }
    case SELF_USER_PRIVATE:
      return {
        ...state,
        messages: [{ timestamp: 1, from: SYSTEM, channel: MAIN_LOBBY, message: action.payload }, ...state.messages]
      }
    case CHAT_MINIMIZED:
      return {
        ...state,
        minimized: true,
        focused: false
      }
    case CHAT_MAXIMIZED:
      return {
        ...state,
        minimized: false
      }
    case CHAT_FOCUS:
      return {
        ...state,
        focused: true,
        minimized: false
      }
    case CHAT_LOST_FOCUS:
      return {
        ...state,
        focused: false
      }
    case CONSOLE_COMMAND:
      return {
        ...state,
        command: {
          command: action.payload,
          status: 'executing'
        }
      }
    case CONSOLE_COMMAND_FAILURE:
      return {
        ...state,
        command: {
          ...state.command,
          status: 'executing'
        }
      }
    case CONSOLE_COMMAND_SUCCESS:
      return {
        ...state,
        command: {
          ...state.command,
          status: 'success'
        }
      }
    case CONSOLE_COMMAND_UNKNOWN:
      return {
        ...state,
        command: {
          ...state.command,
          status: 'not understood'
        }
      }
    case CONSOLE_COMMAND_INVALID:
      return {
        ...state,
        command: {
          ...state.command,
          status: 'invalid semantic'
        }
      }
    case CONSOLE_COMMAND_FAILURE:
      return {
        ...state,
        command: {
          ...state.command,
          status: 'failure'
        }
      }
    case CHAT_SYSTEM_INITIALIZING:
      return {
        ...state,
        status: 'initializing'
      }
    case CHAT_SYSTEM_SUCCESSFUL_START:
      return {
        ...state,
        status: 'started'
      }
    case CHAT_SYSTEM_FAILURE:
      return {
        ...state,
        status: 'failure'
      }
  }
  return state
}

import {
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

import { action } from 'typesafe-actions'
import { UserId } from '../auth/types'

export const chatFocus = () => action(CHAT_FOCUS)
export type chatFocusAction = ReturnType<typeof chatFocus>
export const chatLostFocus = () => action(CHAT_LOST_FOCUS)
export type chatLostFocusAction = ReturnType<typeof chatLostFocus>
export const chatMaximized = () => action(CHAT_MAXIMIZED)
export type chatMaximizedAction = ReturnType<typeof chatMaximized>
export const chatMinimized = () => action(CHAT_MINIMIZED)
export type chatMinimizedAction = ReturnType<typeof chatMinimized>
export const chatSystemFailure = () => action(CHAT_SYSTEM_FAILURE)
export type chatSystemFailureAction = ReturnType<typeof chatSystemFailure>
export const chatSystemInitializing = () => action(CHAT_SYSTEM_INITIALIZING)
export type chatSystemInitializingAction = ReturnType<typeof chatSystemInitializing>
export const chatSystemSuccessfulStart = () => action(CHAT_SYSTEM_SUCCESSFUL_START)
export type chatSystemSuccessfulStartAction = ReturnType<typeof chatSystemSuccessfulStart>

export const chatCommand = () => action(CONSOLE_COMMAND)
export type chatCommandAction = ReturnType<typeof chatCommand>
export const chatCommandFailure = () => action(CONSOLE_COMMAND_FAILURE)
export type chatCommandFailureAction = ReturnType<typeof chatCommandFailure>
export const chatCommandInvalid = () => action(CONSOLE_COMMAND_INVALID)
export type chatCommandInvalidAction = ReturnType<typeof chatCommandInvalid>
export const chatCommandSuccess = () => action(CONSOLE_COMMAND_SUCCESS)
export type chatCommandSuccessAction = ReturnType<typeof chatCommandSuccess>
export const chatCommandUnknown = () => action(CONSOLE_COMMAND_UNKNOWN)
export type chatCommandUnknownAction = ReturnType<typeof chatCommandUnknown>

export const chatSystemMessage = () => action(SYSTEM_MESSAGE)
export type chatSystemMessageAction = ReturnType<typeof chatSystemMessage>
export const chatOtherUserPrivate = (from: UserId, message: string) => action(OTHER_USER_PRIVATE, { from, message })
export type chatOtherUserPrivateAction = ReturnType<typeof chatOtherUserPrivate>
export const chatOtherUserYell = (from: UserId, message: string) => action(OTHER_USER_YELL, { from, message })
export type chatOtherUserYellAction = ReturnType<typeof chatOtherUserYell>
export const chatSelfPrivate = (to: UserId, message: string) => action(SELF_USER_PRIVATE, { to, message })
export type chatSelfPrivateAction = ReturnType<typeof chatSelfPrivate>
export const chatSelfYell = (message: string) => action(SELF_USER_YELL, { message })
export type chatSelfYellAction = ReturnType<typeof chatSelfYell>

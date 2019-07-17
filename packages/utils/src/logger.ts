// tslint:disable:no-console
export type ILogger = {
  error(message: string, ...args: any[]): void
  log(message: string, ...args: any[]): void
  warn(message: string, ...args: any[]): void
  info(message: string, ...args: any[]): void
  debug(message: string, ...args: any[]): void
  trace(message: string, ...args: any[]): void
}

declare var console: any
declare var dcl: any

export function createLogger(prefix: string): ILogger {
  return {
    error(message: string | Error, ...args: any[]): void {
      const target = typeof dcl === 'undefined' ? console.error : dcl.error
      if (typeof message === 'object' && message.stack) {
        target(prefix + message, ...args, message.stack)
      } else {
        target(prefix + message, ...args)
      }
    },
    log(message: string, ...args: any[]): void {
      if (typeof dcl !== 'undefined') {
        dcl.log(prefix + message, ...args)
      } else {
        console.log(prefix + message, ...args)
      }
    },
    warn(message: string, ...args: any[]): void {
      if (typeof dcl !== 'undefined') {
        dcl.warn(prefix + message, ...args)
      } else {
        console.warn(prefix + message, ...args)
      }
    },
    info(message: string, ...args: any[]): void {
      if (typeof dcl !== 'undefined') {
        dcl.info(prefix + message, ...args)
      } else {
        console.info(prefix + message, ...args)
      }
    },
    debug(message: string, ...args: any[]): void {
      if (typeof dcl !== 'undefined') {
        dcl.debug(prefix + message, ...args)
      } else {
        console.debug(prefix + message, ...args)
      }
    },
    trace(message: string, ...args: any[]): void {
      if (typeof dcl !== 'undefined') {
        dcl.trace(prefix + message, ...args)
      } else {
        console.trace(prefix + message, ...args)
      }
    }
  }
}

export const defaultLogger: ILogger = createLogger('')

export const log = defaultLogger.log
export const error = defaultLogger.error

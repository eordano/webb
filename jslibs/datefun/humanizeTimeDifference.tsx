import { ONE_MINUTE } from './timeConstants'

export function humanizeTimeDifference(elapsed: number) {
  const mins = Math.floor(elapsed / ONE_MINUTE)
  const secs = Math.floor((elapsed % ONE_MINUTE) / 1000)
  return `${mins}m:${secs}s`
}

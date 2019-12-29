export const ONE_MINUTE = 60 * 1000
export const ONE_HOUR = 60 * ONE_MINUTE
export const ONE_DAY = 24 * ONE_HOUR
export const ONE_WEEK = 7 * ONE_DAY
export const FIFTEEN_MINUTES = 15 * ONE_MINUTE
export const THREE_MINUTES = 3 * ONE_MINUTE

export function getMillisEllapsed(response: Date, now = new Date()) {
  return now.getTime() - response.getTime()
}
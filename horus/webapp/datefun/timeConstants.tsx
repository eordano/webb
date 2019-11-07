export const ONE_MINUTE = 60 * 1000
export const ONE_HOUR = 60 * ONE_MINUTE
export const ONE_DAY = 24 * ONE_HOUR
export const ONE_WEEK = 7 * ONE_DAY
export function getMillisEllapsed(response: any) {
  return new Date().getTime() - new Date(response.timestamp).getTime();
}

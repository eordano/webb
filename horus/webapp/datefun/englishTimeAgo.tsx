import { ONE_MINUTE, ONE_HOUR, ONE_DAY, ONE_WEEK } from "./timeConstants";
export function englishTimeAgo(elapsed: number) {
  if (elapsed < ONE_MINUTE) {
    return 'seconds ago';
  }
  if (elapsed < ONE_HOUR) {
    return Math.round(elapsed / ONE_MINUTE).toFixed(0) + ' minutes ago';
  }
  if (elapsed < ONE_DAY) {
    return Math.round(elapsed / ONE_HOUR).toFixed(0) + ' hours ago';
  }
  if (elapsed < ONE_WEEK) {
    return Math.round(elapsed / ONE_DAY).toFixed(0) + ' days ago';
  }
  return Math.round(elapsed / ONE_WEEK).toFixed(0) + ' weeks ago';
}

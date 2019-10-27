/**
 * Workaround to clean an array from 'ghost items'.
 * @param {Array} dirtyArray
 */
export default function cleanArray(dirtyArray: any[]) {
  const newArray = Array.from(dirtyArray)
  return newArray.filter(i => i !== undefined)
}

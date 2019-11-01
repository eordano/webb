export type booleanMap = Record<string, boolean>

export function getKeysMappingToTrue(dict: booleanMap) {
  return Object.keys(dict).filter(_ => dict[_] === true)
}

export function stringArrayToBooleanMap(array: string[]): booleanMap {
  return array.reduce((curr, item) => {
    curr[item] = true
    return curr
  }, {})
}
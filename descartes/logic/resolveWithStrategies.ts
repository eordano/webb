import { RetrieveAndSaveStrategy } from './Strategies'

export function resolveWithStrategies<R, S>(strategies: RetrieveAndSaveStrategy<R, S>[]) {
  return async function(keys: R) {
    let result: S = undefined
    // Traverse the retrieve functions
    for (let i = 0; i < strategies.length; i++) {
      try {
        const retrieve = strategies[i].retrieve
        if (!retrieve) {
            continue
        }
        const value = await retrieve(keys)
        if (value) {
          // If we have a solution, traverse the previous cache/retrieve strategies and save
          for (let j = 0; j <= i; j++) {
            const save = strategies[j].save
            if (save) {
                await save(keys, value)
            }
          }
          result = value
          break
        }
      } catch (e) {
        continue
      }
    }
    return result
  }
}

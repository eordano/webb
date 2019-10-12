import { FourCoordinates } from './lib/validateXY12'
import { PositionToSceneIdRecord } from './lib/PositionToSceneIdRecord'
import { RetrieveAndSaveStrategy } from './Strategies'

export function resolveManyPositions(strategies: RetrieveAndSaveStrategy[]) {
  return async function(positions: FourCoordinates): Promise<PositionToSceneIdRecord> {
    let result: PositionToSceneIdRecord = undefined
    // Traverse the retrieve functions
    for (let i = 0; i < strategies.length; i++) {
      try {
        const retrieve = strategies[i].retrieve
        if (!retrieve) {
            continue
        }
        const value = await retrieve(positions)
        if (value) {
          // If we have a solution, traverse the previous cache/retrieve strategies and save
          for (let j = 0; j <= i; j++) {
            const save = strategies[j].save
            if (save) {
                await save(value)
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

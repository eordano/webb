import { Catalog } from '../types'

declare var window: any

export function sendWearablesCatalog(catalog: Catalog) {
  window['unityInterface'].AddWearablesToCatalog(catalog)
}

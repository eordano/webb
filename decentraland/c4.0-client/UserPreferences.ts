import { WearableId } from '../c3-users/Wearable'

export type UserPreferences = {
  alreadyNotifiedItems: Record<WearableId, boolean>
}

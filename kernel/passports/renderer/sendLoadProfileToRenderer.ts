import { ProfileForRenderer } from '../types'

declare var window: any

export function sendLoadProfileToRenderer(profile: ProfileForRenderer) {
  window['unityInterface'].LoadProfile(profile)
}

declare var global: any
const location = global.location = global.location || { search: '', hostname: '' }

// Entry points
export const PREVIEW: boolean = !!(global as any).preview
export const EDITOR: boolean = !!(global as any).isEditor

// Development
export const AVOID_WEB3: boolean = !!(global as any).avoidWeb3 || EDITOR
export const DEBUG = location.search.indexOf('DEBUG_MODE') !== -1 || !!(global as any).mocha || PREVIEW || EDITOR
export const USE_LOCAL_COMMS = location.search.indexOf('LOCAL_COMMS') !== -1 || PREVIEW
export const DEBUG_ANALYTICS = location.search.indexOf('DEBUG_ANALYTICS') !== -1
export const DEBUG_MOBILE = location.search.indexOf('DEBUG_MOBILE') !== -1
export const DEBUG_MESSAGES = location.search.indexOf('DEBUG_MESSAGES') !== -1
export const DEBUG_REDUX = location.search.indexOf('DEBUG_REDUX') !== -1

export const DISABLE_AUTH = location.search.indexOf('DISABLE_AUTH') !== -1 || DEBUG
export const ENGINE_DEBUG_PANEL = location.search.indexOf('ENGINE_DEBUG_PANEL') !== -1
export const SCENE_DEBUG_PANEL = location.search.indexOf('SCENE_DEBUG_PANEL') !== -1 && !ENGINE_DEBUG_PANEL

export const isRunningTest: boolean = (global as any)['isRunningTests'] === true

export function getTLD() {
  const tld = global.location.hostname.match(/(\w+)$/)
  if (tld) {
      return tld[0]
  } else {
      return 'org'
  }
}

export const knownTLDs = ['zone', 'org', 'today']

function getDefaultTLD() {
  const TLD = getTLD()
  if (!TLD || !knownTLDs.includes(TLD)) {
    return 'org'
  }
  return TLD
}

export function getServerConfigurations() {
  const TLDDefault = getDefaultTLD()
  return {
    auth: `https://auth.decentraland.${TLDDefault}/api/v1`,
    landApi: `https://api.decentraland.${TLDDefault}/v1`,
    content: `https://content.decentraland.${TLDDefault === 'today' ? 'org' : TLDDefault}`,
    worldInstanceUrl: `wss://world-comm.decentraland.${TLDDefault}/connect`,
    profile: `https://profile.decentraland.${TLDDefault}/api/v1`,
    wearablesApi: `https://dcl-wearable-api.now.sh`,
    avatar: {
      // avatars-api.decentraland.zone is down
      snapshotStorage: `https://avatars-storage.decentraland.${TLDDefault}/`,
      server: `https://avatars-api.decentraland.${TLDDefault === 'zone' ? 'today' : TLDDefault}/`,
      catalog: 'https://avatar-assets.now.sh',
      contents: `https://s3.amazonaws.com/content-service.decentraland.org/`,
      presets: `https://avatars-storage.decentraland.org/mobile-avatars`
    },
    darApi:
      TLDDefault === 'zone' || TLDDefault === 'today'
        ? 'https://schema-api-v2.now.sh/dar'
        : 'https://schema.decentraland.org/dar'
  }
}

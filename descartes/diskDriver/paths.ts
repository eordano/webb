export function getManifestPath(sceneId: string) {
  return function(target: string) {
    return `${target}/manifest/${sceneId}`
  }
}

export function getMappingsPath(sceneId: string) {
  return function(target: string) {
    return `${target}/mappings/${sceneId}`
  }
}

export function getSceneIdPath(x: number, y: number) {
  return function(target: string) {
    return `${target}/position/${x}.${y}`
  }
}

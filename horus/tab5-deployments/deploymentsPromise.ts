import { HORUS_CONFIG } from '../horus-config/config'

async function fetchJson(contentServerPath: string, options?: RequestInit) {
  const response = await fetch(`${HORUS_CONFIG.CONTENT_SERVER_URL}/${contentServerPath}`)
  if (response.status >= 400) throw new Error(`Unexpected response from content server: ${response.status}`)

  return await response.json()
}

async function sceneName(deployment) {
  try {
    const jsonContentFile = JSON.parse(deployment.files).find(it => {
      const path = it.paths ? it.paths[0] : null
      return path === 'scene.json'
    })

    if (!jsonContentFile) return { cid: deployment.cid, name: '' }

    const sceneData = await fetchJson('contents/' + jsonContentFile.cid)

    return sceneData ? { cid: deployment.cid, name: sceneData.display.title } : { cid: deployment.cid, name: '' }
  } catch (e) {
    return { cid: deployment.cid, name: '' };
  }
}

async function sceneNames(deployments: Array<any>) {
  const nameList = await Promise.all(deployments.map(deplyment => sceneName(deplyment)))

  return nameList.reduce((dict, cidNamePair) => Object.assign(dict, { [cidNamePair.cid]: cidNamePair.name }), {})
}

export async function deployments() {
  const deployments = await fetchJson(`deployments`)
  const names = await sceneNames(deployments)

  deployments.forEach(deployment => {
    deployment.name = names[deployment.cid]
  })

  return deployments
}

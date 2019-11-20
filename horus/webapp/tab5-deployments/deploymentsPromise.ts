import { HORUS_CONFIG } from "../horus-config/config";

async function fetchJson(contentServerPath: string, options?: RequestInit) {
    const response = await fetch(`${HORUS_CONFIG.CONTENT_SERVER_URL}/${contentServerPath}`)
    if(response.status >= 400) throw new Error(`Unexpected response from content server: ${response.status}`);

    return await(response.json())
}

async function sceneName(cid: string, infos: any[]) {
    const sceneInfo = infos.find(it => it.scene_cid === cid)
    
    if(!sceneInfo || !sceneInfo.content || !sceneInfo.content.contents) return {cid, name: ''}

    const jsonContent = sceneInfo.content.contents.find(it => it.file == "scene.json")

    const sceneData = await fetchJson("contents/" + jsonContent.hash)
    
    return sceneData ? { cid, name: sceneData.display.title } : {cid, name: ''}
}

async function sceneNames(cids: Array<string>) {
    const infos = await fetchJson(`parcel_info?cids=${cids.join(',')}`)

    const nameList = await Promise.all(cids.map(cid => sceneName(cid, infos.data)))

    return nameList.reduce((dict, cidNamePair) => Object.assign(dict, {[cidNamePair.cid]: cidNamePair.name}), {});
}

export async function deployments() {
    const deployments = await fetchJson(`deployments`)
    const names = await sceneNames(deployments.map(it => it.cid))

    deployments.forEach(deployment => {
        deployment.name = names[deployment.cid]
    });

    return deployments;
}
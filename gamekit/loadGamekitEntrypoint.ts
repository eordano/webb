export const dataUrlRE = /^data:[^/]+\/[^;]+;base64,/
export const blobRE = /^blob:http/

export function resolveMapping(mapping: string | undefined, mappingName: string, baseUrl: string) {
  let url = mappingName
  if (mapping) {
    url = mapping
  }
  if (dataUrlRE.test(url)) {
    return url
  }
  if (blobRE.test(url)) {
    return url
  }
  return (baseUrl.endsWith('/') ? baseUrl : baseUrl + '/') + url
}

export function loadGamekitEntrypoint(loadAPIs: (apiNames: string[]) => Promise<any>) {
  return loadAPIs(['EnvironmentAPI'])
    .then(apis => {
      const { EnvironmentAPI } = apis
      return EnvironmentAPI.getBootstrapData()
    })
    .then(bootstrapData => {
      if (bootstrapData && bootstrapData.main) {
        const mappingName = bootstrapData.main
        const mapping = bootstrapData.mappings.find(($: { file: string; hash: string }) => {
          return $.file === mappingName
        })
        return resolveMapping(mapping && mapping.hash, mappingName, bootstrapData.baseUrl)
      }
    })
    .then(url => {
      if (url) {
        return fetch(url)
      }
    })
    .then(html => {
      if (html && html.ok) {
        return html.text()
      } else {
        throw new Error(`SDK: Error while loading script`)
      }
    })
    .catch(error => {
      console.log(error)
    })
}

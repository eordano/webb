import { Container, Atlas, Layer, Close, Loader, Button } from 'decentraland-ui'
import React, { useState, useEffect } from 'react'
import { HORUS_CONFIG } from '../horus-config/config'
import { usePromise } from '../hooks/usePromise'
import { redirectTo } from '../route/redirectCache'

export const DeploymentAtlas = () => {
  const [selected, setSelected] = useState(undefined)
  const [sceneManifest, setSceneManifest] = useState(undefined)
  const [sceneCid, setSceneCid] = useState(undefined)
  let [loading, setLoading] = useState({})
  let [errors, setErrors] = useState({})
  const [knownScenes, setKnownScenes] = useState(new Map())
  const { result: tiles } = usePromise(Atlas.fetchTiles, [])

  function isSelected(x: number, y: number) {
    return selected && selected.x === x && selected.y === y
  }

  const selectedStrokeLayer: Layer = (x, y) => {
    return isSelected(x, y) ? { color: '#ff0044', scale: 1.4 } : null
  }

  const selectedFillLayer: Layer = (x, y) => {
    return isSelected(x, y) ? { color: '#ff9990', scale: 1.2 } : null
  }

  const hasSceneLayer: Layer = (x, y) => {
    const key = `${x},${y}`
    return knownScenes.has(key) ? { color: knownScenes.get(key), scale: 1.11 } : null
  }

  function addToKnownScenes(sceneManifest) {
    const hue = Math.floor(Math.random() * 359)
    sceneManifest.scene.parcels.forEach(parcel => {
      const [x, y] = parcel.split(',')
      knownScenes.set(`${x},${y}`, `hsl(${hue}, 65%, 50%)`)
    })
    setKnownScenes(knownScenes)
  }

  function setErrorFor(key: string, value: string) {
    errors = Object.assign({}, errors, { [key]: value })
    setErrors(errors)
  }

  function setLoadingFor(key: string, value: boolean) {
    loading = Object.assign({}, loading, { [key]: value })
    setLoading(loading)
  }

  const handleClick = (x: number, y: number) => {
    if (!isSelected(x, y)) {
      setSelected({ x, y })
    }
  }

  function fetchForSelected(
    fetchFunction: (() => string) | (() => Promise<Response>),
    key: string,
    onSuccess: (res: any) => any,
    clearStateFunction: () => any = () => {},
    onError: (res: Response) => any = res => setErrorFor(key, 'Unexpected response status: ' + res.status)
  ) {
    useEffect(() => {
      if (selected) {
        const doFetch = async () => {
          setLoadingFor(key, true)
          setErrorFor(key, '')
          clearStateFunction()
          try {
            const fetchParameter = fetchFunction()
            let res = null

            if (fetchParameter as string) {
              res = await fetch(`${HORUS_CONFIG.CONTENT_SERVER_URL}/${fetchParameter}`)
            } else {
              res = await fetchParameter
            }

            if (res.status === 200) {
              const json = await res.json()
              onSuccess(json)
            } else {
              onError(res)
            }
          } catch (error) {
            setErrorFor(key, error.toString())
          } finally {
            setLoadingFor(key, false)
          }
        }

        doFetch()
      }
    }, [selected])
  }

  fetchForSelected(
    () => `scene/${selected.x}/${selected.y}/scene.json`,
    'loadingSceneJson',
    json => {
      setSceneManifest(json)
      addToKnownScenes(json)
    },
    () => setSceneManifest(null),
    res =>
      setErrorFor(
        'loadingSceneJson',
        res.status === 404 ? 'Scene not found at parcel' : 'Error requesting scene info: ' + res.status
      )
  )

  fetchForSelected(
    () => `scenes?x1=${selected.x}&x2=${selected.x}&y1=${selected.y}&y2=${selected.y}`,
    'loadSceneCid',
    json => {
      const data: Array<any> = json.data
      if (data.length > 0) {
        setSceneCid(data[0].scene_cid)
      } else {
        setSceneCid(null)
      }
    },
    () => setSceneCid(null)
  )

  function selectedParcelTitle() {
    const name = tiles[`${selected.x},${selected.y}`].name
    return name ? name : 'Unnamed'
  }

  return (
    <Container>
      <h1>Deployments Map</h1>
      <div style={{ height: '700px' }}>
        <Atlas
          height={700}
          tiles={tiles}
          layers={[selectedStrokeLayer, selectedFillLayer, hasSceneLayer]}
          onClick={handleClick}
        />
        {selected && (
          <div className="map-overlay">
            <Close onClick={() => setSelected(null)} />
            <h2>
              {`[${selected.x}, ${selected.y}]`} - {selectedParcelTitle()}
            </h2>
            {sceneManifest && (
              <div>
                <h3>Scene data</h3>
                <ul>
                  {sceneCid && (
                    <li>
                      <b>Cid: </b> {sceneCid}
                    </li>
                  )}
                  <li>
                    <b>Title: </b> {sceneManifest.display.title}
                  </li>
                  <li>
                    <b>Owner: </b> {sceneManifest.owner}
                  </li>
                  <li>
                    <b>Contact Name: </b> {sceneManifest.contact.name}
                  </li>
                  <li>
                    <b>Contact Email: </b> {sceneManifest.contact.email}
                  </li>
                  {sceneManifest.source && (
                    <li>
                      <b>Source:</b>
                      <ul>
                        <li>
                          <b>Origin: </b> {sceneManifest.source.origin}
                        </li>
                        <li>
                          <b>Project Id: </b> {sceneManifest.source.projectId}
                        </li>
                      </ul>
                    </li>
                  )}
                </ul>
                {sceneCid && (
                  <Button primary onClick={redirectTo(`/scenes/details/${sceneCid}`)}>
                    Details
                  </Button>
                )}
              </div>
            )}
            {Object.values(loading).some(it => it) && <Loader size="massive" />}

            <ul>
              {Object.values(errors)
                .filter(it => !!it)
                .map(it => (
                  <li>{it}</li>
                ))}
            </ul>
          </div>
        )}
      </div>
    </Container>
  )
}

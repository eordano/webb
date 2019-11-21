import { Container, Atlas, Layer, Close, Loader } from 'decentraland-ui'
import React, { useState, useEffect } from 'react'
import { HORUS_CONFIG } from '../horus-config/config'

export const DeploymentAtlas = () => {
  const [selected, setSelected] = useState(undefined)
  const [sceneManifest, setSceneManifest] = useState(undefined)
  const [loadingScene, setLoadingScene] = useState(false)
  const [errorLoadingScene, setErrorLoadingScene] = useState(undefined)

  function isSelected(x: number, y: number) {
    return selected && selected.x === x && selected.y === y
  }

  const selectedStrokeLayer: Layer = (x, y) => {
    return isSelected(x, y) ? { color: '#ff0044', scale: 1.4 } : null
  }

  const selectedFillLayer: Layer = (x, y) => {
    return isSelected(x, y) ? { color: '#ff9990', scale: 1.2 } : null
  }

  const handleClick = (x: number, y: number) => {
    if (!isSelected(x, y)) {
      setSelected({ x, y })
    }
  }
  
  useEffect(() => {
    if(selected) {
      const fetchSceneManifest = async () => {
        setLoadingScene(true)
        setErrorLoadingScene(null)
        setSceneManifest(null)
        try {
          const res = await fetch(`${HORUS_CONFIG.CONTENT_SERVER_URL}/scene/${selected.x}/${selected.y}/scene.json`)
          if(res.status === 200) {
            const json = await res.json()
            setSceneManifest(json)
          } else {
            setErrorLoadingScene("Scene not found for position")
          }
        } catch (error) {
          setErrorLoadingScene(error)
        } finally {
          setLoadingScene(false)
        }
      }

      fetchSceneManifest()
    }    
  }, [selected])

  return (
    <Container>
      <h1>Deployments Map</h1>
      <div style={{ height: '700px' }}>
        <Atlas height={700} layers={[selectedStrokeLayer, selectedFillLayer]} onClick={handleClick} />
        {selected && (
          <div className="map-overlay">
            <Close onClick={() => setSelected(null)}/>
            <h2>{`[${selected.x}, ${selected.y}]`}{sceneManifest && (" - " + sceneManifest.display.title)}</h2>
            {loadingScene && <Loader size="massive"/>}
            {errorLoadingScene && <p>{errorLoadingScene.toString()}</p>}
          </div>
        )}
      </div>
    </Container>
  )
}

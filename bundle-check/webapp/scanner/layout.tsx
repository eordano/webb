import { RootState } from 'dcl/kernel/core/types'
import { configureDownloadServer } from 'dcl/kernel/scene-atlas/04-sceneId-resolution/actions'
import { resolvePositionToSceneManifest } from 'dcl/kernel/scene-atlas/resolvePositionToSceneManifest'
import { encodeParcelPosition, NamedAsset, SceneManifest } from 'dcl/utils'
import { Grid, Page, Progress, Segment } from 'decentraland-ui'
import React, { useEffect, useState } from 'react'
import { RenderForm } from './RenderForm'
import { store } from './store'
import { FormOptions, State } from './types'

export function delay(interval: number) {
  return new Promise(resolve => setTimeout(resolve, interval))
}

export function Layout() {
  const [options, setOptions] = useState({
    contentServer: 'https://content.decentraland.org/',
    assetBundleServer: 'https://content-as-bundle.decentraland.zone',
    x: -150,
    y: -150,
    width: 10,
    height: 10
  } as FormOptions)
  const [started, setStarted] = useState(false)
  return (
    <div style={{ marginTop: '20px' }}>
      <Page>
        <Segment>
          <h2>Asset Bundle Scanner</h2>
          {started ? (
            <ShowRunning {...options} />
          ) : (
            <FormController {...options} setOptions={setOptions} start={() => setStarted(true)} />
          )}
        </Segment>
      </Page>
    </div>
  )
}
const GLTF_ENDING = ['gltf', 'glb']
const TEXTURE_ENDING = ['png', 'tiff', 'jpg', 'jpeg']

export function ShowRunning(options: FormOptions) {
  const [running, setRunning] = useState(false)
  const [state, setState] = useState({
    state: 'Not started',
    done: 0,
    doneScanning: false,
    resolved: 0,
    currentX: options.x,
    currentY: options.y,
    totalBins: 0,
    totalGltfs: 0,
    totalTextures: 0,
    existingGltfs: 0,
    existingTextures: 0,
    scannedGltfs: 0,
    scannedTextures: 0,
    empty: 0,
    log: [],
    missing: [],
    errored: 0,
    pending: 0
  } as State)
  useEffect(() => {
    if (running) {
      return
    }
    setRunning(true)
    store.dispatch(configureDownloadServer(options.contentServer))

    const currents = {
      x: options.x,
      y: options.y,
      done: false,
      scenes: {},
      gltfs: {} as Record<string, { tested: boolean; scene: string }>,
      textures: {} as Record<string, { tested: boolean; scene: string }>,
      totalGltfs: 0,
      totalTextures: 0,
      scannedGltfs: 0,
      scannedTextures: 0,
      existingGltfs: 0,
      existingTextures: 0,
      missing: [],
      logs: []
    }
    // Fetch new scenes
    setTimeout(async () => {
      for (let i = 0; i < options.width; i++) {
        for (let j = 0; j < options.height; j++) {
          const scene = await resolvePositionToSceneManifest(store)(options.x + i, options.y + j)
          if (scene) {
            if (!currents.scenes[scene.id]) {
              currents.scenes[scene.id] = {
                started: false,
                manifest: scene
              }
            }
          }
          currents.x = options.x + i
          currents.y = options.y + j
        }
      }
      currents.done = true
    })

    // Try asset bundle server
    setInterval(async () => {
      const texts = Object.keys(currents.textures)
      for (let key of texts) {
        if (!currents.textures[key].tested) {
          currents.textures[key].tested = true
          const sceneId = currents.textures[key].scene
          const scene = currents.scenes[sceneId].manifest
          const res = await fetch(`${options.assetBundleServer}/${key}`, { method: 'HEAD' })
          if (res.status === 200) {
            currents.existingTextures++
          } else {
            currents.missing.push({
              coords: encodeParcelPosition(scene.baseParcel),
              scene: sceneId,
              name: scene.getCIDForFilePath(key),
              hash: key
            })
          }
          currents.scannedTextures++
        }
      }
      const keys = Object.keys(currents.gltfs)
      for (let key of keys) {
        if (!currents.gltfs[key].tested) {
          currents.gltfs[key].tested = true
          const sceneId = currents.gltfs[key].scene
          const scene = currents.scenes[sceneId].manifest
          const res = await fetch(`${options.assetBundleServer}/${key}`, { method: 'HEAD' })
          if (res.status === 200) {
            currents.existingGltfs++
          } else {
            currents.missing.push({
              coords: encodeParcelPosition(scene.baseParcel),
              scene: sceneId,
              name: scene.getCIDForFilePath(key),
              hash: key
            })
          }
          currents.scannedGltfs++
        }
      }
    }, 2000)

    // Fetch assets
    setInterval(() => {
      const keys = Object.keys(currents.scenes)
      for (let key of keys) {
        if (!currents.scenes[key].started) {
          currents.scenes[key].started = true
          const scene = currents.scenes[key].manifest as SceneManifest
          for (let asset of scene.assets) {
            if (assetEndsWith(asset, GLTF_ENDING) && !currents.gltfs[(asset as NamedAsset).hash]) {
              currents.gltfs[(asset as NamedAsset).hash] = { tested: false, scene: key }
              currents.totalGltfs++
            }
            if (assetEndsWith(asset, TEXTURE_ENDING) && !currents.textures[(asset as NamedAsset).hash]) {
              currents.textures[(asset as NamedAsset).hash] = { tested: false, scene: key }
              currents.totalTextures++
            }
          }

          currents.logs.push({
            coords: encodeParcelPosition(scene.baseParcel),
            scene: scene.id,
            gltfs: assetsEndingWith(scene.assets, GLTF_ENDING),
            bins: assetsEndingWith(scene.assets, ['bin']),
            textures: assetsEndingWith(scene.assets, TEXTURE_ENDING)
          })
        }
      }
    }, 1000)

    // Update
    setInterval(() => {
      const current = store.getState() as RootState
      setState({
        ...state,
        currentX: currents.x,
        currentY: currents.y,
        log: currents.logs,
        doneScanning: currents.done,
        totalTextures: currents.totalTextures,
        totalGltfs: currents.totalGltfs,
        scannedGltfs: currents.scannedGltfs,
        scannedTextures: currents.scannedTextures,
        existingTextures: currents.existingTextures,
        existingGltfs: currents.existingGltfs,
        missing: currents.missing,
        resolved: Object.keys(current.positionToSceneId.positionToScene).length,
        state:
          currents.done &&
          currents.scannedTextures === currents.totalTextures &&
          currents.scannedGltfs == currents.totalGltfs
            ? 'Done'
            : 'Running'
      })
    }, 100)
  }, [state])
  return (
    <Grid>
      <Grid.Row>
        <p>
          Scanning <strong>{options.contentServer}</strong> against <strong>{options.assetBundleServer}</strong> (from{' '}
          {options.x} to {options.y}, {options.width}x{options.height})...
        </p>
      </Grid.Row>
      <Grid.Row>
        Resolved: {state.resolved} positions (
        {state.doneScanning ? (
          'done resolving scenes'
        ) : (
          <span>
            {' '}
            scanning {state.currentX}, {state.currentY}{' '}
          </span>
        )}
        )
      </Grid.Row>
      <Grid.Row>
        <h2>Missing assets</h2>
      </Grid.Row>
      <Grid.Row>
        <Progress
          color={'red'}
          style={{ minWidth: '100%' }}
          value={state.scannedTextures - state.existingTextures}
          total={state.scannedTextures}
          label={`Textures: ${state.scannedTextures - state.existingTextures}/${state.scannedTextures}`}
        />
      </Grid.Row>
      <Grid.Row>
        <Progress
          color={'red'}
          style={{ minWidth: '100%' }}
          value={state.scannedGltfs - state.existingGltfs}
          total={state.scannedGltfs}
          label={`GLTFs: ${state.scannedGltfs - state.existingGltfs}/${state.scannedGltfs}`}
        />
      </Grid.Row>
      <Grid.Row>
        <h3>Scan progress</h3>
      </Grid.Row>
      <Grid.Row columns={16}>
        <Progress
          style={{ minWidth: '100%' }}
          color={state.state === 'Done' ? 'green' : 'grey'}
          percent={
            (100 * (1 + (state.currentX - options.x) * options.width + (state.currentY - options.y))) /
            (options.width * options.height)
          }
          label={`Scenes: ${1 +
            (state.currentX - options.x) * options.width +
            (state.currentY - options.y)}/${options.width * options.height}`}
        />
      </Grid.Row>
      <Grid.Row>
        <Progress
          color={state.state === 'Done' ? 'green' : 'grey'}
          style={{ minWidth: '100%' }}
          value={state.scannedTextures}
          total={state.totalTextures}
          label={`Textures: ${state.scannedTextures}/${state.totalTextures}`}
        />
      </Grid.Row>
      <Grid.Row>
        <Progress
          color={state.state === 'Done' ? 'green' : 'grey'}
          value={state.scannedGltfs}
          style={{ minWidth: '100%' }}
          total={state.totalGltfs}
          label={`GLTFs: ${state.scannedGltfs}/${state.totalGltfs}`}
        />
      </Grid.Row>
      <Grid.Row>
        {state.missing.map(log => (
          <div key={log.hash}>
            <p>
              Missing asset {log.name} ({log.hash}), first seen in {log.coords} ({log.scene})
            </p>
            <br />
          </div>
        ))}
      </Grid.Row>
      <Grid.Row>
        {state.log.map(log => (
          <div key={log.scene}>
            {log.coords}: {log.scene} ({log.gltfs} gltfs, {log.textures} textures)
          </div>
        ))}
      </Grid.Row>
    </Grid>
  )
}

function assetsEndingWith(assets: { name: string }[], endings: string[]) {
  let count = 0
  for (let asset of assets) {
    for (let ending of endings) {
      if (asset.name.endsWith(ending)) {
        count++
        break
      }
    }
  }
  return count
}
function assetEndsWith(asset: { name: string }, endings: string[]) {
  for (let ending of endings) {
    if (asset.name.endsWith(ending)) {
      return true
    }
  }
  return false
}

export function FormController(options: FormOptions & { disabled?: boolean; setOptions?: Function; start?: Function }) {
  return <RenderForm {...options} />
}

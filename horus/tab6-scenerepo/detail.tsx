import { store, waitFor } from 'dcl/kernel/core/store'
import { MemoryRendererParcelScene } from 'dcl/kernel/renderer/parcelScene/MemoryRendererParcelScene'
import { fetchManifestForSceneId } from 'dcl/kernel/scene-atlas/05-sceneManifest-resolution/sagas'
import { sceneRunner } from 'dcl/kernel/scene-atlas/06-scripts/sceneRunner'
import { getSceneStatus } from 'dcl/kernel/scene-atlas/06-scripts/selectors'
import { SceneWorkersManager } from 'dcl/kernel/scene-scripts/SceneWorkersManager'
import { registerAPI } from 'dcl/rpc'
import 'dcl/scene-api/lib/DevTools'
import { ECS } from 'dcl/synced-ecs/ecs/EntityComponentState'
import { encodeParcelPositionFromCoordinates, SceneManifest } from 'dcl/utils'
import { SyncedECS } from 'dcl/vangogh/SyncedECS'
import { Center, Grid, Header, HeaderMenu, Hero, Loader, Page, Segment } from 'decentraland-ui'
import React, { useEffect, useState } from 'react'
import { call } from 'redux-saga/effects'
import { sagasMiddleware } from '../kernel/store'

const syncedObjects = { count: 0 }

SceneWorkersManager.gamekitPath = '/dcl/gamekit/gamekit_bundle.js'

@registerAPI('EngineAPI')
export class StoreSyncedECS extends SyncedECS {
  startSignal() {
    syncedObjects.count++
    syncedObjects[syncedObjects.count] = this.ecs
    setTimeout(() => {
      ;(this.rendererParcelSceneAPI as any).readyPromise.resolve()
    }, 768)
    return super.startSignal()
  }
}
function ECSTree(props: { ecs: ECS }) {
  if (!props || !props.ecs) {
    return <p />
  }
  const { ecs } = props
  return <pre>{JSON.stringify(ecs, null, 2)}</pre>
}

export function SceneDetail(props: any) {
  const sceneId = props.pathname.split('/')[3]
  const [manifest, setManifest] = useState(undefined)
  useEffect(() => {
    ;(async function() {
      if (manifest !== undefined) {
        return
      }
      setManifest('loading')
      setManifest(await fetchManifestForSceneId('http://localhost:1338', sceneId))
    })()
  })
  const loading = !manifest || manifest === 'loading'
  const [ecs, setECS] = useState(undefined)
  useEffect(() => {
    ;(async function() {
      if (loading || ecs !== undefined) {
        return
      }
      const engine = new MemoryRendererParcelScene(scene)
      setECS(engine)
      setTimeout(() => {
        sagasMiddleware.run(function*() {
          yield call(sceneRunner, manifest)
        })
      }, 1)
      await waitFor(store, state => getSceneStatus(state, sceneId) === 'awake')
      engine.events.emit('sceneStart')
      ;(engine.readyPromise as any).resolve()
    })()
  })
  const [syncedEcs, setSyncedEcs] = useState(undefined)
  useEffect(() => {
    setInterval(() => {
      if (!syncedEcs || syncedObjects.count !== syncedEcs[0]) {
        setSyncedEcs([syncedObjects.count, syncedObjects])
      }
    }, 1000)
  })
  const scene = manifest as SceneManifest
  return (
    <Page>
      <Hero>
        <Center>
          <h2>
            {loading ? (
              <Loader />
            ) : (
              <>
                Scene: "{scene.title}" at {encodeParcelPositionFromCoordinates(scene.baseParcel.x, scene.baseParcel.y)}
              </>
            )}
          </h2>
          <h3 style={{ marginTop: 0, color: '#999' }}>{sceneId}</h3>
        </Center>
      </Hero>
      {loading ? (
        <Loader />
      ) : (
        <Grid>
          <Grid.Column width={16}>
            <Segment>
              <HeaderMenu>
                <HeaderMenu.Left>
                  <Header>Scene Status</Header>
                </HeaderMenu.Left>
              </HeaderMenu>
              {syncedEcs && syncedEcs.length ? <ECSTree ecs={syncedEcs[1]} /> : <p />}
            </Segment>
          </Grid.Column>
          <Grid.Row>
            <Segment>
              <h4>Files</h4>
              {scene.assets.map(asset => (
                <p key={asset.name}>
                  <strong>{asset.name}</strong>
                  <br />{' '}
                  <a href={`https://content.decentraland.org/contents/${(asset as any).hash}`}>{(asset as any).hash}</a>
                </p>
              ))}
            </Segment>
          </Grid.Row>
        </Grid>
      )}
    </Page>
  )
}

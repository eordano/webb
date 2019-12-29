import { Quaternion, Vector3, SceneLoader } from '@babylonjs/core'
import '@babylonjs/loaders'
import { RootState } from 'dcl/kernel/core/types'
import { getSceneManifest } from 'dcl/kernel/scene-atlas/05-sceneManifest-resolution/selectors'
import { GLTFShape } from 'dcl/scene-api'
import { ECS } from 'dcl/synced-ecs/ecs/EntityComponentState'
import React, { useContext, useState } from 'react'
import { BabylonJSContext, Engine, Scene } from 'react-babylonjs'
import { configureLights } from '../engineHelpers/ambientLights'
import { setupColliders } from '../engineHelpers/colliders'
import { processGLTFAssetContainer } from '../engineHelpers/assetContainer'
import { basename, filename, RendereableEntity } from '../BabylonHelpers'

type CurrentScene = { currentScene: string } & any

export function ScenePreview(props: RootState & CurrentScene) {
  const currentScene = props.currentScene || 'QmXUp1MfCaxvRPpTNyLAWmiVxeTDVhU6mVAGYqtmo7FDft'
  const babylonContext = useContext(BabylonJSContext)
  const statusRunning = props.sceneLifeCycle.running[currentScene]

  const [camX, setCamX] = useState(3)
  const [camY, setCamY] = useState(0.5)
  const [camZ, setCamZ] = useState(-3)

  if (currentScene && statusRunning) {
    const graph: any = { children: {}, transforms: {}, model: {} }
    const ecs = props.scenes[currentScene] as ECS
    const baseParcel = getSceneManifest(props, currentScene).baseParcel
    for (let element of ecs.entities) {
      if (element !== ecs.parent[element]) {
        graph.children[ecs.parent[element]] = graph.children[ecs.parent[element]] || []
        graph.children[ecs.parent[element]].push(element)
      }
      for (let component of ecs.entityComponents[element]) {
        if (ecs.componentClass[component] === '1') {
          graph.transforms[element] = {
            position: new Vector3(
              ecs.componentsById[component].position.x,
              ecs.componentsById[component].position.y,
              ecs.componentsById[component].position.z
            ),
            rotation: new Quaternion(
              ecs.componentsById[component].rotation.x,
              ecs.componentsById[component].rotation.y,
              ecs.componentsById[component].rotation.z,
              ecs.componentsById[component].rotation.w
            ),
            scale: new Vector3(
              ecs.componentsById[component].scale.x,
              ecs.componentsById[component].scale.y,
              ecs.componentsById[component].scale.z
            )
          }
        }
        if (ecs.componentClass[component] === '54') {
          graph.model[element] = ecs.componentsById[component]
        }
      }
    }
    function renderEntity(
      entity: string,
      offsetTransform?: {
        position: Vector3
        rotation: Quaternion
        scale: Vector3
      }
    ) {
      const transform = graph.transforms[entity]
      const m = graph.model[entity] as GLTFShape
      const offset = transform
        ? {
            position: offsetTransform.position.add(transform.position),
            rotation: offsetTransform.rotation.add(transform.rotation),
            scale: offsetTransform.scale.multiply(transform.scale)
          }
        : offsetTransform
      const modelProps: any = transform &&
        m && {
          key: entity,
          rotation: offset.rotation,
          position: offset.position,
          scaling: offset.scale,
          rootUrl: `http://localhost:1338/scene/${baseParcel.x}/${baseParcel.y}/${basename(m.src)}/`,
          sceneFilename: filename(m.src)
        }
      return (transform && m ? [modelProps] : []).concat(
        graph.children[entity] ? graph.children[entity].map((i: any) => renderEntity(i, offset)) : []
      )
    }
    return (
      <div>
        <h2>Scene Preview: {currentScene}</h2>
        <div>
          <input value={camX} onChange={ev => setCamX(parseInt(ev.target.value, 10))}></input>
          <input value={camY} onChange={ev => setCamY(parseInt(ev.target.value, 10))}></input>
          <input value={camZ} onChange={ev => setCamZ(parseInt(ev.target.value, 10))}></input>
        </div>
        <Engine
          canvasStyle={{ width: '800px', height: '400px' }}
          canvasId="scene-preview"
          babylonJSContext={babylonContext}
        >
          <Scene
            onSceneMount={sceneArgs => {
              const { scene } = sceneArgs
              setupColliders(scene)
              configureLights(scene)
              const entities = renderEntity('0', {
                position: Vector3.Zero(),
                rotation: new Quaternion(0, 0, 0, 1),
                scale: Vector3.One()
              })

              entities.flat().forEach((entity: RendereableEntity) => {
                SceneLoader.LoadAssetContainer(entity.rootUrl, entity.sceneFilename, scene, assets => {
                  const root = assets.createRootMesh()
                  root.position = entity.position
                  root.rotationQuaternion = entity.rotation
                  root.scaling = entity.scaling
                  processGLTFAssetContainer(assets)
                })
              })
            }}
          >
            <freeCamera name="camera1" position={new Vector3(8, 4, 0)} setTarget={[new Vector3(8, 0, 8)]} />
          </Scene>
        </Engine>
      </div>
    )
  } else if (!currentScene) {
    return <div>Select a scene from the atlas to see a preview.</div>
  } else {
    return <div>Loading...</div>
  }
}

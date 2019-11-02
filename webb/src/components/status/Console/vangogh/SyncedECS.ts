import { RendererParcelSceneToScript } from 'dcl/kernel/scene-scripts/kernelSpace/RendererParcelSceneToScript'
import { registerAPI } from 'dcl/rpc'
import { exposeMethod } from 'dcl/rpc/common/API'
import { EventDispatcher } from 'dcl/rpc/common/core/EventDispatcher'
import { IRendererParcelSceneToScript } from 'dcl/scene-api/interface/IRendererParcelSceneToScript'
import { ECS } from 'dcl/synced-ecs/ecs/EntityComponentState'
import { emptyState } from 'dcl/synced-ecs/ecs/generators/emptyState'
import { addComponent } from 'dcl/synced-ecs/ecs/reducers/addComponent'
import { addComponentClass } from 'dcl/synced-ecs/ecs/reducers/addComponentClass'
import { addEntity } from 'dcl/synced-ecs/ecs/reducers/addEntity'
import { changeEntityParent } from 'dcl/synced-ecs/ecs/reducers/changeEntityParent'
import { getComponentClassId } from 'dcl/synced-ecs/ecs/reducers/removeComponent'
import { updateComponent } from 'dcl/synced-ecs/ecs/reducers/updateComponent'
import { entityExists } from 'dcl/synced-ecs/ecs/selectors/entityExists'
import { getComponent } from 'dcl/synced-ecs/ecs/selectors/getComponent'
import { getEntityParent } from 'dcl/synced-ecs/ecs/selectors/getEntityParent'
import { deepCompare } from 'dcl/synced-ecs/ecs/util/deepCompare'

const names = {
  1: 'Transform',
  54: 'GLTF Shape'
}

export function componentName(name: any) {
  if (names[name]) {
    return names[name]
  }
  return '' + name
}
@registerAPI('EngineAPI')
export class SyncedECS extends RendererParcelSceneToScript implements IRendererParcelSceneToScript {
  ecs: ECS
  eventDispatcher = new EventDispatcher()
  constructor(transport: any) {
    super(transport)
    this.ecs = emptyState('0')
  }
  @exposeMethod
  on(event: string): Promise<void> {
    console.log('subscribed to ', event)
    super.subscribe(event as any)
    return Promise.resolve()
  }
  @exposeMethod
  startSignal(): Promise<void> {
    console.log('Start signal')
    super.startSignal()
    setTimeout(() => this.sendSubscriptionEvent('sceneStart' as any, {}), 100)
    return Promise.resolve()
  }
  @exposeMethod
  sendBatch(actions: any[]) {
    if (!actions.length) {
      return
    }
    console.log(actions)
    super.sendBatch(actions)
    const entities = {}
    const components = {}
    for (let action of actions) {
      if (action.type === 'ComponentCreated') {
        const p = JSON.parse(action.payload)
        components[p.id] = { id: p.id, classId: p.classId }
      }
      if (action.type === 'ComponentUpdated') {
        const p = JSON.parse(action.payload)
        components[p.id] = { ...components[p.id], component: JSON.parse(p.json) }
      }
      if (action.type === 'UpdateEntityComponent') {
        const p = JSON.parse(action.payload)
        const j = JSON.parse(p.json)
        components[action.tag] = { id: action.tag, classId: p.classId, component: j, entityId: p.entityId }
      }
      if (action.type === 'AttachEntityComponent') {
        const p = JSON.parse(action.payload)
        const id = p.entityId + '_' + p.id
        components[id] = { ...components[p.id], entityId: p.entityId }
      }
      if (action.type === 'CreateEntity') {
        entities[action.tag] = { id: action.tag }
      }
      if (action.type === 'SetEntityParent') {
        entities[action.tag] = { ...entities[action.tag], parent: JSON.parse(action.payload).parentId }
      }
    }
    for (let entity of Object.keys(entities)) {
      if (!entityExists(this.ecs, entity)) {
        this.ecs = addEntity(this.ecs, entity, entities[entity].parentId)
      }
      if (getEntityParent(this.ecs, entity) !== entities[entity].parentId) {
        this.ecs = changeEntityParent(this.ecs, entity, entities[entity].parentId)
      }
    }
    for (let componentId of Object.keys(components)) {
      const component = components[componentId]
      if (component.entityId) {
        let current
        if (!getComponentClassId(this.ecs, '' + component.classId)) {
          this.ecs = addComponentClass(this.ecs, '' + component.classId, componentName(component.classId))
        }
        if ((current = getComponent(this.ecs, componentId))) {
          if (!deepCompare(current, component.component)) {
            this.ecs = updateComponent(this.ecs, componentId, component.component)
          }
        } else {
          this.ecs = addComponent(
            this.ecs,
            component.entityId,
            '' + component.classId,
            component.component,
            componentId
          )
        }
      }
    }
    return Promise.resolve()
  }
}

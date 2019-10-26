import { ECS } from 'dcl/synced-ecs/ecs/EntityComponentState'
import { getComponentClassId } from 'dcl/synced-ecs/ecs/reducers/removeComponent'
import { getAllComponentsForEntity } from 'dcl/synced-ecs/ecs/selectors/getAllComponentsForEntity'
import { getComponent } from 'dcl/synced-ecs/ecs/selectors/getComponent'
import { getComponentName } from 'dcl/synced-ecs/ecs/selectors/getComponentName'
import { getEntityChildren } from 'dcl/synced-ecs/ecs/selectors/getEntityChildren'

export function renderComponents(ecs: ECS, entity: string, depth: string) {
  const comps = getAllComponentsForEntity(ecs, entity);
  return comps
    .map(_ => `${depth}  -> ${_} (${getComponentName(ecs, getComponentClassId(ecs, _))}): ${JSON.stringify(getComponent(ecs, _))}`)
    .join('\n');
}
export function renderEntity(ecs: ECS, entity: string, depth: string) {
  const components = renderComponents(ecs, entity, depth);
  const entities = getEntityChildren(ecs, entity)
    .filter(_ => _ !== entity)
    .map(_ => renderEntity(ecs, _, depth + '  '))
    .join('\n');
  return `${depth}* ${entity}${components ? `\n${components}` : ''}${entities ? `\n${entities}` : ''}`;
}

import { ECS } from './EntityComponentState'
import { getComponentClassId } from './reducers/removeComponent'
import { getAllComponentsForEntity } from './selectors/getAllComponentsForEntity'
import { getComponent } from './selectors/getComponent'
import { getComponentName } from './selectors/getComponentName'
import { getEntityChildren } from './selectors/getEntityChildren'

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

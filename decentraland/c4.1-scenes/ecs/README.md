# Entities, Components, Systems

A scene is a combination of entities that groups together components (pure state) and systems (pure behavior).

Systems are sorted in priority order and act primarily on Component Groups (the preferred way to reference entities is finding through what components they have).

```
interface Entity {
    id: string
    components: Component[]
}
interface Component {
    type: ComponentType
}
interface System {
    name: SystemName
    priority: SystemPriority
}

type ComponentType = number
type SystemPriority = number
type SystemName = string
```

The global way to access these is through the `ECSEngine` interface
```
type ComponentName = string

interface ECSEngine {
    entities: Entities[]
    components: Record<ComponentType, Component[]>
    componentNames: Record<ComponentType, ComponentName>
    componentToEntities: Record<ComponentType, Entity[]>
    systems: Record<SystemName, System>
    systemsByPriority: Record<SystemPriority, System[]>
}
```
import { AbstractMesh, Material, Node, Scene, TransformNode } from '@babylonjs/core'
import { GridMaterial } from '@babylonjs/materials'
const colliderSymbol = Symbol('isCollider')

export const colliderMaterialContainer: { material?: Material } = {}
export function setupColliders(scene: Scene) {
  const material = (colliderMaterialContainer.material = new GridMaterial('collider-material', scene))
  material.opacity = 0.99
  material.sideOrientation = 0
  material.zOffset = -1
  material.fogEnabled = false
}

export function markAsCollider(mesh: AbstractMesh) {
  // tslint:disable-next-line:semicolon
  ;(mesh as any)[colliderSymbol] = true
  mesh.material = colliderMaterialContainer.material
}

export function isCollider(mesh: AbstractMesh) {
  return !!(mesh as any)[colliderSymbol]
}

function isMesh($: Node) {
  return $ instanceof AbstractMesh
}

export function toggleColliderHighlight(visible: boolean, root: TransformNode) {
  const meshes: AbstractMesh[] = root.getDescendants(false, isMesh) as any

  let normalVisibility = visible ? 0.2 : 1
  let colliderVisibility = visible ? 1 : 0

  for (let mesh of meshes) {
    if (isCollider(mesh)) {
      mesh.visibility = colliderVisibility
    } else {
      mesh.visibility = normalVisibility
    }
  }
}

export function toggleBoundingBoxes(visible: boolean, root: TransformNode) {
  const meshes: AbstractMesh[] = root.getDescendants(false, isMesh) as any

  for (let mesh of meshes) {
    mesh.showBoundingBox = mesh.showSubMeshesBoundingBox = visible
  }
}

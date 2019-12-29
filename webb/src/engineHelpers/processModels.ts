import { Animatable, AnimationGroup, AssetContainer, Node, Scene, Skeleton } from '@babylonjs/core'
import { markAsCollider } from './colliders'

function disposeDelegate($: { dispose: Function }) {
  $.dispose()
}

function disposeNodeDelegate($: Node | null) {
  if (!$) return
  $.setEnabled(false)
  $.parent = null
  $.dispose(false)
}

function disposeSkeleton($: Skeleton) {
  $.dispose()
  $.bones.forEach($ => {
    $.parent = null
    $.dispose()
  })
}

function disposeAnimatable($: Animatable | null) {
  if (!$) return
  $.disposeOnEnd = true
  $.loopAnimation = false
  $.stop()
  $._animate(0)
}

export function disposeAnimationGroups($: AnimationGroup, scene: Scene) {
  $.animatables.forEach(disposeAnimatable)

  $.targetedAnimations.forEach($ => {
    disposeAnimatable(scene.getAnimatableByTarget($.target))
  })

  $.dispose()
}

export function cleanupAssetContainer($: AssetContainer, scene: Scene) {
  if ($) {
    $.removeAllFromScene()
    $.transformNodes && $.transformNodes.forEach(disposeNodeDelegate)
    $.rootNodes && $.rootNodes.forEach(disposeNodeDelegate)
    $.meshes && $.meshes.forEach(disposeNodeDelegate)
    // Textures disposals are handled by monkeyLoader.ts
    // NOTE: $.textures && $.textures.forEach(disposeDelegate)
    $.animationGroups && $.animationGroups.forEach(_ => disposeAnimationGroups(_, scene))
    $.multiMaterials && $.multiMaterials.forEach(disposeDelegate)
    $.sounds && $.sounds.forEach(disposeDelegate)
    $.skeletons && $.skeletons.forEach(disposeSkeleton)
    $.materials && $.materials.forEach(disposeDelegate)
    $.lights && $.lights.forEach(disposeDelegate)
  }
}

export function processColliders($: AssetContainer) {
  for (let i = 0; i < $.meshes.length; i++) {
    let mesh = $.meshes[i]

    if (mesh.name.toLowerCase().endsWith('collider')) {
      mesh.checkCollisions = true
      mesh.visibility = 0
      mesh.isPickable = false
      markAsCollider(mesh)
    } else {
      mesh.isPickable = true
    }
  }
}

import { Entity, GLTFShape, engine, Vector3, Transform, AnimationClip, Animator } from 'decentraland-ecs/src'

CreateMesh(new Vector3(1.2,0,0.5));
CreateMesh(new Vector3(4.2,0,0.5));
CreateMesh(new Vector3(7.2,0,0.5));

CreateMesh(new Vector3(8.8,0,3));
CreateMesh(new Vector3(5.8,0,3));
CreateMesh(new Vector3(2.8,0,3));

CreateMesh(new Vector3(1.2,0,7));
CreateMesh(new Vector3(4.2,0,7));
//CreateMesh(new Vector3(7.2,0,7));

//CreateMesh(new Vector3(5,0,9.5));

function CreateMesh(pos : Vector3){
  const entity = new Entity();

  let shape = new GLTFShape("models/test.gltf"); 
  entity.add(shape);
  entity.add(new Transform({position: pos}));

  const animator = new Animator();
  let animClip = new AnimationClip("Animation");
  animator.addClip(animClip)
  entity.add(animator);

  animClip.play();

  engine.addEntity(entity);
}
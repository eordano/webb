import { Quaternion, Vector3 } from '@babylonjs/core';
declare global {
  namespace JSX {
    interface IntrinsicElements {
      model: any;
    }
  }
}
export function basename(str: string) {
  const split = str.split('/');
  return split.slice(0, split.length - 1).join('/');
}
export function filename(str: string) {
  const split = str.split('/');
  return split[split.length - 1];
}
export type RendereableEntity = {
  key: string;
  rotation: Quaternion;
  position: Vector3;
  scaling: Vector3;
  rootUrl: string;
  sceneFilename: string;
};

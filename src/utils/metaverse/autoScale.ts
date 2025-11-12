import * as THREE from "three";

export function computeAutoScaleAndOffset(
  root: THREE.Object3D,
  height: number,
  visualScale: number
) {
  root.updateMatrixWorld(true);
  const box = new THREE.Box3().setFromObject(root);
  const size = new THREE.Vector3();
  const center = new THREE.Vector3();
  box.getSize(size);
  box.getCenter(center);

  const safeHeight = Math.max(size.y, 1e-6);
  const computedScale = (height / safeHeight) * visualScale;
  const yOffset = -box.min.y * computedScale;
  const xOffset = -center.x * computedScale;
  const zOffset = -center.z * computedScale;

  return {
    modelScale: computedScale,
    modelOffset: new THREE.Vector3(xOffset, yOffset, zOffset),
  };
}
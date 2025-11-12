import { useMemo, MutableRefObject} from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { RapierRigidBody } from "@react-three/rapier";

export function useCameraTargetLerp(
  controlsRef: React.MutableRefObject<OrbitControlsImpl | null> | undefined,
  bodyRef: MutableRefObject<RapierRigidBody | null>,
  heightOffset = 1.0,
  lerpAlpha = 0.12
) {
  const target = useMemo(() => new THREE.Vector3(), []);
  useFrame(() => {
    const body = bodyRef.current;
    if (!body || !controlsRef?.current) return;

    const p = body.translation();
    target.set(p.x, p.y + heightOffset, p.z);
    controlsRef.current.target.lerp(target, lerpAlpha);
    controlsRef.current.update();
  });
}
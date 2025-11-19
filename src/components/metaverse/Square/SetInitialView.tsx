"use client";

import * as THREE from "three";
import { useRef } from "react";
import { useThree } from "@react-three/fiber";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { SPAWN } from "@/constants/METAVERSE";

type Props = {
  controlsRef: React.MutableRefObject<OrbitControlsImpl | null>;
  doorPos: [number, number, number];
  extraHeight?: number; // 살짝 위에서 내려다보는 높이 
  padding?: number;     // 둘 다 프레임에 여유 있게 담는 비율 
};

export default function SetInitialView({
  controlsRef,
  doorPos,
  extraHeight = 2.0,
  padding = 1.15,
}: Props) {
  const { camera } = useThree();
  const ranRef = useRef(false);

  if (!ranRef.current) {
    ranRef.current = true;

    const player = new THREE.Vector3(...SPAWN);
    const door = new THREE.Vector3(...doorPos);

    // 중점(타깃)
    const mid = new THREE.Vector3().addVectors(player, door).multiplyScalar(0.5);
    mid.y = Math.max(player.y, door.y) + extraHeight;

    // 두 점 사이 거리 기반 카메라 거리
    const sep = player.distanceTo(door);
    const persp = camera as THREE.PerspectiveCamera;
    const fov = THREE.MathUtils.degToRad(persp.fov);

    const dist = (sep * 0.5 * padding) / Math.sin(fov / 2);

    // 두 점을 잇는 선분에 수직 방향(측면)으로 배치 → 둘 다 잘 보이게
    const v = door.clone().sub(player); v.y = 0;
    if (v.lengthSq() < 1e-6) v.set(0, 0, 1);
    const side = new THREE.Vector3(-v.z, 0, v.x).normalize();

    const pos = mid.clone()
      .addScaledVector(side, dist)
      .add(new THREE.Vector3(0, extraHeight, 0));

    camera.position.copy(pos);
    camera.lookAt(mid);
    camera.updateProjectionMatrix();

    if (controlsRef.current) {
      controlsRef.current.target.copy(mid);
      controlsRef.current.update();
    }
  }

  return null;
}

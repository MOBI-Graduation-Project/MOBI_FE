"use client";

import { useEffect } from "react";

import { useThree } from "@react-three/fiber";
import * as THREE from "three";

export interface OrbitControlsRef {
  target: THREE.Vector3;
  minDistance: number;
  maxDistance: number;
  update: () => void;
}

export default function useFitCameraToRoom(
  room: THREE.Object3D | null,
  controlsRef: React.MutableRefObject<OrbitControlsRef | null>,
) {
  const camera = useThree(s => s.camera as THREE.PerspectiveCamera);

  useEffect(() => {
    if (!room) return;

    const box = new THREE.Box3().setFromObject(room);
    const center = box.getCenter(new THREE.Vector3());
    const radius = box.getBoundingSphere(new THREE.Sphere()).radius;

    const fov = (camera.fov * Math.PI) / 180;
    const padding = 0.5;
    const distance = (radius * padding) / Math.sin(fov / 2);

    // 정면(+Z)에서 살짝 위
    const dir = new THREE.Vector3(0, 0.25, 1).normalize();
    const pos = center.clone().add(dir.multiplyScalar(distance));

    camera.position.copy(pos);
    camera.near = Math.max(0.1, radius * 0.01);
    camera.far = radius * 30;
    camera.lookAt(center);
    camera.updateProjectionMatrix();

    if (controlsRef.current) {
      controlsRef.current.target.copy(center);
      controlsRef.current.minDistance = distance * 0.6;
      controlsRef.current.maxDistance = distance * 1.8;
      controlsRef.current.update();
    }
  }, [room, camera, controlsRef]);
}

"use client";

import { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

type Props = {
  path: string;
  fitSize?: number;  
  padding?: number;   
};

export default function CharacterModel({ path, fitSize = 2.8, padding = 0.9 }: Props) {
  const { scene } = useGLTF(path);
  const cloned = useMemo(() => scene.clone(true), [scene]);

  const { scale, offset } = useMemo(() => {
    cloned.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(cloned);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    const major = Math.max(size.x, size.y);
    const safeMajor = Math.max(major, 1e-6);
    const scale = (fitSize * padding) / safeMajor;

    const x = -center.x * scale;
    const y = -center.y * scale;
    const z = -center.z * scale;

    return { scale, offset: new THREE.Vector3(x, y, z) };
  }, [cloned, fitSize, padding]);

  return (
    <group position={offset} scale={scale}>
      <primitive object={cloned} />
    </group>
  );
}

useGLTF.preload("/models/111.glb");
useGLTF.preload("/models/112.glb");
useGLTF.preload("/models/121.glb");
useGLTF.preload("/models/122.glb");
useGLTF.preload("/models/211.glb");
useGLTF.preload("/models/212.glb");
useGLTF.preload("/models/221.glb");
useGLTF.preload("/models/222.glb");

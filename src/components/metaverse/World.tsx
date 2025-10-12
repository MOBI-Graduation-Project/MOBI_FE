"use client";

import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import * as THREE from "three";

const World = () => {
  const { scene } = useGLTF("/models/square.glb");

  return (
    <RigidBody type="fixed" colliders="trimesh">
      <primitive
        object={scene}
        scale={0.5}
        position={new THREE.Vector3(0, 0, 0)}
      />
    </RigidBody>
  );
};

useGLTF.preload("/models/square.glb");

export default World;

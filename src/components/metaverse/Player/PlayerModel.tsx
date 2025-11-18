"use client";

import { useMemo, forwardRef, useImperativeHandle, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { computeAutoScaleAndOffset } from "@/utils/metaverse/autoScale";

type Props = {
  characterPath: string;
  visualScale: number;
  height: number;
};

const PlayerModel = forwardRef<THREE.Group, Props>(function PlayerModel(
  { characterPath, visualScale, height }, ref
) {
  const { scene } = useGLTF(characterPath);
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  const { modelScale, modelOffset } = useMemo(
    () => computeAutoScaleAndOffset(clonedScene, height, visualScale),
    [clonedScene, height, visualScale]
  );

  const groupRef = useRef<THREE.Group>(null);
  useImperativeHandle(ref, () => groupRef.current as THREE.Group, []);

  return (
    <group ref={groupRef}>
      <group position={modelOffset} scale={modelScale}>
        <primitive object={clonedScene} scale={visualScale} />
      </group>
    </group>
  );
});

useGLTF.preload("/models/default.glb");
export default PlayerModel;
"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import { RigidBody, RapierRigidBody } from "@react-three/rapier";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { useCharacterStore } from "@/stores/characterStore";

type PlayerProps = {
  controlsRef?: React.MutableRefObject<OrbitControlsImpl | null>; 
  visualScale?: number;                                           
};

const MOVE_SPEED = 5;
const JUMP_FORCE = 5;

const Player = ({ controlsRef, visualScale = 0.3 }: PlayerProps) => {
  const { characterType } = useCharacterStore();
  const bodyRef = useRef<RapierRigidBody>(null);
  const modelRef = useRef<THREE.Group>(null);

  const { scene } = useGLTF(
    characterType ? `/models/${characterType}.glb` : "/models/default.glb"
  );
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  const [, getKeys] = useKeyboardControls();

  useFrame((state) => {
    if (!bodyRef.current) return;
    const { forward, back, left, right, jump } = getKeys();
    const velocity = bodyRef.current.linvel();

    // 카메라 기준 이동
    const cam = state.camera;
    const camDir = new THREE.Vector3();
    cam.getWorldDirection(camDir);
    camDir.y = 0;
    camDir.normalize();

    const camRight = new THREE.Vector3();
    camRight.crossVectors(camDir, new THREE.Vector3(0, 1, 0)).normalize();

    const moveDir = new THREE.Vector3();
    if (forward) moveDir.add(camDir);
    if (back) moveDir.sub(camDir);
    if (right) moveDir.add(camRight);
    if (left) moveDir.sub(camRight);
    if (moveDir.lengthSq() > 0) moveDir.normalize().multiplyScalar(MOVE_SPEED);

    bodyRef.current.setLinvel({ x: moveDir.x, y: velocity.y, z: moveDir.z }, true);

    if (jump && Math.abs(velocity.y) < 0.05) {
      bodyRef.current.setLinvel({ x: velocity.x, y: JUMP_FORCE, z: velocity.z }, true);
    }

    if (modelRef.current && moveDir.lengthSq() > 0.0001) {
      const angle = Math.atan2(moveDir.x, moveDir.z);
      modelRef.current.rotation.y = angle;
    }

    // controlsRef가 있을 때만 target 보간 (없으면 스킵)
    const p = bodyRef.current.translation();
    if (controlsRef?.current) {
      const target = new THREE.Vector3(p.x, p.y + 1.0, p.z);
      controlsRef.current.target.lerp(target, 0.12);
      controlsRef.current.update();
    }
  });

  return (
    <RigidBody
      ref={bodyRef}
      colliders="ball"
      position={[5, 2, 0]}
      lockRotations
      mass={1}
      linearDamping={4}
      angularDamping={1}
    >
      <group ref={modelRef}>
        <primitive object={clonedScene} scale={visualScale} />
      </group>
    </RigidBody>
  );
};

useGLTF.preload("/models/default.glb");
export default Player;

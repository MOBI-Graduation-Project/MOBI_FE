"use client";

import { useMemo, useRef } from "react";

import { useCharacterStore } from "@/stores/characterStore";
import { useKeyboardControls } from "@react-three/drei";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

interface PlayerProps {
  controlsRef?: React.MutableRefObject<OrbitControlsImpl | null>;
  visualScale?: number;
  moveSpeed?: number;
  height?: number; //에셋들 크기 통일을 위해 높이변수 추가
}

const MOVE_SPEED = 5;
const JUMP_FORCE = 5;
const KILL_Y = -2;
const SPAWN: [number, number, number] = [5, 2, 0];

const Player = ({
  controlsRef,
  visualScale = 0.5,
  moveSpeed = MOVE_SPEED,
  height = 7,
}: PlayerProps) => {
  const { characterType } = useCharacterStore();
  const bodyRef = useRef<RapierRigidBody>(null);
  const modelRef = useRef<THREE.Group>(null);

  const { scene } = useGLTF(
    characterType ? `/models/${characterType}.glb` : "/models/default.glb",
  );
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  //에셋마다 실제 크기나 중심이 달라서 자동으로 균일하게 스케일 맞추고 발바닥을 바닥에 붙여주기
  const { modelScale, modelOffset } = useMemo(() => {
    clonedScene.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(clonedScene);
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
  }, [clonedScene, height, visualScale]);

  const [, getKeys] = useKeyboardControls();

  useFrame(state => {
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
    if (moveDir.lengthSq() > 0) {
      moveDir.normalize().multiplyScalar(moveSpeed);
    }

    bodyRef.current.setLinvel(
      { x: moveDir.x, y: velocity.y, z: moveDir.z },
      true,
    );

    if (jump && Math.abs(velocity.y) < 0.05) {
      bodyRef.current.setLinvel(
        { x: velocity.x, y: JUMP_FORCE, z: velocity.z },
        true,
      );
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

    const pos = bodyRef.current.translation();
    if (pos.y < KILL_Y) {
      bodyRef.current.setTranslation(
        { x: SPAWN[0], y: SPAWN[1], z: SPAWN[2] },
        true,
      );
      bodyRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
      bodyRef.current.setAngvel({ x: 0, y: 0, z: 0 }, true);
    }
  });

  return (
    <RigidBody
      ref={bodyRef}
      colliders="ball"
      position={SPAWN}
      ccd
      lockRotations
      mass={1}
      linearDamping={4}
      angularDamping={1}
    >
      <group ref={modelRef}>
        <group position={modelOffset} scale={modelScale}>
          <primitive object={clonedScene} scale={visualScale} />
        </group>
      </group>
    </RigidBody>
  );
};

useGLTF.preload("/models/default.glb");
export default Player;

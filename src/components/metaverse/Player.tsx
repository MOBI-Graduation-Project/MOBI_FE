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
  controlsRef: React.MutableRefObject<OrbitControlsImpl | null>;
};

const MOVE_SPEED = 5;
const JUMP_FORCE = 5;

const Player = ({ controlsRef }: PlayerProps) => {
  const { characterType } = useCharacterStore();
  const bodyRef = useRef<RapierRigidBody>(null);
  const modelRef = useRef<THREE.Group>(null);

  // 모델 로드
  const { scene } = useGLTF(
    characterType ? `/models/${characterType}.glb` : "/models/default.glb"
  );

  // 재렌더 방지: clone은 useMemo로 1회만
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  // 키 입력
  const [, getKeys] = useKeyboardControls();

  useFrame((state, delta) => {
    if (!bodyRef.current) return;

    const { forward, back, left, right, jump } = getKeys();

    // 현재 속도
    const velocity = bodyRef.current.linvel();

    // 카메라 기준 이동 벡터 계산 (수평면에서만)
    const cam = state.camera;
    const camDir = new THREE.Vector3();
    cam.getWorldDirection(camDir);
    camDir.y = 0;
    camDir.normalize(); 

    const camRight = new THREE.Vector3();
    camRight.crossVectors(camDir, new THREE.Vector3(0, 1, 0)).normalize(); // 카메라 기준 우/좌

    // 입력을 벡터로
    const moveDir = new THREE.Vector3();
    if (forward) moveDir.add(camDir);
    if (back) moveDir.sub(camDir);
    if (right) moveDir.add(camRight);
    if (left) moveDir.sub(camRight);

    if (moveDir.lengthSq() > 0) {
      moveDir.normalize().multiplyScalar(MOVE_SPEED);
    }

    // 속도 적용 (수직 성분은 유지)
    bodyRef.current.setLinvel(
      { x: moveDir.x, y: velocity.y, z: moveDir.z },
      true
    );

    // 점프 
    if (jump && Math.abs(velocity.y) < 0.05) {
      bodyRef.current.setLinvel(
        { x: velocity.x, y: JUMP_FORCE, z: velocity.z },
        true
      );
    }

    // 모델 회전: 이동 방향을 바라보게
    if (modelRef.current && moveDir.lengthSq() > 0.0001) {
      const angle = Math.atan2(moveDir.x, moveDir.z);
      modelRef.current.rotation.y = angle;
    }

    // OrbitControls의 target만 플레이어 위치로 부드럽게 보간
    const p = bodyRef.current.translation(); 
    const target = new THREE.Vector3(p.x, p.y + 1.0, p.z); 
    if (controlsRef.current) {
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
        <primitive object={clonedScene} scale={0.3} />
      </group>
    </RigidBody>
  );
};

// 기본 모델 프리로드
useGLTF.preload("/models/default.glb");

export default Player;

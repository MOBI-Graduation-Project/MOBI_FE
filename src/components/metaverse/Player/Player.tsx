"use client";

import { useMemo, useRef } from "react";

import { useUserStore } from "@/stores/userStore";
import { useFrame } from "@react-three/fiber";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

import { toModelFile } from "@/constants/AVATAR";
import {
  DEFAULT_TARGET_HEIGHT,
  DEFAULT_VISUAL_SCALE,
  JUMP_FORCE,
  KILL_Y,
  MOVE_SPEED,
  SPAWN,
} from "@/constants/METAVERSE";

import { useCameraTargetLerp } from "@/hooks/metaverse/useCameraTargetLerp";
import { usePlayerInput } from "@/hooks/metaverse/usePlayerInput";

import PlayerModel from "./PlayerModel";

interface PlayerProps {
  controlsRef?: React.MutableRefObject<OrbitControlsImpl | null>;
  visualScale?: number;
  moveSpeed?: number;
  height?: number; //에셋들 크기 통일을 위해 높이변수 추가
}

export default function Player({
  controlsRef,
  visualScale = DEFAULT_VISUAL_SCALE,
  moveSpeed = MOVE_SPEED,
  height = DEFAULT_TARGET_HEIGHT,
}: PlayerProps) {
  const bodyRef = useRef<RapierRigidBody>(null);
  const modelRef = useRef<THREE.Group>(null);
  useCameraTargetLerp(controlsRef, bodyRef, 1.0, 0.12);

  const avatarCode = useUserStore(state => state.avatarCode);

  const modelPath = useMemo(
    () => toModelFile(avatarCode ?? undefined),
    [avatarCode],
  );

  const getKeys = usePlayerInput();

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
      <PlayerModel
        ref={modelRef}
        characterPath={modelPath}
        visualScale={visualScale}
        height={height}
      />
    </RigidBody>
  );
}

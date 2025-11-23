"use client";

import { useMemo } from "react";

import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import * as THREE from "three";

import DoorPlaced from "./DoorPlaced";
import WhiteboardPlaced from "./WhiteboardPlaced";
import useFitCameraToRoom from "./useFitCameraToRoom";

export interface OrbitControlsRef {
  target: THREE.Vector3;
  minDistance: number;
  maxDistance: number;
  update: () => void;
}

export default function MyRoomScene({
  controlsRef,
}: {
  controlsRef: React.MutableRefObject<OrbitControlsRef | null>;
}) {
  const roomGltf = useGLTF("/models/myroom.glb");
  const whiteboardGltf = useGLTF("/models/whiteboard.glb");
  const doorGltf = useGLTF("/models/yellowDoor.glb");

  const room = useMemo(() => roomGltf.scene.clone(true), [roomGltf.scene]);
  const whiteboard = useMemo(
    () => whiteboardGltf.scene.clone(true),
    [whiteboardGltf.scene],
  );
  const door = useMemo(() => doorGltf.scene.clone(true), [doorGltf.scene]);

  useFitCameraToRoom(room, controlsRef);

  return (
    <>
      {/* 방 본체 */}
      <RigidBody type="fixed" colliders="trimesh">
        <primitive object={room} />
      </RigidBody>

      {/* 화이트보드 */}
      <WhiteboardPlaced room={room} whiteboard={whiteboard} />

      {/* 문 */}
      <DoorPlaced room={room} door={door} />
    </>
  );
}

useGLTF.preload("/models/myroom.glb");
useGLTF.preload("/models/whiteboard.glb");
useGLTF.preload("/models/yellowDoor.glb");

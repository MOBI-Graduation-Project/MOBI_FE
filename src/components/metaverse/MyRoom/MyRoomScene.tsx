"use client";
import * as THREE from "three";
import { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

import useFitCameraToRoom from "./useFitCameraToRoom";
import WhiteboardPlaced from "./WhiteboardPlaced";
import DoorPlaced from "./DoorPlaced";

export default function MyRoomScene({
  controlsRef,
}: {
  controlsRef: React.MutableRefObject<any>;
}) {
  const roomGltf = useGLTF("/models/myroom.glb");
  const whiteboardGltf = useGLTF("/models/whiteboard.glb");
  const doorGltf = useGLTF("/models/doorway.glb");

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
useGLTF.preload("/models/doorway.glb");

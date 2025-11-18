"use client";
import * as THREE from "three";
import { useMemo } from "react";
import { Html } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useRouter } from "next/navigation";
import type { ThreeEvent } from "@react-three/fiber";

export default function WhiteboardPlaced({
  room,
  whiteboard,
}: {
  room: THREE.Object3D;
  whiteboard: THREE.Object3D;
}) {
  const router = useRouter();

  const { pos, rotY, scale } = useMemo(() => {
    const roomBox = new THREE.Box3().setFromObject(room);
    const roomSize = roomBox.getSize(new THREE.Vector3());

    const wbBox = new THREE.Box3().setFromObject(whiteboard);
    const wbSize = wbBox.getSize(new THREE.Vector3());

    const baseHeight = Math.max(wbSize.y, 0.001);
    const baseScale = (roomSize.y * 0.6) / baseHeight;
    const scale = THREE.MathUtils.clamp(baseScale * 10, 0.1, 20);

    const scaledW = wbSize.x * scale;
    const scaledH = wbSize.y * scale;

    const deltaRight = Math.max(0.3, roomSize.x * 0.05);
    const deltaDown = -Math.max(0.2, roomSize.y * 0.05);

    const maxXInside = roomBox.max.x - scaledW * 0.05;
    const minXInside = roomBox.min.x + scaledW * 0.05;
    const minYInside = roomBox.min.y + scaledH * 0.05;

    const baseX = 25;
    const baseY = 0;
    const z = 12;

    const desiredX = baseX + deltaRight;
    const desiredY = baseY + deltaDown;

    const x = THREE.MathUtils.clamp(desiredX, minXInside, maxXInside);
    const y = Math.max(desiredY, minYInside);
    const rotY = Math.PI / 2;

    return { pos: [x, y, z] as [number, number, number], rotY, scale };
  }, [room, whiteboard]);

  const onClick = () => router.push("/investment");
  const onOver = (e: ThreeEvent<PointerEvent>) => {
    document.body.style.cursor = "pointer";
    e.stopPropagation();
  };
  const onOut = (e: ThreeEvent<PointerEvent>) => {
    document.body.style.cursor = "default";
    e.stopPropagation();
  };

  return (
    <RigidBody type="fixed" colliders="trimesh">
      <group position={pos} rotation={[0, rotY + Math.PI, 0]} scale={scale}>
        <primitive
          object={whiteboard}
          onClick={onClick}
          onPointerOver={onOver}
          onPointerOut={onOut}
        />
        <Html transform center position={[0, 1.2, 0]}>
          <div className="text-brown bg-[var(--color-yellow-10)] rounded-[12px] px-[3px] py-[2px] text-[4px] whitespace-nowrap select-none font-[geekble]">
            보드 클릭하여 보유현황 보기
          </div>
        </Html>
      </group>
    </RigidBody>
  );
}

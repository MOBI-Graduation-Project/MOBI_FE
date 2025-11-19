"use client";

import * as THREE from "three";
import { useMemo } from "react";
import { Html } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useRouter } from "next/navigation";
import type { ThreeEvent } from "@react-three/fiber";

export default function DoorPlaced({
  room,
  door,
}: {
  room: THREE.Object3D;
  door: THREE.Object3D;
}) {
  const router = useRouter();

  const { xLeftOfTV, yOnFloor, zBackWall, rotY, scale } = useMemo(() => {
    // 방 크기 정보
    const roomBox = new THREE.Box3().setFromObject(room);
    const roomSize = roomBox.getSize(new THREE.Vector3());
    const centerX = (roomBox.min.x + roomBox.max.x) / 2;
    const centerZ = (roomBox.min.z + roomBox.max.z) / 2;

    // 문 원본 크기
    const dBox = new THREE.Box3().setFromObject(door);
    const dSize = dBox.getSize(new THREE.Vector3());

    // 방 높이 기준 스케일 (네 코드 그대로)
    const targetHeight = roomSize.y * 0.9;
    const scale =
      THREE.MathUtils.clamp(targetHeight / Math.max(dSize.y, 1e-6), 0.1, 20) *
      1.4;

    const scaledH = dSize.y * scale;
    const scaledD = dSize.z * scale; // 문 두께(스케일 반영)
    const epsilon = Math.max(0.02, roomSize.z * 0.005);

    const doorMinYScaled = dBox.min.y * scale;
    const bottomToCenter = scaledH / 2 + doorMinYScaled;

    const wallInset = Math.max(0.1, roomSize.z * 0.01);
    const xLeftOfTV = centerX - roomSize.x * 0.25;
    const zBackWall = roomBox.min.z + scaledD / 2 + epsilon; // 벽 파묻힘 방지

    const extraDown = roomSize.y * 0.29;
    const yOnFloor = roomBox.min.y + bottomToCenter - extraDown;

    const rotY = 0;

    return { xLeftOfTV, yOnFloor, zBackWall, rotY, scale };
  }, [room, door]);

  const onClick = () => router.push("/metaverse/square");
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
      <group
        position={[xLeftOfTV, yOnFloor, zBackWall]}
        rotation={[0, rotY, 0]}
        scale={scale}
      >
        <primitive
          object={door}
          onClick={onClick}
          onPointerOver={onOver}
          onPointerOut={onOut}
        />

        {/* 문 안내 문구 (네 좌표 그대로) */}
        <Html transform center position={[-0.1, 1.2, 0.05]}>
          <div className="font-[geekble] text-white bg-[rgba(0,0,0,0.6)] rounded-[10px] px-[2px] py-[2px] text-[3px] whitespace-nowrap select-none">
            문을 클릭하여 광장으로 이동
          </div>
        </Html>
      </group>
    </RigidBody>
  );
}

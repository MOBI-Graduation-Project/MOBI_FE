"use client";

import { useRouter } from "next/navigation";

import { useMemo } from "react";

import { Html, useGLTF } from "@react-three/drei";
import type { ThreeEvent } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import * as THREE from "three";

type Props = {
  position: [number, number, number];
  rotation?: [number, number, number]; // 필요하면 회전
  scale?: number; // 기본 스케일
  label?: string; // 안내 문구
};

export default function SquareDoor({
  position,
  rotation,
  scale = 1.4,
  label = "문을 클릭하여 마이페이지로 이동",
}: Props) {
  const router = useRouter();
  const { scene } = useGLTF("/models/yellowDoor.glb");

  const { door } = useMemo(() => {
    const door = scene.clone(true);

    // 라벨을 문 앞면 위쪽에 자동 배치
    const b = new THREE.Box3().setFromObject(door);
    const size = b.getSize(new THREE.Vector3());
    const scaledH = size.y * scale;

    const minZ = b.min.z * scale;
    const maxZ = b.max.z * scale;
    const cz = (minZ + maxZ) / 2;
    const front = maxZ - cz;

    const cx = ((b.min.x + b.max.x) / 2) * scale;
    const cy = scaledH * 0.6;
    const czOff = front + 0.02;

    return { door, labelPos: [cx, cy, czOff] as [number, number, number] };
  }, [scene, scale]);

  const onClick = () => router.push("/metaverse/myroom");
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
      <group position={position} rotation={rotation ?? [0, 0, 0]} scale={scale}>
        <primitive
          object={door}
          onClick={onClick}
          onPointerOver={onOver}
          onPointerOut={onOut}
        />
        <Html transform center position={[-0.2, 1.2, 0.05]}>
          <div className="rounded-[10px] bg-[rgba(0,0,0,0.6)] px-[2px] py-[2px] font-[geekble] text-[6px] whitespace-nowrap text-white select-none">
            {label}
          </div>
        </Html>
      </group>
    </RigidBody>
  );
}

useGLTF.preload("/models/yellowDoor.glb");

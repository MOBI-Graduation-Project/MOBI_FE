"use client";

import { useRouter } from "next/navigation";

import { Suspense, useEffect, useMemo, useRef } from "react";

import { KeyboardControls, OrbitControls, useGLTF, Html } from "@react-three/drei";
import { Canvas, ThreeEvent, useThree } from "@react-three/fiber";
import { Physics, RigidBody } from "@react-three/rapier";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

import BottomBar from "@/components/common/bottomBar";
import Header from "@/components/common/header";
import Player from "@/components/metaverse/Player/Player";


function MyRoomScene({
  controlsRef,
}: {
  controlsRef: React.MutableRefObject<OrbitControlsImpl | null>;
}) {
  const roomGltf = useGLTF("/models/myroom.glb");
  const whiteboardGltf = useGLTF("/models/whiteboard.glb");

  const room = useMemo(() => roomGltf.scene.clone(true), [roomGltf.scene]);
  const whiteboard = useMemo(
    () => whiteboardGltf.scene.clone(true),
    [whiteboardGltf.scene],
  );

  //
  const camera = useThree(s => s.camera as THREE.PerspectiveCamera);
  useEffect(() => {
    const box = new THREE.Box3().setFromObject(room);
    const center = box.getCenter(new THREE.Vector3());
    const radius = box.getBoundingSphere(new THREE.Sphere()).radius;

    const fov = (camera.fov * Math.PI) / 180;
    const padding = 0.5;
    const distance = (radius * padding) / Math.sin(fov / 2);

    // 정면( +Z )에서 살짝 위로
    const dir = new THREE.Vector3(0, 0.25, 1).normalize();
    const pos = center.clone().add(dir.multiplyScalar(distance));

    camera.position.copy(pos);
    camera.near = Math.max(0.1, radius * 0.01);
    camera.far = radius * 30;
    camera.lookAt(center);
    camera.updateProjectionMatrix();

    if (controlsRef.current) {
      controlsRef.current.target.copy(center);
      // 적당한 줌 범위
      controlsRef.current.minDistance = distance * 0.6;
      controlsRef.current.maxDistance = distance * 1.8;
      controlsRef.current.update();
    }
  }, [room, camera, controlsRef]);

  // ── 화이트보드: 오른쪽/아래로 이동 + 10배 스케일 (방 크기에 맞춰 안전 배치)
  const router = useRouter();
  function WhiteboardPlaced() {
    const roomBox = new THREE.Box3().setFromObject(room);
    const roomSize = roomBox.getSize(new THREE.Vector3());

    // 원본 보드 크기
    const wbBox = new THREE.Box3().setFromObject(whiteboard);
    const wbSize = wbBox.getSize(new THREE.Vector3());

    // 기본 스케일
    const baseHeight = Math.max(wbSize.y, 0.001);
    const baseScale = (roomSize.y * 0.6) / baseHeight;
    const scale = THREE.MathUtils.clamp(baseScale * 10, 0.1, 20);
    const scaledW = wbSize.x * scale;
    const scaledH = wbSize.y * scale;

    // 오른쪽/아래로 더 이동시키는 오프셋
    const deltaRight = Math.max(0.3, roomSize.x * 0.05);
    const deltaDown = -Math.max(0.2, roomSize.y * 0.05);

    // 벽/바닥 안쪽으로 안전하게 클램프
    const maxXInside = roomBox.max.x - scaledW * 0.05;
    const minXInside = roomBox.min.x + scaledW * 0.05;
    const minYInside = roomBox.min.y + scaledH * 0.05;

    const baseX = 25; //roomBox.max.x - Math.max(0.2, scaledW * 0.4);
    const baseY = 0; //minYInside + scaledH * 0.5;
    const z = 12; //(roomBox.min.z + roomBox.max.z) / 2;

    const desiredX = baseX + deltaRight;
    const desiredY = baseY + deltaDown;

    const x = THREE.MathUtils.clamp(desiredX, minXInside, maxXInside);
    const y = Math.max(desiredY, minYInside);
    const rotY = Math.PI / 2; // 방 안쪽을 바라보게

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
        <group
          position={[x, y, z]}
          rotation={[0, rotY + Math.PI, 0]}
          scale={scale}
        >
          <primitive
            object={whiteboard}
            onClick={onClick}
            onPointerOver={onOver}
            onPointerOut={onOut}
          />
          {/* 화이트보드 안내 문구 */}
          <Html transform center position={[0, 1.2, 0]}>
            <div
              className="bg-[rgba(0,0,0,0.6)] text-white rounded-[12px] px-[3px] py-[2px] text-[4px] whitespace-nowrap select-none font-[geekble]"
            >
              보드 클릭하여 보유현황 보기
            </div>
          </Html>
        </group>  
      </RigidBody>
    );
  }

  return (
    <>
      {/* 방 본체 */}
      <RigidBody type="fixed" colliders="trimesh">
        <primitive object={room} />
      </RigidBody>

      {/* 화이트보드 */}
      <WhiteboardPlaced />
    </>
  );
}

export default function MyRoomPage() {
  const controlsRef = useRef<OrbitControlsImpl>(null);

  return (
    <div className="h-screen w-full">
      <KeyboardControls
        map={[
          { name: "forward", keys: ["ArrowUp", "KeyW"] },
          { name: "back", keys: ["ArrowDown", "KeyS"] },
          { name: "left", keys: ["ArrowLeft", "KeyA"] },
          { name: "right", keys: ["ArrowRight", "KeyD"] },
          { name: "jump", keys: ["Space"] },
        ]}
      >
        <Header />
        <Canvas camera={{ position: [0, 6, 10], fov: 60 }} shadows style={{ background: "var(--color-gray-20)"}}>
          {/* 조명 */}
          <ambientLight intensity={0.6} />
          <directionalLight
            position={[8, 14, 6]}
            intensity={1}
            castShadow
            shadow-mapSize={[1024, 1024]}
          />

          {/* 카메라 컨트롤 */}
          <OrbitControls
            ref={controlsRef}
            makeDefault
            enablePan
            enableDamping
            dampingFactor={0.08}
          />

          <Suspense fallback={null}>
            <Physics gravity={[0, -9.81, 0]} debug={false}>
              <MyRoomScene controlsRef={controlsRef} />
              <Player
                controlsRef={controlsRef}
                visualScale={1.4}
                moveSpeed={40}
              />
            </Physics>
          </Suspense>
        </Canvas>
        <BottomBar />
      </KeyboardControls>

      {/* 컨트롤 안내 UI */}
      <div className="text-brown absolute right-4 bottom-45 rounded-lg bg-[#FFEFBF] p-4 font-[geekble]">
        <p className="text-cap1">이동: WASD 또는 화살표</p>
        <p className="text-cap1">점프: Space</p>
        <p className="text-cap1">카메라: 마우스 드래그</p>
      </div>
    </div>
  );
}

useGLTF.preload("/models/myroom.glb");
useGLTF.preload("/models/whiteboard.glb");

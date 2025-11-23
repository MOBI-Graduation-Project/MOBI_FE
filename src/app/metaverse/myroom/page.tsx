"use client";

import { Suspense, useRef } from "react";

import { KeyboardControls, OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

import BottomBar from "@/components/common/bottomBar";
import Header from "@/components/common/header";
import MyRoomScene from "@/components/metaverse/MyRoom/MyRoomScene";
import Player from "@/components/metaverse/Player/Player";

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
        <Canvas
          camera={{ position: [0, 6, 10], fov: 60 }}
          shadows
          style={{ background: "var(--color-gray-20)" }}
        >
          {/* 조명 */}
          <ambientLight intensity={1.2} />
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
useGLTF.preload("/models/yellowDoor.glb");

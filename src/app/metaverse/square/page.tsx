"use client";

import { Suspense, useRef } from "react";

import { KeyboardControls, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

import Player from "@/components/metaverse/Player";
import World from "@/components/metaverse/World";

const SquarePage = () => {
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
        <Canvas camera={{ position: [0, 5, 10], fov: 60 }} shadows>
          {/* 조명 */}
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={1}
            castShadow
            shadow-mapSize={[1024, 1024]}
          />

          {/* 마우스 시야 컨트롤 */}
          <OrbitControls
            ref={controlsRef}
            makeDefault
            enablePan
            enableZoom={false}
            enableDamping
            dampingFactor={0.08}
            minPolarAngle={0}
            maxPolarAngle={0.99 * Math.PI}
            minDistance={8}
            maxDistance={8}
          />

          <Suspense fallback={null}>
            <Physics gravity={[0, -9.81, 0]} debug={false}>
              <World />
              {/* Player에 controlsRef 내려줘서 target만 보간 */}
              <Player controlsRef={controlsRef} />
            </Physics>
          </Suspense>

          {/* 안개 */}
          <fog attach="fog" args={["#ffffff", 10, 50]} />
        </Canvas>
      </KeyboardControls>

      {/* 컨트롤 안내 UI */}
      <div className="absolute right-4 bottom-4 rounded-lg bg-[#FFEFBF] p-4 text-black">
        <p className="text-cap1">이동: WASD 또는 화살표</p>
        <p className="text-cap1">점프: Space</p>
        <p className="text-cap1">카메라: 마우스 드래그</p>
      </div>
    </div>
  );
};

export default SquarePage;

"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import CharacterModel from "./CharacterModel";

type Props = {
  modelPath: string;
};

export default function CharacterViewer({ modelPath }: Props) {
  return (
    <Canvas camera={{ position: [0, 1.8, 5], fov: 45 }}>
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <CharacterModel path={modelPath} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
        target={[0, 0, 0]}
      />
    </Canvas>
  );
}

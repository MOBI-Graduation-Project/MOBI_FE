import { Suspense, useMemo } from "react";

import { useCharacterStore } from "@/stores/characterStore";
import { Center, OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

const AvatarPreview = () => {
  const { characterType } = useCharacterStore();
  const { scene } = useGLTF(
    characterType ? `/models/${characterType}.glb` : "/models/default.glb",
  );
  const model = useMemo(() => scene.clone(true), [scene]);

  return (
    <Canvas
      camera={{ position: [0, 1.6, 6], fov: 45 }}
      className="absolute inset-0"
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 8, 4]} intensity={1} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        target={[0, 0, 0]}
      />
      <Suspense fallback={null}>
        <Center>
          <primitive object={model} scale={0.7} />
        </Center>
      </Suspense>
    </Canvas>
  );
};
export default AvatarPreview;

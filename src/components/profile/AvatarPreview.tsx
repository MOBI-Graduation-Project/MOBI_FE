import { Suspense, useMemo } from "react";

import { useCharacterStore } from "@/stores/characterStore";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";

type Props = {
  height?: number;
};

const AvatarPreview = ({ height = 5 }: Props) => {
  const { characterType } = useCharacterStore();
  const { scene } = useGLTF(
    characterType ? `/models/${characterType}.glb` : "/models/default.glb",
  );
  const cloned = useMemo(() => scene.clone(true), [scene]);

  const previewLift = 2.0;

  const { scale, offset } = useMemo(() => {
    cloned.updateMatrixWorld(true);

    const box = new THREE.Box3().setFromObject(cloned);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    const safeHeight = Math.max(size.y, 1e-6);
    const scale = height / safeHeight;

    // 발바닥(y=min) 이 y=0에 오도록 오프셋 + 좌우/앞뒤 중앙 정렬
    const x = -center.x * scale;
    const y = -box.min.y * scale; // 바닥 붙이기
    const z = -center.z * scale;

    return { scale, offset: new THREE.Vector3(x, y, z) };
  }, [cloned, height]);

  return (
    <Canvas
      camera={{ position: [0, 1.6, 6], fov: 45 }}
      className="absolute inset-0"
    >
      <ambientLight intensity={0.9} />
      <directionalLight position={[4, 6, 4]} intensity={1} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        // 가슴쯤을 보도록 타겟도 Lift만큼 같이 올려줌
        target={[0, Math.max(1.6, height * 0.5) + previewLift, 0]}
      />
      <Suspense fallback={null}>
        <group
          position={[offset.x, offset.y + previewLift, offset.z]}
          scale={scale}
        >
          <primitive object={cloned} />
        </group>
      </Suspense>
    </Canvas>
  );
};

export default AvatarPreview;

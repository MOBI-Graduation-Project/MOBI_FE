"use client";

import { useRouter, useSearchParams } from "next/navigation";

import React, { useEffect, useState } from "react";
import { useCharacterStore } from "@/stores/characterStore";


import { OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import LeftArrow from "@/assets/leftArrow.svg";

interface CharacterInfo {
  name: string;
  modelPath: string;
}

const characterMap: Record<string, CharacterInfo> = {
  "111": { name: "111", modelPath: "/models/111.glb" },
  "112": { name: "112", modelPath: "/models/112.glb" },
  "121": { name: "121", modelPath: "/models/121.glb" },
  "122": { name: "122", modelPath: "/models/122.glb" },
  "211": { name: "211", modelPath: "/models/211.glb" },
  "212": { name: "212", modelPath: "/models/212.glb" },
  "221": { name: "221", modelPath: "/models/221.glb" },
  "222": { name: "222", modelPath: "/models/222.glb" },
};

// 3D캐릭터들
const CharacterModel = ({ path }: { path: string }) => {
  const { scene } = useGLTF(path);
  return <primitive object={scene} scale={0.8} position={[0, -1.5, 0]} />;
};

const CharacterPage = () => {
  const router = useRouter();
  const nickname = "사용자";
  const searchParams = useSearchParams();
  const [characterType, setCharacterType] = useState<string | null>(null);
  const [showNameInput] = useState(false);
  const { setCharacterType: setCharacterStore } = useCharacterStore();

  useEffect(() => {
    const type = searchParams.get("type");
    if (type && characterMap[type]) {
      setCharacterType(type);
    }
  }, [searchParams]);

  const handlePrev = () => {
    router.push("/signup/purpose");
  };

  const handleSelect = () => {
    if (characterType) {
      setCharacterStore(characterType);
      router.push("/map");
    }
  };

  return (
    <div
      className="flex h-screen w-full items-center justify-center bg-cover bg-center bg-no-repeat pt-[42.5px] pb-[99px]"
      style={{ backgroundImage: "url('/svgs/backgroundImage.svg')" }}
    >
      {/* 메인 콘텐츠 */}
      <div className="relative z-10 flex flex-col items-center">
        {/* 캐릭터 소개 텍스트 */}
        <h2 className="text-heading1 text-brown text-stroke-white mb-[40px] text-center font-[geekble]">
          당신의 투자 유형에 맞는 캐릭터가 생성되었어요!
          <br />
          {nickname}님, 마음에 드시나요?
        </h2>

        {/* 캐릭터 애니메이션 */}
        <div className="h-[400px] w-[400px] rounded-[20px] bg-white/80 p-[20px] shadow-lg">
          {characterType ? (
            <Canvas camera={{ position: [0, 1.8, 5], fov: 45 }}>
              <ambientLight intensity={0.8} />
              <directionalLight position={[5, 5, 5]} intensity={1} />

              <CharacterModel path={characterMap[characterType].modelPath} />

              <OrbitControls enableZoom={false} />
            </Canvas>
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <p className="text-gray-60">캐릭터 로딩 중...</p>
            </div>
          )}
        </div>

        {/* 캐릭터 이름 입력 또는 버튼 */}
        {!showNameInput ? (
          <div className="mt-[40px] flex gap-[50px]">
            <button
              onClick={handleSelect}
              className="button-shadow-yellow bg-yellow text-lab1 text-brown hover:bg-yellow-10t inline-flex h-[60px] cursor-pointer items-center justify-center rounded-[20px] px-[40px] font-[geekble] shadow-lg transition-all"
            >
              네, 마음에 들어요
            </button>
            <button
              onClick={handleSelect}
              className="button-shadow-yellow bg-yellow text-lab1 text-brown hover:bg-yellow-10t inline-flex h-[60px] cursor-pointer items-center justify-center rounded-[20px] px-[40px] font-[geekble] shadow-lg transition-all"
            >
              저와 잘맞는 캐릭터인거 같아요
            </button>
          </div>
        ) : (
          <div className="mt-[40px] flex flex-col items-center gap-[20px]"></div>
        )}
      </div>

      {/* 이전 버튼 */}
      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-[30px] flex h-[114px] w-[114px] -translate-y-1/2 transform cursor-pointer items-center justify-center rounded-full transition-all"
      >
        <LeftArrow className="h-full w-full" />
      </button>
    </div>
  );
};

export default CharacterPage;

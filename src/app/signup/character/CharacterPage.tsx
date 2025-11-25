"use client";

import { useRouter, useSearchParams } from "next/navigation";

import React, { useEffect, useMemo, useState } from "react";

import { useSignUpStore } from "@/stores/signupStore";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";

import { signupComplete } from "@/apis/member";

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
  const cloned = useMemo(() => scene.clone(true), [scene]);

  // 정사각형 박스 기준으로가운데 + 꽉 차게 보이게
  const { scale, offset } = useMemo(() => {
    cloned.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(cloned);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    const FIT_SIZE = 2.8; // 카드 안에서 보이는 표준 한 변 길이(필요하면 2.6~3.2 사이로 미세조정)
    const PADDING = 0.9;

    const major = Math.max(size.x, size.y);
    const safeMajor = Math.max(major, 1e-6);
    const scale = (FIT_SIZE * PADDING) / safeMajor;

    const x = -center.x * scale;
    const y = -center.y * scale;
    const z = -center.z * scale;

    return { scale, offset: new THREE.Vector3(x, y, z) };
  }, [cloned]);

  return (
    <group position={offset} scale={scale}>
      <primitive object={cloned} />
    </group>
  );
};

const CharacterPage = () => {
  const router = useRouter();

  const state = useSignUpStore.getState();
  const nickname = state.nickname;

  const searchParams = useSearchParams();
  const [characterType, setCharacterType] = useState<string | null>(null);
  const [showNameInput] = useState(false);

  useEffect(() => {
    const type = searchParams.get("type");
    if (type && characterMap[type]) {
      setCharacterType(type);
    }
  }, [searchParams]);

  const handlePrev = () => {
    router.push("/signup/purpose");
  };

  const handleSelect = async () => {
    if (!characterType) return;

    const state = useSignUpStore.getState();
    const { nickname, investmentAnswers, isPrivacyAgreed } = state;

    try {
      await signupComplete(nickname, investmentAnswers, isPrivacyAgreed);
      router.push("/map");
    } catch (error) {
      console.error("회원가입 완료 중 오류:", error);
      alert("회원가입 완료 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center">
      {/* 메인 콘텐츠 */}
      <div className="relative z-10 flex flex-col items-center">
        {/* 캐릭터 소개 텍스트 */}
        <h2 className="md:text-heading1 text-body text-brown text-stroke-white mb-[40px] text-center font-[geekble]">
          <span className="hidden md:block">
            당신의 투자 유형에 맞는 캐릭터가 생성되었어요!
            <br />
            {nickname}님, 마음에 드시나요?
          </span>

          <span className="block md:hidden">
            당신의 투자 유형에 맞는
            <br /> 캐릭터가 생성되었어요!
            <br />
            {nickname}님,
            <br />
            마음에 드시나요?
          </span>
        </h2>

        {/* 캐릭터 애니메이션 */}
        <div className="h-[210px] w-[210px] rounded-[20px] bg-white/80 shadow-lg md:h-[400px] md:w-[400px]">
          {characterType ? (
            <Canvas camera={{ position: [0, 1.8, 5], fov: 45 }}>
              <ambientLight intensity={0.8} />
              <directionalLight position={[5, 5, 5]} intensity={1} />

              <CharacterModel path={characterMap[characterType].modelPath} />

              <OrbitControls
                enableZoom={false}
                enablePan={false}
                enableRotate={false}
                target={[0, 0, 0]}
              />
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
              className="button-shadow-yellow bg-yellow text-lab1 text-brown hover:bg-yellow-10t h-[60px] cursor-pointer items-center justify-center rounded-[20px] px-[40px] font-[geekble] shadow-lg transition-all"
            >
              네, 마음에 들어요
            </button>
            <button
              onClick={handleSelect}
              className="button-shadow-yellow bg-yellow text-lab1 text-brown hover:bg-yellow-10t hidden h-[60px] cursor-pointer items-center justify-center rounded-[20px] px-[40px] font-[geekble] shadow-lg transition-all md:block"
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
        className="absolute top-1/2 left-[5px] flex -translate-y-1/2 transform cursor-pointer items-center justify-center rounded-full transition-all md:left-[30px]"
      >
        <LeftArrow className="h-[70px] w-[70px] md:h-[114px] md:w-[114px]" />
      </button>
    </div>
  );
};

export default CharacterPage;

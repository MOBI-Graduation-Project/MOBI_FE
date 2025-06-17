"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

import React, { useEffect, useState } from "react";
import Lottie from "react-lottie-player";

import LeftArrow from "@/assets/leftArrow.svg";

interface CharacterInfo {
  name: string;
  jsonPath: string;
}

const characterMap: Record<string, CharacterInfo> = {
  "111": { name: "111", jsonPath: "/animations/111.json" },
  "112": { name: "112", jsonPath: "/animations/112.json" },
  "121": { name: "121", jsonPath: "/animations/121.json" },
  "122": { name: "122", jsonPath: "/animations/122.json" },
  "211": { name: "211", jsonPath: "/animations/211.json" },
  "212": { name: "212", jsonPath: "/animations/212.json" },
  "221": { name: "221", jsonPath: "/animations/221.json" },
  "222": { name: "222", jsonPath: "/animations/222.json" },
};

const CharacterPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [characterType, setCharacterType] = useState<string>("");
  const [animationData, setAnimationData] = useState<any>(null);
  const [showNameInput, setShowNameInput] = useState(false);
  const [characterName, setCharacterName] = useState("");

  useEffect(() => {
    const type = searchParams.get("type");
    if (type && characterMap[type]) {
      setCharacterType(type);
      // Lottie JSON 파일 로드
      fetch(characterMap[type].jsonPath)
        .then(response => response.json())
        .then(data => setAnimationData(data))
        .catch(error => console.error("Failed to load animation:", error));
    }
  }, [searchParams]);

  const handlePrev = () => {
    router.push("/signup/purpose");
  };

  const handleNext = () => {
    if (characterName.trim()) {
      // 캐릭터 정보 저장 (Zustand store에 저장하는 로직 추가 필요)
      console.log("Character saved:", {
        type: characterType,
        name: characterName,
      });
      // 다음 페이지로 이동
      router.push("/map");
    }
  };

  const currentCharacter = characterType ? characterMap[characterType] : null;

  return (
    <div className="relative flex h-screen w-full items-center justify-center overflow-hidden">
      {/* 배경 이미지 */}
      <Image
        src="/svgs/backgroundImage.svg"
        alt="forest background"
        fill
        className="object-cover"
        priority
      />

      {/* 메인 콘텐츠 */}
      <div className="relative z-10 flex flex-col items-center">
        {/* 캐릭터 소개 텍스트 */}
        <h2 className="text-heading1 text-brown text-stroke-white mb-[40px] text-center font-[geekble]">
          당신의 투자 유형에 맞는 캐릭터가 생성되었어요!
          <br />
          nickname님, 마음에 드시나요?
        </h2>

        {/* 캐릭터 애니메이션 */}
        <div className="h-[400px] w-[400px] rounded-[20px] bg-white/80 p-[20px] shadow-lg">
          {animationData ? (
            <Lottie
              loop
              animationData={animationData}
              play
              style={{ width: "100%", height: "100%" }}
            />
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
              onClick={handleNext}
              className="button-shadow bg-yellow text-lab1 text-brown hover:bg-yellow-10t inline-flex h-[60px] cursor-pointer items-center justify-center rounded-[20px] px-[40px] font-[geekble] shadow-lg transition-all"
            >
              네, 마음에 들어요
            </button>
            <button
              onClick={handleNext}
              className="button-shadow bg-yellow text-lab1 text-brown hover:bg-yellow-10t inline-flex h-[60px] cursor-pointer items-center justify-center rounded-[20px] px-[40px] font-[geekble] shadow-lg transition-all"
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

"use client";

import { useRouter, useSearchParams } from "next/navigation";

import React, { useEffect, useState } from "react";

import { useSignUpStore } from "@/stores/signupStore";

import { signupComplete } from "@/apis/member";

import LeftArrow from "@/assets/leftArrow.svg";

import CharacterViewer from "@/components/character/CharacterViewer";
import { CHARACTER_MAP } from "@/constants/characters";

const CharacterPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { nickname } = useSignUpStore.getState();

  const [characterType, setCharacterType] = useState<string | null>(null);
  const [showNameInput] = useState(false);

  useEffect(() => {
    const type = searchParams.get("type");
    if (type && CHARACTER_MAP[type]) setCharacterType(type);
  }, [searchParams]);

  const handlePrev = () => {
    router.push("/signup/purpose");
  };

  const handleSelect = async () => {
    if (!characterType) return;
    const { nickname, investmentAnswers, isPrivacyAgreed } = useSignUpStore.getState();
    try {
      await signupComplete(nickname, investmentAnswers, isPrivacyAgreed);
      router.push("/map");
    } catch (error) {
      console.error("회원가입 완료 중 오류:", error);
      alert("회원가입 완료 중 오류가 발생했습니다.");
    }
  };

  const modelPath = characterType ? CHARACTER_MAP[characterType].modelPath : null;

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
          {modelPath ? (
            <CharacterViewer modelPath={modelPath} />
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

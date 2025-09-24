"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import React, { useState } from "react";

import LeftArrow from "@/assets/leftArrow.svg";
import RightArrow from "@/assets/rightArrow.svg";

type PurposeStep = 1 | 2 | 3;
type SelectionValue = "1" | "2" | null;

interface Selections {
  step1: SelectionValue;
  step2: SelectionValue;
  step3: SelectionValue;
}

const PurposePage = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<PurposeStep>(1);
  const [selections, setSelections] = useState<Selections>({
    step1: null,
    step2: null,
    step3: null,
  });
  const [hoveredCard, setHoveredCard] = useState<"left" | "right" | null>(null);

  const stepContent = {
    1: {
      title: "",
      leftText: "나는 지금 당장 눈앞에\n치킨 사먹을 돈이 떨어지도 행복하다.",
      rightText: "나는 기다려서라도\n건물 정도는 사야지 행복하다.",
    },
    2: {
      title: "",
      leftText:
        "나는 평소에 손해가 나는 것은\n내 두 눈이 뜨고 있는 이상\n있을 수가 없다!!",
      rightText: "나는 평소에 손해를 보더라도\n미래를 위해 투자를 하는 편이다.",
    },
    3: {
      title: "",
      leftText: "나는 성격이 급한 편이다.",
      rightText: "나는 성격이 느긋하다.",
    },
  };

  const handleCardClick = (side: "left" | "right") => {
    const value = side === "left" ? "1" : "2";
    setSelections(prev => ({
      ...prev,
      [`step${currentStep}`]: value as SelectionValue,
    }));
  };

  const handleNext = () => {
    if (selections[`step${currentStep}`]) {
      if (currentStep < 3) {
        setCurrentStep((currentStep + 1) as PurposeStep);
      } else {
        // 모든 선택 완료 - 캐릭터 생성 페이지로 이동
        const code = `${selections.step1}${selections.step2}${selections.step3}`;
        router.push(`/signup/character?type=${code}`);
      }
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as PurposeStep);
    } else {
      router.push("/signup/nickname");
    }
  };

  const content = stepContent[currentStep];
  const currentSelection = selections[`step${currentStep}`];

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
      <div className="relative z-10 flex gap-[20px]">
        {/* 왼쪽 카드 */}
        <button
          onClick={() => handleCardClick("left")}
          onMouseEnter={() => setHoveredCard("left")}
          onMouseLeave={() => setHoveredCard(null)}
          className={`flex h-[314px] w-[532px] cursor-pointer items-center justify-center rounded-[40px] p-[10px] transition-all ${
            currentSelection === "1" || hoveredCard === "left"
              ? "bg-[#FFCA16]"
              : "bg-[#FFF4D0]"
          }`}
          style={{
            boxShadow:
              currentSelection === "1" || hoveredCard === "left"
                ? "0px 1px 7px 0px rgba(0, 0, 0, 0.73), 0px -11px 0px 0px rgba(180, 120, 0, 0.25) inset, 0px 6px 6.2px 0px #FFF inset, 0px 70px 50.2px 0px rgba(255, 136, 0, 0.17) inset, 0px 10px 4px 0px rgba(0, 0, 0, 0.25)"
                : "0px 1px 7px 0px rgba(0, 0, 0, 0.73), 0px -11px 0px 0px rgba(255, 153, 0, 0.25) inset, 0px 6px 6.2px 0px #FFF inset, 0px 75px 50.2px 0px rgba(255, 207, 135, 0.17) inset, 0px 10px 4px 0px rgba(0, 0, 0, 0.25)",
          }}
        >
          <p className="text-body text-brown text-center font-[geekble] whitespace-pre-line">
            {content.leftText}
          </p>
        </button>

        {/* 오른쪽 카드 */}
        <button
          onClick={() => handleCardClick("right")}
          onMouseEnter={() => setHoveredCard("right")}
          onMouseLeave={() => setHoveredCard(null)}
          className={`flex h-[314px] w-[532px] cursor-pointer items-center justify-center rounded-[4rem] p-[1rem] transition-all ${
            currentSelection === "2" || hoveredCard === "right"
              ? "bg-[#FFCA16]"
              : "bg-[#FFF4D0]"
          }`}
          style={{
            boxShadow:
              currentSelection === "2" || hoveredCard === "right"
                ? "0px 1px 7px 0px rgba(0, 0, 0, 0.73), 0px -11px 0px 0px rgba(180, 120, 0, 0.25) inset, 0px 6px 6.2px 0px #FFF inset, 0px 70px 50.2px 0px rgba(255, 136, 0, 0.17) inset, 0px 10px 4px 0px rgba(0, 0, 0, 0.25)"
                : "0px 1px 7px 0px rgba(0, 0, 0, 0.73), 0px -11px 0px 0px rgba(255, 153, 0, 0.25) inset, 0px 6px 6.2px 0px #FFF inset, 0px 75px 50.2px 0px rgba(255, 207, 135, 0.17) inset, 0px 10px 4px 0px rgba(0, 0, 0, 0.25)",
          }}
        >
          <p className="text-body text-brown text-center font-[geekble] whitespace-pre-line">
            {content.rightText}
          </p>
        </button>
      </div>

      {/* 이전 버튼 */}
      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-[30px] flex h-[114px] w-[114px] -translate-y-1/2 transform cursor-pointer items-center justify-center rounded-full transition-all"
      >
        <LeftArrow className="h-full w-full" />
      </button>

      {/* 다음 버튼 */}
      <button
        onClick={handleNext}
        disabled={!currentSelection}
        className={`absolute top-1/2 right-[30px] flex h-[114px] w-[114px] -translate-y-1/2 transform items-center justify-center rounded-full transition-all ${
          currentSelection ? "cursor-pointer" : "cursor-not-allowed opacity-50"
        }`}
      >
        <RightArrow className="h-full w-full" />
      </button>
    </div>
  );
};

export default PurposePage;

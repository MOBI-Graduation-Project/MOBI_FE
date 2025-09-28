"use client";

import { useRouter } from "next/navigation";

import React from "react";

import { useSajuStore } from "@/stores/sajuStore";
import { useSignupStore } from "@/stores/signupStore";

import RetryIcon from "@/assets/fortuneteller/retryIcon.svg";

import BottomBar from "@/components/bottomBar";
import Header from "@/components/header";

const FortuneResult = () => {
  const router = useRouter();
  const { company } = useSajuStore();
  const nickname = useSignupStore(s => s.nickname) || "사용자";
  const listingDate = "1975년 6월 12일"; //목데이터

  const handleRetry = () => {
    router.push("/fortuneteller");
  };

  return (
    <div
      className="flex h-screen w-full flex-col justify-between bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/svgs/backgroundImage.svg')" }}
    >
      <Header />

      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <p className="text-heading1 text-brown text-stroke-white pt-[213px] text-center font-[geekble] leading-tight">
            {nickname}님과 {company}의 사주 궁합은?
            <br />
            {company}의 주식 상장일은 {listingDate}입니다.
          </p>

          <div className="mr-[176px] ml-[176px] flex items-center justify-center rounded-[20px] border-[2px] border-black bg-[#FFEEBD] px-30 py-10 shadow-lg">
            <p className="font-pretendard text-brown text-center text-[30px] leading-tight">
              당신과 상대방의 사주를 종합해보면, 금(金)과 토(土)의 기운이 조화를
              이루는 관계로 보입니다. 당신의 강한 금기운이 상대방의 토를
              생조해주며, 이는 서로에게 안정감을 주는 구조입니다. 특히 상대방의
              사주에 편관(偏官)이 강해 리더십이 뛰어난 반면, 당신의 비견(比肩)과
              식신(食神)이 이를 부드럽게 조절해줄 수 있어요. 다만 상대방의
              목(木) 기운이 다소 과할 수 있으니, 때로는 유연한 태도가 필요할 것
              같습니다.
            </p>
          </div>

          <button
            onClick={handleRetry}
            className="button-shadow bg-yellow text-brown hover:bg-yellow-10t text-stroke-white mb-[137px] inline-flex h-[60px] w-[255px] cursor-pointer items-center justify-center rounded-[20px] px-[19px] font-[geekble] text-[36px] shadow-lg transition-all"
          >
            <RetryIcon />점 다시보기
          </button>
        </div>
      </div>

      <BottomBar />
    </div>
  );
};

export default FortuneResult;

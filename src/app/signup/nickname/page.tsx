"use client";

import { useRouter } from "next/navigation";

import React, { useState } from "react";

import RightArrow from "@/assets/rightArrow.svg";

const SignUp = () => {
  const router = useRouter();
  const [nickname, setNickname] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);
  const [isDuplicateChecked, setIsDuplicateChecked] = useState(false);
  const [, setDuplicateMessage] = useState("");

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // 10자 제한
    if (value.length <= 10) {
      setNickname(value);
      setIsDuplicateChecked(false);
      setDuplicateMessage("");
    }
  };

  const handleDuplicateCheck = () => {
    // TODO: API 호출로 중복 확인
    if (nickname.trim()) {
      // 임시로 중복되지 않았다고 가정
      setIsDuplicateChecked(true);
    }
  };

  const handleNextClick = () => {
    if (
      nickname.trim().length >= 2 &&
      nickname.trim() &&
      isAgreed &&
      isDuplicateChecked
    ) {
      router.push("/signup/purpose");
    }
  };

  const isButtonEnabled =
    nickname.trim().length >= 2 &&
    nickname.trim() &&
    isAgreed &&
    isDuplicateChecked;

  return (
    <div
      className="relative flex h-screen w-full items-center justify-center overflow-visible bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/svgs/backgroundImage.svg')" }}
    >
      <div className="relative flex h-[450px] w-[1000px] flex-col items-center justify-center rounded-[30px] bg-[#FFFAEA]">
        <h1 className="text-brown text-heading1 mb-[50px] font-[geekble]">
          닉네임을 입력해주세요
        </h1>

        <div className="mb-[40px] flex items-center gap-[20px]">
          <div className="relative">
            <input
              type="text"
              value={nickname}
              onChange={handleNicknameChange}
              placeholder="한글/영어/숫자만 2~10자 입력해주세요"
              className="text-brown-20 placeholder:text-brown-20/70 text-lab2 h-[70px] w-[550px] rounded-[20px] border border-black bg-[#FFEEBD] px-[25px] font-[pretendard] focus:outline-none"
            />
          </div>
          <button
            onClick={handleDuplicateCheck}
            className="button-shadow-yellow text-stroke-white bg-yellow text-lab1 text-brown inline-flex h-[50px] shrink-0 cursor-pointer items-center justify-center gap-[10px] rounded-[20px] px-[18px] py-[10px] font-[geekble] hover:scale-110"
          >
            중복확인
          </button>
        </div>

        <div className="flex items-start gap-[15px]">
          <button
            onClick={() => setIsAgreed(!isAgreed)}
            className={`mt-[3px] h-[30px] w-[30px] cursor-pointer rounded-full border border-black transition-all ${
              isAgreed ? "bg-brown-20 button-shadow-yellow" : "bg-white/20"
            }`}
          />
          <a
            href="https://fir-earl-dd1.notion.site/215c9deec31b804d9f67cc457878ec26?source=copy_link"
            className="text-lab2 text-brown font-[geekble] whitespace-nowrap"
          >
            이용약관 동의 (투자는 본인의 책임이므로, 투자로 인한 손실은 투자자
            본인에게 책임이 있습니다)
          </a>
        </div>

        <button
          onClick={handleNextClick}
          disabled={!isButtonEnabled}
          className={`absolute top-1/2 -right-[150px] flex h-[114px] w-[114px] -translate-y-1/2 transform items-center justify-center transition-opacity ${
            isButtonEnabled ? "cursor-pointer" : "cursor-not-allowed opacity-50"
          }`}
        >
          <RightArrow className="h-full w-full" />
        </button>
      </div>
    </div>
  );
};

export default SignUp;

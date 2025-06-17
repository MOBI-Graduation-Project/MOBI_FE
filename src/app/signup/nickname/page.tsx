"use client";

import { useRouter } from "next/navigation";

import React, { useState } from "react";

import RightArrow from "@/assets/rightArrow.svg";

const SignUp = () => {
  const router = useRouter();
  const [nickname, setNickname] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);
  const [isDuplicateChecked, setIsDuplicateChecked] = useState(false);
  const [duplicateMessage, setDuplicateMessage] = useState("");
  const [isHovered, setIsHovered] = useState(false);

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
    if (nickname.trim() && isAgreed && isDuplicateChecked) {
      // TODO: 다음 페이지로 이동
      console.log("닉네임:", nickname);
      router.push("/signup/purpose");
    }
  };

  const isButtonEnabled = nickname.trim() && isAgreed && isDuplicateChecked;

  return (
    <div
      className="relative flex h-screen w-full items-center justify-center overflow-visible bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/svgs/backgroundImage.svg')" }}
    >
      <div className="relative flex h-[450px] w-[1000px] flex-col items-center justify-center rounded-[30px] bg-[#FFFAEA]">
        {/* 닉네임 입력해주세요 텍스트 */}
        <h1 className="text-brown mb-[50px] font-[geekble] text-heading1">
          닉네임을 입력해주세요
        </h1>

        {/* 닉네임 입력 필드와 중복확인 버튼 */}
        <div className="mb-[40px] flex items-center gap-[20px]">
          <div className="relative">
            <input
              type="text"
              value={nickname}
              onChange={handleNicknameChange}
              placeholder="한글/영어/숫자만 2~10자 입력해주세요"
              className="text-brown-20 placeholder:text-brown-20/70 h-[70px] w-[550px] rounded-[20px] border border-black bg-[#FFEEBD] px-[25px] font-[pretendard] text-lab2 focus:outline-none"
            />
          </div>
          <button
            onClick={handleDuplicateCheck}
            className="cursor-pointer hover:scale-110 button-shadow text-stroke-white bg-yellow text-lab1 text-brown inline-flex h-[50px] shrink-0 items-center justify-center gap-[10px] rounded-[20px] px-[18px] py-[10px] font-[geekble]"
          >
            중복확인
          </button>
        </div>

        {/* 이용약관 동의 */}
        <div className="flex items-start gap-[15px]">
          <button
            onClick={() => setIsAgreed(!isAgreed)}
            className={`mt-[3px] h-[30px] w-[30px] rounded-full border border-black transition-all cursor-pointer ${
              isAgreed ? "bg-brown-20 button-shadow" : "bg-white/20"
            }`}
          />
          <span className="text-lab2 text-brown font-[geekble] whitespace-nowrap">
            이용약관 동의 (투자는 본인의 책임이므로, 투자로 인한 손실은 투자자
            본인에게 책임이 있습니다)
          </span>
        </div>

        {/* 다음 버튼 - 오른쪽 중간 */}
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

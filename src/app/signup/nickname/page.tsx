"use client";

import { useRouter } from "next/navigation";

import React, { useState } from "react";

import { useSignUpStore } from "@/stores/signupStore";

import { checkNickname } from "@/apis/member";

import RightArrow from "@/assets/rightArrow.svg";

const SignUp = () => {
  const router = useRouter();
  const [nickname, setNickname] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [isDuplicateChecked, setIsDuplicateChecked] = useState(false);
  const [duplicateMessage, setDuplicateMessage] = useState("");

  const setSignUpData = useSignUpStore(state => state.setSignUpData);

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // 10자 제한
    if (value.length <= 10) {
      setNickname(value);
      setIsDuplicateChecked(false);
      setDuplicateMessage("");
    }
  };

  const handleDuplicateCheck = async () => {
    if (!nickname.trim()) return;
    try {
      const res = await checkNickname(nickname);
      const { duplicated } = res.result;
      if (!duplicated) {
        setIsDuplicateChecked(true);
        setDuplicateMessage("사용 가능한 닉네임입니다.");
        setSignUpData({ nickname });
      } else {
        setIsDuplicateChecked(false);
        setDuplicateMessage("이미 사용 중인 닉네임입니다.");
      }
    } catch (error) {
      console.error(error);
      setIsDuplicateChecked(false);
      setDuplicateMessage("닉네임 확인 중 오류가 발생했습니다.");
    }
  };

  const handleAgreeToggle = () => {
    setAgreed(prev => {
      const newAgreed = !prev;
      setSignUpData({ isPrivacyAgreed: newAgreed });
      return newAgreed;
    });
  };

  const handleNextClick = () => {
    if (
      nickname.trim().length >= 2 &&
      nickname.trim() &&
      agreed &&
      isDuplicateChecked
    ) {
      router.push("/signup/purpose");
    }
  };

  const isButtonEnabled =
    nickname.trim().length >= 2 &&
    nickname.trim() &&
    agreed &&
    isDuplicateChecked;

  return (
    <div className="relative flex h-screen w-full items-center justify-center">
      <div className="bg-cream relative flex flex-col items-center justify-center gap-[10px] rounded-[30px] px-[20px] py-[20px] md:h-[450px] md:w-[1000px] md:gap-[30px]">
        <h1 className="text-brown md:text-heading1 text-lab1 rounded-[20px] px-[20px] py-[10px] font-[geekble]">
          닉네임을 입력해주세요
        </h1>
        <div className="flex flex-col gap-[20px] md:flex-row">
          <div className="flex flex-col items-start justify-center gap-[10px]">
            <div className="relative">
              <input
                type="text"
                value={nickname}
                onChange={handleNicknameChange}
                placeholder="한글/영어/숫자만 2~10자 입력해주세요"
                className="text-brown-20 placeholder:text-brown-20/70 md:text-lab2 text-cap1 bg-yellow-10 h-[50px] w-[240px] rounded-[20px] border border-black px-[10px] font-[pretendard] focus:outline-none md:h-[70px] md:w-[550px] md:px-[25px]"
              />
            </div>
            {duplicateMessage && (
              <span
                className={`text-cap1 font-[pretendard] ${
                  isDuplicateChecked ? "text-green-600" : "text-red-600"
                }`}
              >
                {duplicateMessage}
              </span>
            )}
          </div>
          <button
            onClick={handleDuplicateCheck}
            className="button-shadow-yellow text-stroke-white bg-yellow md:text-lab1 text-cap1-med text-brown h-[50px] cursor-pointer items-center justify-center gap-[10px] rounded-[20px] px-[5px] py-[3px] font-[geekble] hover:scale-110 md:mt-[10px] md:px-[18px] md:py-[10px]"
          >
            중복확인
          </button>
        </div>
        <div className="mt-[25px] flex items-center justify-center gap-[15px] rounded-[20px]">
          <button
            onClick={handleAgreeToggle}
            className={`h-[20px] w-[20px] shrink-0 cursor-pointer rounded-full border border-black transition-all md:h-[30px] md:w-[30px] ${
              agreed ? "bg-brown-20 button-shadow-yellow" : "bg-white/20"
            }`}
          />
          <a
            href="https://fir-earl-dd1.notion.site/215c9deec31b804d9f67cc457878ec26?source=copy_link"
            className="text-lab2 text-brown hidden font-[geekble] whitespace-nowrap md:block"
          >
            이용약관 동의 (투자는 본인의 책임이므로, 투자로 인한 손실은 투자자
            본인에게 책임이 있습니다)
          </a>
          <a
            href="https://fir-earl-dd1.notion.site/215c9deec31b804d9f67cc457878ec26?source=copy_link"
            className="text-lab2 text-brown block flex flex-col font-[geekble] md:hidden"
          >
            이용약관 동의
          </a>
        </div>
        <div className="text-cap1 text-brown text-center font-[pretendard]">
          (투자는 본인의 책임이므로, 투자로 인한 손실은 <br />
          투자자 본인에게 책임이 있습니다)
        </div>
        <button
          onClick={handleNextClick}
          disabled={!isButtonEnabled}
          className={`fixed top-1/2 right-[5px] flex -translate-y-1/2 transform items-center justify-center rounded-full transition-all md:right-[30px] ${
            !isButtonEnabled
              ? "cursor-not-allowed opacity-50"
              : "cursor-pointer"
          }`}
        >
          <RightArrow className="h-[70px] w-[70px] md:h-[114px] md:w-[114px]" />
        </button>
      </div>
    </div>
  );
};

export default SignUp;

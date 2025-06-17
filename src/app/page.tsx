"use client";

import { useRouter } from "next/navigation";

import React from "react";

import GoogleIcon from "@/assets/googleIcon.svg";

const Onboarding = () => {
  const router = useRouter();
  const handleLoginClick = () => {
    router.push("/login");
  };
  const handleSignUpClick = () => {
    router.push("/signup");
  };
  return (
    <div
      className="flex h-screen w-full flex-col items-center justify-center gap-[91.27px] bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/svgs/backgroundImage.svg')" }}
    >
      <div>
        <div className="text-title text-yellow text-stroke-brown font-[geekble]">
          모비
        </div>
        <div className="text-body text-yellow text-stroke-brown-s font-[geekble]">
          모두의 주식 비서
        </div>
      </div>

      <div className="flex gap-[61.5px]">
        <button
          onClick={handleLoginClick}
          className="bg-yellow text-heading1 text-stroke-white button-shadow hover:bg-yellow-10t h-[87px] w-[199px] cursor-pointer rounded-[20px] font-[geekble]"
        >
          로그인
        </button>
        <button
          onClick={handleSignUpClick}
          className="bg-yellow text-heading1 text-stroke-white button-shadow hover:bg-yellow-10t flex h-[87px] w-[392px] cursor-pointer items-center justify-center rounded-[20px] font-[geekble]"
        >
          <GoogleIcon />
          구글로 회원가입
        </button>
      </div>
    </div>
  );
};
export default Onboarding;

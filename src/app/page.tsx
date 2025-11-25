"use client";

import React from "react";

import GoogleIcon from "@/assets/googleIcon.svg";

const Onboarding = () => {
  const handleGoogleAuth = () => {
    const params = new URLSearchParams({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI!,
      response_type: "code",
      scope: "openid email profile",
      access_type: "offline",
    });

    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
  };

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-[50px] md:gap-[80px]">
      <div className="flex flex-col gap-[15px]">
        <div className="md:text-title text-title2 text-yellow text-stroke-brown flex justify-center font-[geekble]">
          모비
        </div>
        <div className="md:text-title2 text-heading1 text-yellow text-stroke-brown-m font-[geekble]">
          모두의 주식 비서
        </div>
      </div>

      <div className="flex flex-row items-center justify-center gap-[20px] md:gap-[61.5px]">
        <button
          onClick={handleGoogleAuth}
          className="bg-yellow md:text-heading1 text-lab1 text-stroke-white button-shadow-yellow hover:bg-yellow-10t cursor-pointer rounded-[20px] px-[20px] py-[10px] font-[geekble] md:px-[45px] md:py-[20px]"
        >
          로그인
        </button>
        <button
          onClick={handleGoogleAuth}
          className="bg-yellow md:text-heading1 text-lab1 text-stroke-white button-shadow-yellow hover:bg-yellow-10t flex cursor-pointer items-center justify-center gap-[10px] rounded-[20px] px-[20px] py-[10px] font-[geekble] md:px-[45px] md:py-[20px]"
        >
          <GoogleIcon className="h-[30px] w-[30px] md:h-[40px] md:w-[40px]" />
          회원가입
        </button>
      </div>
    </div>
  );
};
export default Onboarding;

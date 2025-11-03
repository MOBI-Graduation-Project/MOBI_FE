"use client";

import { useRouter } from "next/navigation";
import React from "react";
import GoogleIcon from "@/assets/googleIcon.svg";

const Onboarding = () => {
  const router = useRouter();

  const clientId =
    "317083846897-25gqi6ucujgfts347aust8gj224qulsq.apps.googleusercontent.com";
  const redirectUri = "http://localhost:3000/auth/callback"; // 구글 로그인 후 돌아올 페이지
  const scope = "email profile";
  const responseType = "code";

  // 로그인용 (이미 회원인 사람)
  const handleLoginClick = () => {
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}&state=login`;
    // state=login → 로그인 요청임을 표시
    window.location.href = googleAuthUrl;
  };

  //  회원가입용 (새로 가입하는 사람)
  const handleGoogleSignup = () => {
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}&state=signup`;
    // state=signup → 회원가입 요청임을 표시
    window.location.href = googleAuthUrl;
  };

  return (
    <div
      className="flex h-screen w-full flex-col items-center justify-center gap-[91.27px] bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/svgs/bgImage.jpg')" }}
    >
      {/* 로고 */}
      <div>
        <div className="text-title text-yellow text-stroke-brown font-[geekble]">
          모비
        </div>
        <div className="text-body text-yellow text-stroke-brown-s font-[geekble]">
          모두의 주식 비서
        </div>
      </div>

      {/* 버튼 */}
      <div className="flex gap-[61.5px]">
        <button
          onClick={handleLoginClick}
          className="bg-yellow text-heading1 text-stroke-white button-shadow-yellow hover:bg-yellow-10t h-[87px] w-[199px] cursor-pointer rounded-[20px] font-[geekble]"
        >
          로그인
        </button>

        {/*  구글 회원가입 */}
        <button
          onClick={handleGoogleSignup}
          className="bg-yellow text-heading1 text-stroke-white button-shadow-yellow hover:bg-yellow-10t flex h-[87px] w-[392px] cursor-pointer items-center justify-center rounded-[20px] font-[geekble]"
        >
          <GoogleIcon />
          구글로 회원가입
        </button>
      </div>
    </div>
  );
};

export default Onboarding;

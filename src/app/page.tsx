"use client";

import React from "react";

import GoogleIcon from "@/assets/googleIcon.svg";

import {
  generateCodeChallenge,
  generateCodeVerifier,
} from "@/utils/signup/generatePkce";

const Onboarding = () => {
  const handleGoogleAuth = async () => {
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = await generateCodeChallenge(codeVerifier);
    localStorage.setItem("code_verifier", codeVerifier);

    const params = new URLSearchParams({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI!,
      response_type: "code",
      scope: "openid email profile",
      code_challenge: codeChallenge,
      code_challenge_method: "S256",
      access_type: "offline",
    });

    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
  };

  return (
    <div
      className="flex h-screen w-full flex-col items-center justify-center gap-[91.27px] bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/svgs/bgImage.jpg')" }}
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
          onClick={() => handleGoogleAuth("login")}
          className="bg-yellow text-heading1 text-stroke-white button-shadow-yellow hover:bg-yellow-10t h-[87px] w-[199px] cursor-pointer rounded-[20px] font-[geekble]"
        >
          로그인
        </button>
        <button
          onClick={() => handleGoogleAuth("signup")}
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

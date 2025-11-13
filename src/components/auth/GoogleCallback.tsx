"use client";

import { useSearchParams } from "next/navigation";

import { useEffect } from "react";

import { handleOAuthCallback } from "@/utils/signup/handleAuthCallback";

import HeadingTitle from "../common/HeadingTitle";

export default function GoogleCallback() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  useEffect(() => {
    if (!code) return;
    handleOAuthCallback(code);
  }, [code]);

  return (
    <div
      className="flex h-screen w-full flex-col items-center justify-center gap-[91.27px] bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/svgs/bgImage.jpg')" }}
    >
      <HeadingTitle texts={["로그인 처리 중..."]} />
    </div>
  );
}

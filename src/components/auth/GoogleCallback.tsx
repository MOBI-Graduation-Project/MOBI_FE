"use client";

import { useSearchParams } from "next/navigation";

import { useEffect } from "react";

import { handleOAuthCallback } from "@/utils/signup/handleAuthCallback";

export default function GoogleCallback() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  useEffect(() => {
    if (!code) return;
    handleOAuthCallback(code);
  }, [code]);

  return <div>로그인 처리 중...</div>;
}

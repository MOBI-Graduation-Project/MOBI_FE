"use client";

import { useSearchParams } from "next/navigation";

import { useEffect } from "react";

export default function GoogleCallback() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  useEffect(() => {
    const codeVerifier = localStorage.getItem("code_verifier");
    console.log("Callback codeVerifier", codeVerifier);
    if (!code || !codeVerifier) return;

    const fetchBackend = async () => {
      const requestUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google`;
      const requestBody = {
        code,
        redirectUri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI,
        codeVerifier,
      };

      console.log("Request URL:", requestUrl);
      console.log("Request Body:", requestBody);

      try {
        const res = await fetch(requestUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
        });

        if (!res.ok) {
          const text = await res.text();
          console.error("서버 호출 실패:", text);
          throw new Error("서버 호출 실패");
        }

        const data = await res.json();
        console.log("로그인 성공", data);
      } catch (err) {
        console.error("Google login error:", err);
      }
    };

    fetchBackend();
  }, [code]);

  return <div>로그인 처리 중...</div>;
}

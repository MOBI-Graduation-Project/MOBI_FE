"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { useEffect } from "react";

export default function GoogleCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  useEffect(() => {
    if (!code) return;

    const fetchGoogle = async () => {
      try {
        const res = await fetch("/api/auth", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code }),
        });

        if (!res.ok) throw new Error("서버 호출 실패");

        const data = await res.json();
        console.log(data);

        if (data.isNewUser) {
          router.replace("/signup/nickname");
        } else {
          router.replace("/map");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchGoogle();
  }, [code, router]);

  return <div>로그인 중...</div>;
}

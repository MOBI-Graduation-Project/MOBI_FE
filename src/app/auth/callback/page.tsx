"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { api } from "@/lib/api";

export default function GoogleCallback() {
  const router = useRouter();
  const search = useSearchParams();
  const code = search.get("code");
  const state = (search.get("state") || "login").toLowerCase(); // 라우팅 분기용

  useEffect(() => {
    const run = async () => {
      if (!code) {
        alert("구글 로그인 코드가 없습니다. 다시 시도해주세요.");
        router.replace("/");
        return;
      }
      try {
        const res = await api.post("/auth/google", { code });
        console.log("[/auth/google] response:", res);

        const body = res?.data;
        const payload = body?.result ?? body;
        const accessToken = payload?.accessToken;
        const refreshToken = payload?.refreshToken;
        const isNew = payload?.isNewMember;
        const member = payload?.member;

        if (accessToken) localStorage.setItem("accessToken", accessToken);
        if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
        if (member) localStorage.setItem("member", JSON.stringify(member));

        if (state === "signup" || isNew === true) {
          router.replace("/signup/purpose");
        } else {
          router.replace("/map");
        }
      } catch (err: any) {
        console.error(" /auth/google 실패:", err);
        console.log("request url:", api.defaults.baseURL + "/auth/google");
        console.log("err.response?.status:", err?.response?.status);
        console.log("err.response?.data:", err?.response?.data);
        alert(err?.response?.data?.message || err?.message || "Network Error");
        router.replace("/");
      }
    };
    run();
  }, [code, state, router]);

  return (
    <div className="flex h-screen items-center justify-center text-lg">
      구글 로그인 처리 중...
    </div>
  );
}

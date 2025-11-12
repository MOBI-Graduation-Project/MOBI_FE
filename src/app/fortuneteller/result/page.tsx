"use client";

import { useRouter } from "next/navigation";

import React, { useEffect, useMemo, useState } from "react";

import { useSajuStore } from "@/stores/sajuStore";

import RetryIcon from "@/assets/fortuneteller/retryIcon.svg";

import BottomBar from "@/components/common/bottomBar";
import Header from "@/components/common/header";
import HeadingTitle from "@/components/common/HeadingTitle";

const FortuneResult = () => {
  const router = useRouter();
  const { company, birthday } = useSajuStore();
  const nickname = "사용자";
  const listingDate = "1975년 6월 12일";
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resultText, setResultText] = useState<string>("");

  const handleRetry = () => {
    router.push("/fortuneteller");
  };

    // YYYY-MM-DD 포맷
  const birthDate = useMemo(() => {
    if (!birthday) return null;
    const pad = (n: number) => n.toString().padStart(2, "0");
    return `${birthday.year}-${pad(birthday.month)}-${pad(birthday.day)}`;
  }, [birthday]);

  // 로그인 api 연동 후 엑세스토큰 어쏘라이제이션 받기 전: mock=1로 테스트 호출
  useEffect(() => {
    const run = async () => {
      if (!company || !birthDate) return;
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/saju?mock=1`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ birthDate, stockName: company }),
        });
        if (!res.ok) {
          const raw = await res.text();
          throw new Error(raw || `HTTP ${res.status}`);
        }
        const data: { result?: string } = await res.json();
        setResultText(data.result ?? "(결과 문구 없음)");
      } catch (e: any) {
        setError(e?.message ?? "요청 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [company, birthDate]);

  return (
    <div
      className="flex h-screen w-full flex-col justify-between bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/svgs/backgroundImage.svg')" }}
    >
      <Header />

      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="pt-[213px]">
            <HeadingTitle
              userName={nickname}
              stockName={company ?? ""}
              texts={[
                "{userName}님과 {stockName}의 사주 궁합은?",
                "{stockName}의 주식 상장일은 " + listingDate + "입니다.",
              ]}
            />
          </div>

          <div className="mr-[176px] ml-[176px] max-h-[360px] w-[calc(100%-352px)] overflow-y-auto rounded-[20px] border-[2px] border-black bg-[#FFEEBD] px-[30px] py-[20px] shadow-lg">
            {loading && (
              <p className="font-pretendard text-brown text-center text-[24px] leading-tight">
                결과 생성 중...
              </p>
            )}
            {error && (
              <p className="font-pretendard text-red-700 text-center text-[20px] leading-tight">
                {error}
              </p>
            )}
            {!loading && !error && (
              <p className="font-pretendard text-brown whitespace-pre-line text-center text-[30px] leading-tight">
                {resultText}
              </p>
            )}
          </div>

          <button
            onClick={handleRetry}
            className="button-shadow bg-yellow text-brown hover:bg-yellow-10t text-stroke-white mb-[137px] inline-flex h-[60px] w-[255px] cursor-pointer items-center justify-center rounded-[20px] px-[19px] font-[geekble] text-[36px] shadow-lg transition-all"
          >
            <RetryIcon />점 다시보기
          </button>
        </div>
      </div>

      <BottomBar />
    </div>
  );
};

export default FortuneResult;

"use client";

import { useRouter } from "next/navigation";

import React, { useEffect, useMemo, useState } from "react";

import { useSajuStore } from "@/stores/sajuStore";

import { getSajuCompatibility } from "@/apis/saju";

import RetryIcon from "@/assets/fortuneteller/retryIcon.svg";

import HeadingTitle from "@/components/common/HeadingTitle";
import BottomBar from "@/components/common/bottomBar";
import Header from "@/components/common/header";

const FortuneResult = () => {
  const router = useRouter();
  const { company, birthday } = useSajuStore();

  const birthDate = useMemo(() => {
    if (!birthday) return null;
    const { year, month, day } = birthday;
    const pad = (n: number) => n.toString().padStart(2, "0");
    return `${year}-${pad(month)}-${pad(day)}`;
  }, [birthday]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resultText, setResultText] = useState<string>("");

  const handleRetry = () => {
    router.push("/fortuneteller");
  };

  useEffect(() => {
    if (!birthDate || !company) {
      router.push("/fortuneteller");
      return;
    }

    const fetchSaju = async () => {
      try {
        setLoading(true);
        setError(null);

        const result = await getSajuCompatibility(birthDate, company);
        setResultText(result);
      } catch (err) {
        console.error("사주 API 오류:", err);
        setError("사주 결과를 불러오지 못했습니다. 다시 시도해주세요.");
      } finally {
        setLoading(false);
      }
    };

    fetchSaju();
  }, [birthDate, company, router]);

  return (
    <div className="flex h-screen w-full flex-col justify-between">
      <Header />

      <div className="flex flex-1 flex-col items-center justify-center overflow-hidden">
        <div className="flex flex-col items-center gap-4">
          <div className="pt-[153px]">
            <HeadingTitle
              stockName={company ?? ""}
              texts={["{userName}님과 {stockName}의 사주 궁합은?"]}
            />
          </div>

          <div className="bg-yellow-10 mt-6 mr-[176px] ml-[176px] flex h-[360px] w-[350px] items-start justify-center overflow-y-auto rounded-[20px] border-[2px] border-black px-[10px] py-[5px] shadow-lg md:w-[980px] md:px-[30px] md:py-[20px]">
            {" "}
            <p className="text-brown md:text-lab1 text-lab2 text-center font-[pretendard] md:whitespace-pre-line">
              {/* 내용 렌더링 */}
              {loading && "사주를 분석하는 중입니다... "}
              {!loading && error && error}
              {!loading && !error && resultText}
            </p>
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

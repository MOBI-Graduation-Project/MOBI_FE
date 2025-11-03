"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useSajuStore } from "@/stores/sajuStore";

import { postSajuCompatibility, pickSajuText, SajuErrorResponse } from "src/api/saju";

import RetryIcon from "@/assets/fortuneteller/retryIcon.svg";
import BottomBar from "@/components/common/bottomBar";
import Header from "@/components/common/header";

const FortuneResult = () => {
  const router = useRouter();
  const { birthday, company } = useSajuStore();
  const nickname = "사용자";

  // TODO: 상장일은 추후 실제 주식 API 연결로 대체
  const listingDate = "1975년 6월 12일";

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [resultText, setResultText] = useState<string>("");

  // YYYY-MM-DD
  const birthDate = useMemo(() => {
    if (!birthday) return "";
    const y = String(birthday.year);
    const m = String(birthday.month).padStart(2, "0");
    const d = String(birthday.day).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }, [birthday]);

  useEffect(() => {
    // 입력 안 하고 결과로 직행하면 이전 단계로 돌려보내기
    if (!birthday) {
      router.replace("/fortuneteller");
      return;
    }
    if (!company) {
      router.replace("/fortuneteller/company");
      return;
    }

    const run = async () => {
      if (!birthDate || !company) return;
      setLoading(true);
      setErr(null);
      try {
        const data = await postSajuCompatibility({
          birthDate,
          stockName: company,
        });
        const text = pickSajuText(data);
        setResultText(text);
        console.log("✅ Saju API 성공:", data);
      } catch (e: any) {
        // Axios 에러 상세 분기
        if (e.response) {
          const status: number = e.response.status;
          const data: SajuErrorResponse = e.response.data || {};
          if (status === 404) {
            setErr(data.error || "종목을 찾을 수 없습니다.");
          } else if (status === 500) {
            setErr(data.error || "운세를 보는 중 오류가 발생했습니다. 다시 시도해주세요.");
          } else if (status === 401 || status === 302) {
            setErr("로그인이 필요합니다. 먼저 로그인 후 다시 시도해주세요.");
          } else {
            setErr(data.error || `에러 ${status}`);
          }
          console.log("❌ Saju 응답 에러:", status, data);
        } else if (e.request) {
          setErr("네트워크/CORS 에러: 서버 응답이 없습니다.");
          console.log("❌ 네트워크/CORS:", e.message);
        } else {
          setErr(`설정 에러: ${e.message}`);
          console.log("❌ 설정 에러:", e.message);
        }
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [birthday, company, birthDate, router]);

  const handleRetry = () => {
    router.push("/fortuneteller");
  };

  return (
    <div
      className="flex h-screen w-full flex-col justify-between bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/svgs/backgroundImage.svg')" }}
    >
      <Header />

      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <p className="text-heading1 text-brown text-stroke-white pt-[213px] text-center font-[geekble] leading-tight">
            {nickname}님과 {company}의 사주 궁합은?
            <br />
            {company}의 주식 상장일은 {listingDate}입니다.
          </p>

          <div className="mr-[176px] ml-[176px] flex items-center justify-center rounded-[20px] border-[2px] border-black bg-[#FFEEBD] px-30 py-10 shadow-lg min-h-[140px]">
            {loading ? (
              <p className="font-pretendard text-brown text-center text-[30px] leading-tight">
                계산 중입니다...
              </p>
            ) : err ? (
              <p className="font-pretendard text-red-600 text-center text-[24px] leading-tight">
                {err}
              </p>
            ) : (
              <p className="font-pretendard text-brown text-center text-[30px] leading-tight whitespace-pre-wrap">
                {resultText ||
                  "분석 결과를 불러오지 못했습니다. 잠시 후 다시 시도해주세요."}
              </p>
            )}
          </div>

          <button
            onClick={handleRetry}
            className="button-shadow bg-yellow text-brown hover:bg-yellow-10t text-stroke-white mb-[137px] inline-flex h-[60px] w-[255px] cursor-pointer items-center justify-center rounded-[20px] px-[19px] font-[geekble] text-[36px] shadow-lg transition-all"
          >
            <RetryIcon />
            점 다시보기
          </button>
        </div>
      </div>

      <BottomBar />
    </div>
  );
};

export default FortuneResult;

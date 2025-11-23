"use client";

import { useRouter } from "next/navigation";

import { useState } from "react";

import { useSajuStore } from "@/stores/sajuStore";

import LeftArrow from "@/assets/leftArrow.svg";
import RightArrow from "@/assets/rightArrow.svg";

import HeadingTitle from "@/components/common/HeadingTitle";
import BottomBar from "@/components/common/bottomBar";
import Header from "@/components/common/header";

const CompanyPage = () => {
  const router = useRouter();
  const { setCompany } = useSajuStore();

  const [companyName, setCompanyName] = useState("");

  const handleNext = () => {
    if (!companyName.trim()) return;
    setCompany(companyName.trim());
    router.push("/fortuneteller/result");
  };

  const handlePrev = () => router.back();

  return (
    <div
      className="flex h-screen w-full flex-col bg-cover bg-center bg-no-repeat pt-[42.5px] pb-[99px]"
      style={{ backgroundImage: "url('/svgs/backgroundImage.svg')" }}
    >
      <Header />

      <div className="flex flex-1 items-center justify-center px-4">
        <div className="relative flex w-full max-w-[980px] flex-col items-center gap-6">
          {/* 안내 문구 */}
          <HeadingTitle
            texts={["{userName} 님과 궁합을 볼 주식 이름을 입력해주세요."]}
          />
          {/* 입력창 */}
          <input
            type="text"
            placeholder="당신의 주식 이름은?"
            value={companyName}
            onChange={e => setCompanyName(e.target.value)}
            className="font-pretendard text-brown placeholde : [#4D270099] w-full max-w-[800px] rounded-[20px] border-[2px] border-[#000000] bg-[#FFEFBF] px-[30px] py-[10px] text-[32px] shadow-inner focus:outline-none"
          />

          {/* 이전 버튼 */}
          <button
            onClick={handlePrev}
            className="fixed top-1/2 left-[30px] flex h-[114px] w-[114px] -translate-y-1/2 transform cursor-pointer items-center justify-center rounded-full transition-all"
          >
            <LeftArrow className="h-full w-full" />
          </button>

          {/* 다음 버튼 */}
          <button
            onClick={handleNext}
            disabled={!companyName.trim()}
            className={`fixed top-1/2 right-[30px] flex h-[114px] w-[114px] -translate-y-1/2 transform items-center justify-center rounded-full transition-all ${
              companyName.trim()
                ? "cursor-pointer"
                : "cursor-not-allowed opacity-50"
            }`}
          >
            <RightArrow className="h-full w-full" />
          </button>
        </div>
      </div>

      <BottomBar />
    </div>
  );
};

export default CompanyPage;

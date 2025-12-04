"use client";

import { useRouter } from "next/navigation";

import { useEffect, useMemo, useState } from "react";

import { useSajuStore } from "@/stores/sajuStore";

import LeftArrow from "@/assets/leftArrow.svg";
import RightArrow from "@/assets/rightArrow.svg";

import HeadingTitle from "@/components/common/HeadingTitle";
import BottomBar from "@/components/common/bottomBar";
import Header from "@/components/common/header";
import DateSelector from "@/components/fortuneteller/DateSelector";

import { daysInMonth } from "@/utils/fortunteller/getDaysInMonth";

const FortuneTellerPage = () => {
  const router = useRouter();
  const { setBirthday } = useSajuStore();

  const today = new Date();

  // 상태값 (기본값 = 오늘)
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [day, setDay] = useState(today.getDate());

  // 일자 보정
  useEffect(() => {
    const dim = daysInMonth(year, month);
    if (day > dim) setDay(dim);
  }, [year, month, day]);

  const years = useMemo(
    () => Array.from({ length: 96 }, (_, i) => new Date().getFullYear() - i),
    [],
  );
  const months = useMemo(() => Array.from({ length: 12 }, (_, i) => i + 1), []);
  const days = useMemo(
    () => Array.from({ length: daysInMonth(year, month) }, (_, i) => i + 1),
    [year, month],
  );

  const isValid =
    month >= 1 && month <= 12 && day >= 1 && day <= daysInMonth(year, month);

  const handlePrev = () => router.back();
  const handleNext = () => {
    if (!isValid) return;
    setBirthday({ year, month, day });
    router.push("/fortuneteller/company");
  };

  return (
    <div className="flex h-screen w-full flex-col">
      <Header />
      <div className="flex flex-1 items-center justify-center p-4">
        <div className="relative flex w-full max-w-[980px] flex-col items-center gap-[10px] md:gap-[31.71px]">
          {/* 이전버튼 */}
          <button
            onClick={handlePrev}
            className="fixed top-1/2 left-[5px] flex h-[50px] w-[50px] -translate-y-1/2 transform cursor-pointer items-center justify-center rounded-full transition-all md:left-[30px] md:h-[114px] md:w-[114px]"
          >
            <LeftArrow className="h-full w-full" />
          </button>
          {/* 다음버튼 */}
          <button
            onClick={handleNext}
            disabled={!isValid}
            className={`fixed top-1/2 right-[5px] flex h-[50px] w-[50px] -translate-y-1/2 transform items-center justify-center rounded-full transition-all md:right-[30px] md:h-[114px] md:w-[114px] ${
              isValid ? "cursor-pointer" : "cursor-not-allowed opacity-50"
            }`}
          >
            <RightArrow className="h-full w-full" />
          </button>

          {/* 안내문구 */}
          <HeadingTitle
            texts={[
              "{userName} 님, 사주 궁합을 위해 <br>생년월일을 입력해주세요.",
            ]}
          />
          <div className="border-cream bg-cream flex flex-col items-start justify-center gap-[5px] rounded-[30px] border-[30px] pl-[30px] md:h-[135px] md:w-[948px] md:flex-row md:items-center md:gap-[90px]">
            <DateSelector
              label="년"
              value={year}
              options={years}
              width="md:w-[206px] w-[130px]"
              onChange={setYear}
            />
            <DateSelector
              label="월"
              value={month}
              options={months}
              width="md:w-[143px] w-[100px]"
              onChange={setMonth}
            />
            <DateSelector
              label="일"
              value={day}
              options={days}
              width="md:w-[143px] w-[100px]"
              onChange={setDay}
            />
          </div>
        </div>
      </div>

      <BottomBar />
    </div>
  );
};

export default FortuneTellerPage;

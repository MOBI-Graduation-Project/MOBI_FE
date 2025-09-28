"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import Header from "@/components/header";
import BottomBar from "@/components/bottomBar";
import DownArrowIcon from "@/assets/fortuneteller/downArrowIcon.svg";

import { useSajuStore } from "@/stores/sajuStore";
import { useSignupStore } from "@/stores/signupStore";

import LeftArrow from "@/assets/leftArrow.svg";
import RightArrow from "@/assets/rightArrow.svg";

// 윤년/말일 계산
const isLeap = (y: number) => (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
const daysInMonth = (y: number, m: number) =>
  [31, isLeap(y) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][m - 1];

const FortuneTellerPage = () => {
  const router = useRouter();
  const nickname = useSignupStore((s) => s.nickname) || "사용자";
  const { setBirthday } = useSajuStore();

  // 오늘 날짜
  const today = new Date();

  // 상태값 (기본값 = 오늘)
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [day, setDay] = useState(today.getDate());

  // 선택된 값 
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const [yearOpen, setYearOpen] = useState(false);
  const [monthOpen, setMonthOpen] = useState(false);
  const [dayOpen, setDayOpen] = useState(false);

  // 일자 보정
  useEffect(() => {
    const dim = daysInMonth(year, month);
    if (day > dim) setDay(dim);
  }, [year, month, day]);

  const years = useMemo(
  () => Array.from({ length: 96 }, (_, i) => new Date().getFullYear() - i),
  []
);
  const months = useMemo(() => Array.from({ length: 12 }, (_, i) => i + 1), []);
  const days = useMemo(
    () => Array.from({ length: daysInMonth(year, month) }, (_, i) => i + 1),
    [year, month]
  );

  const isValid =
    month >= 1 &&
    month <= 12 &&
    day >= 1 &&
    day <= daysInMonth(year, month);

  const handlePrev = () => router.back();
  const handleNext = () => {
    if (!isValid) return;
    setBirthday({ year, month, day }); 
    router.push("/fortuneteller/company");
  };

  return (
    <div
      className="flex h-screen w-full flex-col bg-cover bg-center bg-no-repeat pt-[42.5px] pb-[99px]"
      style={{ backgroundImage: "url('/svgs/backgroundImage.svg')" }}
    >
      <Header />


      <div className="flex flex-1 items-center justify-center px-4">
        <div className="relative flex w-full max-w-[980px] flex-col items-center gap-[31.71px]">
          {/* 안내문구 */}
          <p className="text-center font-[geekble] text-heading1 pt-[5px] leading-tight text-brown text-stroke-white ">
            {nickname} 님, 사주 궁합을 위해 당신의 생년월일을 입력해주세요.
          </p>

          {/* 입력박스 */}
          <div className="flex items-center justify-center w-[948px] h-[135px] pl-[30px] gap-[90px] rounded-[30px] border-[30px] border-[#FFFAEA] bg-[#FFFAEA]">
            {/* 년 */}
            <div className="flex items-center gap-[15px]">
              <div className="relative">
                <div
                  className="flex h-[80px] w-[206px] items-center pr-[20px] justify-end gap-[10px] rounded-[18px] border-[3px] border-[#2F1F14] bg-[#FCE9B9] cursor-pointer"
                  onClick={() => setYearOpen(!yearOpen)}
                >
                  <DownArrowIcon className="absolute left-[-40px] top-1/2 -translate-y-1/2 custom-shadow" />

                  <span
                    className={`font-[geekble] text-[48px] ${
                      selectedYear ? "text-brown" : "text-[#8C8C8C]"
                    }`}
                  >
                    {selectedYear ?? year}
                  </span>
                </div>

                {yearOpen && (
                  <div className="absolute top-[70px] left-0 z-50 max-h-[200px] w-[170px] overflow-y-auto rounded-[18px] border-[3px] border-[#2F1F14] bg-[#FCE9B9] shadow-lg">
                    {years.map((y) => (
                      <div
                        key={y}
                        onClick={() => {
                          setYear(y);
                          setSelectedYear(y);
                          setYearOpen(false);
                        }}
                        className="cursor-pointer px-4 py-2 text-center font-pretendard text-[24px] hover:bg-yellow-60"
                      >
                        {y}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <span className="font-[geekble] text-[48px] text-brown">년</span>
            </div>

            {/* 월 */}
            <div className="flex items-center gap-[15px]">
              <div className="relative">
                <div
                  className="flex h-[80px] w-[143px] items-center pr-[20px] justify-end gap-[10px] rounded-[18px] border-[3px] border-[#2F1F14] bg-[#FCE9B9] cursor-pointer"
                  onClick={() => setMonthOpen(!monthOpen)}
                >
                  <DownArrowIcon className="absolute left-[-40px] top-1/2 -translate-y-1/2 custom-shadow" />

                  <span
                    className={`font-[geekble] text-[48px] ${
                      selectedMonth ? "text-brown" : "text-[#8C8C8C]"
                    }`}
                  >
                    {String(selectedMonth ?? month).padStart(2, "0")}
                  </span>
                </div>

                {monthOpen && (
                  <div className="absolute top-[70px] left-0 z-50 max-h-[200px] w-[140px] overflow-y-auto rounded-[18px] border-[3px] border-[#2F1F14] bg-[#FCE9B9] shadow-lg">
                    {months.map((m) => (
                      <div
                        key={m}
                        onClick={() => {
                          setMonth(m);
                          setSelectedMonth(m);
                          setMonthOpen(false);
                        }}
                        className="cursor-pointer px-4 py-2 text-center font-[geekble] text-[24px] hover:bg-yellow-60"
                      >
                        {String(m).padStart(2, "0")}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <span className="font-[geekble] text-[48px] text-brown">월</span>
            </div>

            {/* 일 */}
            <div className="flex items-center gap-[15px]">
              <div className="relative">
                <div
                  className="flex h-[80px] w-[143px] items-center pr-[20px] justify-end gap-[10px] rounded-[18px] border-[3px] border-[#2F1F14] bg-[#FCE9B9] cursor-pointer"
                  onClick={() => setDayOpen(!dayOpen)}
                >
                  <DownArrowIcon className="absolute left-[-40px] top-1/2 -translate-y-1/2 custom-shadow" />

                  <span
                    className={`font-[geekble] text-[48px] ${
                      selectedDay ? "text-brown" : "text-[#8C8C8C]"
                    }`}
                  >
                    {String(selectedDay ?? day).padStart(2, "0")}
                  </span>
                </div>

                {dayOpen && (
                  <div className="absolute top-[70px] left-0 z-50 max-h-[200px] w-[140px] overflow-y-auto rounded-[18px] border-[3px] border-[#2F1F14] bg-[#FCE9B9] shadow-lg">
                    {days.map((d) => (
                      <div
                        key={d}
                        onClick={() => {
                          setDay(d);
                          setSelectedDay(d);
                          setDayOpen(false);
                        }}
                        className="cursor-pointer px-4 py-2 text-center font-[geekble] text-[24px] hover:bg-yellow-60"
                      >
                        {String(d).padStart(2, "0")}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <span className="font-[geekble] text-[48px] text-brown">일</span>
            </div>
          </div>

          {/* 이전버튼 */}
          <button
            onClick={handlePrev}
            className="absolute top-1/2 left-[-190px] flex h-[114px] w-[114px] -translate-y-1/2 transform cursor-pointer items-center justify-center rounded-full transition-all"
          >
            <LeftArrow className="h-full w-full" />
          </button>

          {/* 다음버튼 */}
          <button
            onClick={handleNext}
            disabled={!isValid}
            className={`absolute top-1/2 right-[-190px] flex h-[114px] w-[114px] -translate-y-1/2 transform items-center justify-center rounded-full transition-all ${
              isValid ? "cursor-pointer" : "cursor-not-allowed opacity-50"
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

export default FortuneTellerPage;

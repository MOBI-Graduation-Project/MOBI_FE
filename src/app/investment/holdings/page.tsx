"use client";

import { useEffect, useState } from "react";

import { getMyData } from "@/apis/investment";

import HeadingTitle from "@/components/common/HeadingTitle";
import BottomBar from "@/components/common/bottomBar";
import Header from "@/components/common/header";
import DropdownMenu from "@/components/investment/DropdownMenu";
import PieChart from "@/components/investment/PieChart";
import { StockSummary } from "@/components/investment/StockSummary";

import { PieData } from "@/types/investment/stockTypes";

const HoldingStocks = () => {
  const [loading, setLoading] = useState(true);
  const [holdings, setHoldings] = useState<PieData[]>([]);

  useEffect(() => {
    const fetchHoldingsData = async () => {
      try {
        const data = await getMyData();
        if (data?.isSuccess) {
          setHoldings(data.result);
        }
      } catch (error) {
        console.error("Error fetching holdings data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHoldingsData();
  }, []);

  return (
    <div className="min-h-screen w-full">
      {loading ? (
        <div className="flex h-screen w-full items-center justify-center">
          <HeadingTitle texts={["로딩중..."]} />
        </div>
      ) : (
        <>
          <Header />
          <div className="fixed top-[120px] left-[30px]">
            <DropdownMenu />
          </div>
          {holdings.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <HeadingTitle
                texts={["보유한 종목이 없습니다.", "데이터를 추가해보세요"]}
              />
            </div>
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-[25px] pt-[110px] pb-[100px]">
              <HeadingTitle
                texts={[
                  "{userName}님의 보유 종목 비율입니다.",
                  "항목명을 클릭하면 원하는 순서로 정렬해볼 수 있어요",
                ]}
              />
              <div className="flex justify-center gap-30">
                <StockSummary />
                <PieChart data={holdings} />
              </div>
            </div>
          )}
          <BottomBar />
        </>
      )}
    </div>
  );
};
export default HoldingStocks;

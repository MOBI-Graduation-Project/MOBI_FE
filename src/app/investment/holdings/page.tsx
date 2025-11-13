"use client";

import { useEffect, useState } from "react";

import { getMyData } from "@/apis/investment";

import HeadingTitle from "@/components/common/HeadingTitle";
import BottomBar from "@/components/common/bottomBar";
import Header from "@/components/common/header";
import DropdownMenu from "@/components/investment/DropdownMenu";
import PieChart from "@/components/investment/PieChart";

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
    <div
      className="relative min-h-screen w-full overflow-y-auto bg-cover bg-center bg-repeat-y"
      style={{ backgroundImage: "url('/svgs/bgImage.jpg')" }}
    >
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
          <div className="flex h-full w-full flex-col items-center justify-center gap-[20px] pt-[100px] pb-[120px]">
            {holdings.length === 0 ? (
              <HeadingTitle
                texts={["보유한 종목이 없습니다.", "데이터를 추가해보세요"]}
              />
            ) : (
              <>
                <HeadingTitle
                  texts={["{userName}님의 보유 종목 비율입니다."]}
                />
                <PieChart data={holdings} />
              </>
            )}
          </div>
          <BottomBar />
        </>
      )}
    </div>
  );
};
export default HoldingStocks;

"use client";

import { usePathname, useRouter } from "next/navigation";

import { useEffect, useState } from "react";

import { getMyData } from "@/apis/investment";

import { STOCK_NAME_MAP } from "@/constants/STOCK_NAME_MAP";

import { PieData } from "@/types/investment/stockTypes";

import HeadingTitle from "../common/HeadingTitle";
import YellowButton from "../common/YellowButton";

const StocksList = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [holdings, setHoldings] = useState<PieData[]>([]);
  const [loading, setLoading] = useState(true);

  const handleButtonClick = (stock: string) => {
    if (pathname.includes("investment/holdings/new")) {
      router.push("/investment/holdings");
    } else {
      router.push(`/investment/${stock}`);
    }
  };

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

  const myStocks = pathname.includes("investment/holdings/new")
    ? holdings.map(stock => stock.stockName)
    : ["kakao", "samsung-electronic"];

  return (
    <div className="h-[200px] w-[300px] overflow-hidden md:h-[246px] md:w-[1000px]">
      {loading ? (
        <div className="flex h-full w-full items-center justify-center">
          <HeadingTitle texts={["로딩중 ..."]} />
        </div>
      ) : (
        <div className="h-full overflow-y-auto rounded-[10px]">
          {myStocks.length === 0 && (
            <HeadingTitle
              texts={["보유한 종목이 없습니다.", "데이터를 추가해보세요"]}
            />
          )}
          {myStocks.map((stock, index) => (
            <div key={stock}>
              <div className="flex h-[40px] w-full items-center justify-between bg-white/70 px-[10px] py-[10px] md:h-[61px] md:px-[30px]">
                <span className="text-brown-dark md:text-body text-lab1 font-[geekble]">
                  {STOCK_NAME_MAP[stock] ?? stock}
                </span>
                <YellowButton
                  text="차트보기"
                  width="md:w-[130px] w-[80px]"
                  onClick={() => handleButtonClick(stock)}
                />
              </div>
              {index < myStocks.length - 1 && (
                <div className="bg-brown-10/10 h-[2px] w-full" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default StocksList;

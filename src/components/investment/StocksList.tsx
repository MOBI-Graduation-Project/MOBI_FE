"use client";

import { usePathname, useRouter } from "next/navigation";

import { STOCK_NAME_MAP } from "@/constants/STOCK_NAME_MAP";

import myStockList from "@/mock/hodingsMockData.json";

import YellowButton from "../common/YellowButton";

const StocksList = () => {
  const router = useRouter();
  const pathname = usePathname();
  const myStocks = pathname.includes("investment/holdings/new")
    ? myStockList.map(stock => stock.stockName)
    : ["kakao", "samsung-electronic"];

  const handleButtonClick = (stock: string) => {
    if (pathname.includes("investment/holdings/new")) {
      router.push("/investment/holdings");
    } else {
      router.push(`/investment/${stock}`);
    }
  };

  return (
    <div className="oveflow-hidden h-[246px] overflow-y-auto rounded-[10px]">
      {myStocks.map((stock, index) => (
        <div key={stock}>
          <div className="flex h-[61px] w-[795px] justify-between bg-white/70 px-[30px] py-[10px]">
            <span className="text-brown-dark text-body font-[geekble]">
              {STOCK_NAME_MAP[stock] ?? stock}
            </span>
            <YellowButton
              text="차트보기"
              width="130"
              onClick={() => handleButtonClick(stock)}
            />
          </div>
          {index < myStocks.length - 1 && (
            <div className="bg-brown-10/10 h-[2px] w-full" />
          )}
        </div>
      ))}
    </div>
  );
};
export default StocksList;

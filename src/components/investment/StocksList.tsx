"use client";

import { useRouter } from "next/navigation";

import { STOCK_NAME_MAP } from "@/constants/STOCK_NAME_MAP";

import YellowButton from "../common/YellowButton";

export const StocksList = () => {
  const router = useRouter();
  const myStocks = ["KAKAO", "SAMSUNG_ELECTRONIC"];

  const handleButtonClick = (stock: string) => {
    router.push(`investment/${stock}`);
  };

  return (
    <div>
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

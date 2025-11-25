"use client";

import HeadingTitle from "@/components/common/HeadingTitle";
import BottomBar from "@/components/common/bottomBar";
import Header from "@/components/common/header";
import DropdownMenu from "@/components/investment/DropdownMenu";
import { InputStockField } from "@/components/investment/InputStockField";
import StocksList from "@/components/investment/StocksList";

const MyStock = () => {
  return (
    <div className="min-h-screen w-full">
      <Header />
      <div className="fixed top-[120px] left-[30px]">
        <DropdownMenu />
      </div>
      <div className="flex h-full flex-col items-center justify-center gap-[25px]">
        <HeadingTitle
          texts={[
            "{userName}님의 보유종목입니다.",
            "차트보기를 통해 보유 주식 현황차트를 조회해 보세요.",
          ]}
        />
        <div className="flex w-full flex-col items-center justify-center gap-4">
          <InputStockField />
          <StocksList />
        </div>
      </div>

      <BottomBar />
    </div>
  );
};
export default MyStock;

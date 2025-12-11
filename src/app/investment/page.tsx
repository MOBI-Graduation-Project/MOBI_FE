"use client";

import HeadingTitle from "@/components/common/HeadingTitle";
import BottomBar from "@/components/common/bottomBar";
import Header from "@/components/common/header";
import DropdownMenu from "@/components/investment/DropdownMenu";
import StocksList from "@/components/investment/StocksList";

const InvestmentPage = () => {
  return (
    <div className="min-h-screen w-full">
      <Header />
      <div className="fixed top-[100px] left-[30px] md:top-[120px]">
        <DropdownMenu />
      </div>

      <div className="flex h-full flex-col items-center justify-center gap-[41px]">
        <HeadingTitle
          texts={[
            "{userName}님의 관심종목입니다.",
            "차트보기를 통해 오늘의 예상 주가를 확인해 보세요.",
          ]}
        />
        <StocksList />
      </div>
      <BottomBar />
    </div>
  );
};
export default InvestmentPage;

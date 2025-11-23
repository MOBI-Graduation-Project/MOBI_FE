"use client";

import { useUserStore } from "@/stores/userStore";

import HeadingTitle from "@/components/common/HeadingTitle";
import BottomBar from "@/components/common/bottomBar";
import Header from "@/components/common/header";
import DropdownMenu from "@/components/investment/DropdownMenu";
import StocksList from "@/components/investment/StocksList";

const InvestmentPage = () => {
  console.log(useUserStore.getState().accessToken);
  return (
    <div
      className="relative min-h-screen w-full overflow-y-auto bg-cover bg-center bg-repeat-y"
      style={{ backgroundImage: "url('/svgs/bgImage.jpg')" }}
    >
      <Header />
      <div className="fixed top-[120px] left-[30px]">
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

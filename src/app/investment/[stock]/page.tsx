"use client";

import { useParams } from "next/navigation";

import HeadingTitle from "@/components/common/HeadingTitle";
import BottomBar from "@/components/common/bottomBar";
import Header from "@/components/common/header";
import DropdownMenu from "@/components/investment/DropdownMenu";

const StockChartPage = () => {
  const params = useParams();
  const stockName = params.stock;

  return (
    <div
      className="relative min-h-screen w-full overflow-y-auto bg-cover bg-center bg-repeat-y"
      style={{ backgroundImage: "url('/svgs/bgImage.jpg')" }}
    >
      <Header />
      <div className="fixed top-[120px] left-[30px]">
        <DropdownMenu />
      </div>
      <div className="flex h-full w-full flex-col items-center justify-center gap-[20px] pt-[100px] pb-[120px]">
        <HeadingTitle
          texts={["{stockName}의 주식 예측 차트입니다."]}
          stockName={stockName as string}
        />
      </div>

      <BottomBar />
    </div>
  );
};
export default StockChartPage;

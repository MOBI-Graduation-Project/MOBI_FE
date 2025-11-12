"use client";

import { useParams, useRouter } from "next/navigation";

import HeadingTitle from "@/components/common/HeadingTitle";
import YellowButton from "@/components/common/YellowButton";
import BottomBar from "@/components/common/bottomBar";
import Header from "@/components/common/header";
import DropdownMenu from "@/components/investment/DropdownMenu";
import MarketPredictField from "@/components/investment/MarketPredictField";
import StockChart from "@/components/investment/StockLineChart";

import { STOCK_NAME_MAP } from "@/constants/STOCK_NAME_MAP";

import selectedStock from "@/mock/stockPredictionData.json";

const StockChartPage = () => {
  const params = useParams();
  const router = useRouter();

  const stockSlug = params.stock as string;
  const stockName = STOCK_NAME_MAP[stockSlug];
  const stockData = selectedStock.find(
    item => item.stock.stockName === stockName,
  );

  return (
    <div
      className="relative min-h-screen w-full overflow-y-auto bg-cover bg-center bg-repeat-y"
      style={{ backgroundImage: "url('/svgs/bgImage.jpg')" }}
    >
      <Header />
      <div className="fixed top-[120px] left-[30px] z-[100]">
        <DropdownMenu />
      </div>
      <div className="fixed top-[200px] left-[30px] flex gap-[20px]">
        <YellowButton
          text="삼성전자"
          width="w-[100px]"
          onClick={() => router.push("/investment/samsung-electronic")}
        />
        <YellowButton
          text="카카오"
          width="w-[100px]"
          onClick={() => router.push("/investment/kakao")}
        />
      </div>
      <div className="flex h-full w-full flex-col items-center justify-center gap-[20px] pt-[100px] pb-[120px]">
        <HeadingTitle
          texts={["{stockName} 주식 예측 차트입니다."]}
          stockName={stockName as string}
        />
        <>
          {stockData ? (
            <StockChart data={stockData} />
          ) : (
            <HeadingTitle
              texts={["데이터를 찾을 수 없습니다. 다시 조회해주세요"]}
            />
          )}
        </>
        <MarketPredictField />
      </div>
      <BottomBar />
    </div>
  );
};
export default StockChartPage;

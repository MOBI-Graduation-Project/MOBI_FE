"use client";

import { useParams, useRouter } from "next/navigation";

import { useEffect, useState } from "react";

import { getPriceRecords } from "@/apis/investment";

import HeadingTitle from "@/components/common/HeadingTitle";
import YellowButton from "@/components/common/YellowButton";
import BottomBar from "@/components/common/bottomBar";
import Header from "@/components/common/header";
import DropdownMenu from "@/components/investment/DropdownMenu";
import MarketPredictField from "@/components/investment/MarketPredictField";
import StockChart from "@/components/investment/StockLineChart";

import { STOCK_CODE_MAP } from "@/constants/STOCK_CODE_MAP";
import { STOCK_NAME_MAP } from "@/constants/STOCK_NAME_MAP";

import { StockPrediction } from "@/types/investment/stockTypes";

const StockChartPage = () => {
  const params = useParams();
  const router = useRouter();

  const stockSlug = params.stock as string;
  const stockName = STOCK_NAME_MAP[stockSlug];
  const stockCode = STOCK_CODE_MAP[stockSlug];

  const [stockData, setStockData] = useState<StockPrediction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecords = async () => {
      if (!stockCode) return;

      try {
        const data = await getPriceRecords(stockCode);
        setStockData(data);
      } catch (err) {
        console.error(err);
        setStockData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchRecords();
  }, [stockCode]);

  if (!stockCode) return <div>잘못된 종목입니다.</div>;

  return (
    <div className="min-h-screen w-full">
      {loading ? (
        <div className="flex h-screen w-full items-center justify-center">
          <HeadingTitle texts={["로딩중..."]} />
        </div>
      ) : (
        <>
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
              {stockData.length > 0 ? (
                <StockChart data={stockData[0]} />
              ) : (
                <HeadingTitle
                  texts={["데이터를 찾을 수 없습니다. 다시 조회해주세요"]}
                />
              )}
            </>
            <MarketPredictField />
          </div>
          <BottomBar />
        </>
      )}
    </div>
  );
};
export default StockChartPage;

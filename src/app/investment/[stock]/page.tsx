"use client";

import { useParams } from "next/navigation";

const StockChartPage = () => {
  const params = useParams();
  const stockName = params.stock;

  return (
    <div className="flex h-full w-full items-center justify-center">
      {stockName} 주식 차트 보기
    </div>
  );
};
export default StockChartPage;

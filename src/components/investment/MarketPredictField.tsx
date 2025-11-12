import marketData from "@/mock/marketPredictionData.json";

import { MarketPrediction } from "@/types/investment/stockTypes";

const MarketPredictField = () => {
  const predictions: MarketPrediction[] = marketData as MarketPrediction[];

  return (
    <div className="text-lab1 flex h-[50px] w-full items-center justify-center bg-black/50 px-[10px] py-[20px] font-[pretendard] text-white">
      <div className="animate-marquee flex whitespace-nowrap">
        {predictions.map((p, i) => (
          <span key={i} className="mr-100">
            오늘 {p.marketName} 시장은{" "}
            <span
              className={`${p.prediction_result === "상승" ? "text-green" : "text-red"}`}
            >
              {p.prediction_result === "상승" ? "상승세 ⬆ " : "하락세 ⬇ "}
            </span>
            가 예상돼요.
          </span>
        ))}
        {predictions.map((p, i) => (
          <span key={`repeat-${i}`} className="mr-100">
            오늘 {p.marketName} 시장은{" "}
            <span
              className={`${p.prediction_result === "상승" ? "text-green" : "text-red"}`}
            >
              {p.prediction_result === "상승" ? "상승세 ⬆ " : "하락세 ⬇"}
            </span>
            가 예상돼요.
          </span>
        ))}
      </div>
    </div>
  );
};
export default MarketPredictField;

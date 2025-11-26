import { useEffect, useState } from "react";

import { getMarketPredictions } from "@/apis/investment";

import { MarketPrediction } from "@/types/investment/stockTypes";

import { ToastMessage } from "../common/ToastMessage";

const MarketPredictField = () => {
  const [predictions, setPredictions] = useState<MarketPrediction[]>([]);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  useEffect(() => {
    const fetchMarketPredictions = async () => {
      try {
        const data = await getMarketPredictions();
        setPredictions(data.result);
      } catch (error) {
        console.error("Error fetching market predictions:", error);
        setToastMsg("시장 예측 정보를 불러오지 못했습니다.");
        setTimeout(() => setToastMsg(null), 1000);
      }
    };

    fetchMarketPredictions();
  }, []);

  return (
    <div className="md:text-lab1 text-cap3 text-brown flex h-[50px] w-full items-center justify-center bg-white/30 px-[10px] py-[20px] font-[geekble]">
      {toastMsg ? (
        <ToastMessage message={toastMsg} />
      ) : (
        <div className="bg-yellow-10 flex flex-col rounded-[10px] px-6 py-4 md:flex-row">
          {predictions.map(p => (
            <span key={p.marketName} className="mx-4">
              오늘 {p.marketName} 시장은{" "}
              <span
                className={
                  p.prediction_result === "상승" ? "text-blue" : "text-red"
                }
              >
                {p.prediction_result === "상승" ? "상승세 ⬆" : "하락세 ⬇"}
              </span>
              가 예상돼요.
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
export default MarketPredictField;

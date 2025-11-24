import { MyDataRegister, StockPrediction } from "@/types/investment/stockTypes";

import { apiClient } from "./apiClient";

// 코스피 코스닥 예측 정보 가져오기
export const getMarketPredictions = async () => {
  try {
    const res = await apiClient.get("/prediction", {});
    return res.data;
  } catch (error) {
    console.error("getMarketPredictions Error:", error);
    throw error;
  }
};

// 개별 주식 예측 정보 가져오기
export const getPriceRecords = async (
  stockCode: string,
): Promise<StockPrediction[]> => {
  const res = await apiClient.get(`/prediction/${stockCode}`, {});

  return res.data;
};

// 내가 보유한 주식 데이터 등록하기
export const postMyData = async (myDataRegister: MyDataRegister) => {
  const res = await apiClient.post("/mydata", myDataRegister, {});
  return res.data;
};

// 내가 보유한 주식 현황 가져오기
export const getMyData = async () => {
  const res = await apiClient.get("/mydata/piechart", {});
  return res.data;
};

// 내가 보유한 주식 목록 가져오기
export const getMyDataList = async () => {
  const res = await apiClient.get("/mydata", {});
  return res.data;
};

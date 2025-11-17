import { MyDataRegister, StockPrediction } from "@/types/investment/stockTypes";

import { apiClient } from "./apiClient";

// 코스피 코스닥 예측 정보 가져오기
export const getMarketPredictions = async () => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) throw new Error("로그인 필요합니다.");
  try {
    const res = await apiClient.get("/prediction/market", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
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
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) throw new Error("로그인이 필요합니다.");

  const res = await apiClient.get(`/prediction/${stockCode}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return res.data;
};

// 내가 보유한 주식 데이터 등록하기
export const postMyData = async (myDataRegister: MyDataRegister) => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) throw new Error("로그인이 필요합니다.");

  const res = await apiClient.post("/mydata", myDataRegister, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return res.data;
};

// 내가 보유한 주식 현황 가져오기
export const getMyData = async () => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) throw new Error("로그인이 필요합니다.");

  const res = await apiClient.get("/mydata/piechart", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  console.log("api mydata piechart:", res.data);
  return res.data;
};

// 내가 보유한 주식 목록 가져오기
export const getMyDataList = async () => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) throw new Error("로그인이 필요합니다.");

  const res = await apiClient.get("/mydata", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return res.data;
};

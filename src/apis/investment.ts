import { apiClient } from "./apiClient";

// 코스피 코스닥 예측 가져오기
export const getMarktetPredictions = async () => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) throw new Error("로그인 필요");
  try {
    await apiClient.get("/api/predicion");
  } catch (error) {
    throw error;
  }
};

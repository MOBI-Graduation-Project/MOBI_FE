import type { RawSajuCompatibilityResponse } from "@/types/saju";

import { apiClient } from "./apiClient";

export const getSajuCompatibility = async (
  birthDate: string,
  stockName: string,
): Promise<string> => {
  try {
    const res = await apiClient.post<RawSajuCompatibilityResponse>(
      "/saju/compatibility",
      {
        birthDate,
        stockName,
      },
    );

    const { result } = res.data;

    if (typeof result !== "string") {
      throw new Error("사주 API 응답 형식이 올바르지 않습니다.");
    }

    return result;
  } catch (error) {
    console.error("getSajuCompatibility Error:", error);
    throw error;
  }
};

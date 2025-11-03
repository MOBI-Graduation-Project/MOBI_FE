// src/api/saju.ts
import { api } from "@/lib/api";

/* 요청 바디 */
export type SajuRequest = {
  birthDate: string;   // "2000-11-27"
  stockName: string;   // "삼성전자"
};

/* 응답 바디: 명세가 혼재되어 있어 두 형태 모두 지원 */
type FlatResponse = { result: string; isSuccess?: boolean };
type NestedResponse = { isSuccess: boolean; result: { result: string } };
export type SajuRawResponse = FlatResponse | NestedResponse;

/* 에러 응답 (404/500) */
export type SajuErrorResponse = { error?: string };

/* 응답에서 최종 텍스트만 안전하게 뽑아주는 헬퍼 */
export function pickSajuText(data: SajuRawResponse | undefined): string {
  if (!data) return "";

  if (
    typeof (data as NestedResponse).isSuccess !== "undefined" &&
    (data as any).result &&
    typeof (data as any).result.result === "string"
  ) {
    return (data as any).result.result;
  }

  if (typeof (data as any).result === "string") {
    return (data as any).result as string;
  }
  return "";
}

/* POST /api/saju/compatibility */
export async function postSajuCompatibility(body: SajuRequest) {
  const res = await api.post<SajuRawResponse>("/api/saju/compatibility", body);
  return res.data;
}

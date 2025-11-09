import {
  SajuCompatibilityRequest,
  SajuCompatibilityResponse,
} from "@/types/saju";

//내부 프록시 라우트 URL로 프론트에서는 외부 BE를 직접 부르지 않고 반드시 이 경유지(/api/saju)로 요청을 보냄
const SAJU_API = "/api/saju";

/**
 * 사주 궁합 POST 호출 헬퍼
 * @param payload - { birthDate: "YYYY-MM-DD", stockName: "string" }
 * @param options - { signal } 등 fetch 옵션(취소 등)을 위한 확장 포인트
 * @returns { result: string }
 */
export async function postSajuCompatibility(
  payload: SajuCompatibilityRequest,
  options?: { signal?: AbortSignal },
): Promise<SajuCompatibilityResponse> {
  // 프록시 라우트로 POST
  const res = await fetch(SAJU_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),        // 객체 → JSON 문자열로 직렬화
    signal: options?.signal,              // 필요 시 요청 취소(AbortController) 지원
  });

  // HTTP 에러면 상세 메시지 뽑아서 예외로 던짐
  if (!res.ok) {
    // 서버가 JSON / 텍스트 어떤 형식으로 줄지 모르니 방어적으로 처리
    let detail = "";
    try {
      const data = await res.json();
      detail = (data?.error as string) ?? JSON.stringify(data);
    } catch {
      detail = await res.text();
    }
    throw new Error(`POST ${SAJU_API} ${res.status} ${res.statusText}: ${detail}`);
  }

  // 성공이면 명세 타입으로 응답 파싱
  const data = (await res.json()) as SajuCompatibilityResponse;
  return data;
}

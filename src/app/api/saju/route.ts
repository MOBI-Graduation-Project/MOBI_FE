import { SajuCompatibilityRequest, SajuCompatibilityResponse } from "@/types/saju";

//POST /api/saju
// 프론트엔드에서 들어온 사주궁합 요청을 백엔드로 전달하고 받은 응답을 가공하여 되돌려주는 라우트 핸들러.
export async function POST(req: Request) {
  try {
    // 클라이언트에서 보낸 JSON 바디 파싱
    const body = (await req.json()) as SajuCompatibilityRequest;

    // !!!추가!!!: 개발용 목 스위치 → /api/saju?mock=1 호출 시 가짜 응답 반환
    const url = new URL(req.url); // 요청 주소를 객체 형태로 파싱
    if (url.searchParams.get("mock") === "1") {
    
      // 임시 가짜 응답 (백엔드 연결 없이 테스트용)
      return new Response(
        JSON.stringify({
          result:
            "MOCK 결과: 금(金)·토(土) 기운의 상생 구조. 전반적으로 안정적이며, 단기 변동성에는 유연한 대응이 필요합니다.",
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      );
    }
    // !!!추가 끝!!!

    // 가장 기본적인 필수값 체크 (런타임 안전장치)
    const { birthDate, stockName } = body ?? {};
    if (!birthDate || !stockName) {
      return new Response(
        JSON.stringify({ error: "birthDate와 stockName은 필수입니다." }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    // 실제 백엔드 API 주소 만들기 (환경변수 사용)
    const base = process.env.NEXT_PUBLIC_API_BASE_URL;
    const upstreamUrl = `${base}/api/saju/compatibility`;

    // 백엔드로 그대로 전달 (프록시)
    const upstreamRes = await fetch(upstreamUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // 백엔드 명세: { birthDate: "YYYY-MM-DD", stockName: "string" }
      body: JSON.stringify({ birthDate, stockName }),
    });

    // 백엔드에서 받은 결과를 텍스트로 우선 받기-  JSON이 아닌 에러 문자열일 수 있으므로
    const raw = await upstreamRes.text();

    // 상태코드가 실패면, 받은 본문 그대로 프록시하여 에러 전달
    if (!upstreamRes.ok) {
      return new Response(raw || JSON.stringify({ error: "Upstream Error" }), {
        status: upstreamRes.status,
        headers: { "Content-Type": upstreamRes.headers.get("Content-Type") ?? "application/json" },
      });
    }

    // 성공인 경우 JSON 파싱을 시도 (명세상 { result: string })
    let data: SajuCompatibilityResponse;
    try {
      data = JSON.parse(raw) as SajuCompatibilityResponse;
    } catch {
      // 혹시 백엔드가 JSON이 아닌 걸 돌려줬다면 안전하게 포장
      data = { result: raw };
    }

    // 최종 응답
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    // 우리 라우트 내부 예외 처리- 이 라우트 자체에서 발생한 예외는 500으로 응답
    console.error("[/api/saju] Route Error:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

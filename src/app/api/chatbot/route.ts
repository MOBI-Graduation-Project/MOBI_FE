import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // 개발용 목 스위치: /api/chatbot?mock=1
    const url = new URL(req.url);
    if (url.searchParams.get("mock") === "1") {
      const body = await req.json().catch(() => ({}));
      const text = (body?.text as string) ?? "질문이 비어있어요.";
      return new Response(JSON.stringify({ text: `MOCK 응답: ${text}에 대한 답변입니다.` }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    //  프론트가 보낸 바디 그대로 읽기
    const body = await req.json(); // { text: string } 기대

    // 업스트림 URL (백엔드 스웨거 기준)
    const base = process.env.NEXT_PUBLIC_API_BASE_URL;
    const upstream = `${base}/chatbot`;

    // 클라이언트의 Authorization 헤더를 그대로 전달(있다면)
    const auth = req.headers.get("authorization") ?? undefined;

    const upstreamRes = await fetch(upstream, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(auth ? { Authorization: auth } : {}),
      },
      body: JSON.stringify(body),
    });

    // 실패면 그대로 에러 전달
    const raw = await upstreamRes.text();
    if (!upstreamRes.ok) {
      return new Response(raw || JSON.stringify({ error: "Upstream Error" }), {
        status: upstreamRes.status,
        headers: {
          "Content-Type": upstreamRes.headers.get("Content-Type") ?? "application/json",
        },
      });
    }

    // 백엔드가 string만 줄 수도 있어가지고 → 객체로 표준화
    let data: unknown;
    try {
      data = JSON.parse(raw);
    } catch {
      data = { text: raw };
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("[/api/chatbot] error", e);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

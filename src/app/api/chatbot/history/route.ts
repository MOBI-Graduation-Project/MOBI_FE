import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);

    // MOCK (간단하게 대화)
    if (url.searchParams.get("mock") === "1") {
      const mock = [
        { content: "안녕?", isBot: false, sentAt: "2025-09-25T00:50:11" },
        { content: "안녕하세요! 무엇을 도와드릴까요?", isBot: true,  sentAt: "2025-09-25T00:50:12" },
        { content: "스프링 부트가 뭐야?", isBot: false, sentAt: "2025-09-25T00:50:45" },
        { content: "자바 기반 웹 앱 프레임워크입니다.", isBot: true,  sentAt: "2025-09-25T00:50:46" },
      ];
      return new Response(JSON.stringify(mock), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    const base = process.env.NEXT_PUBLIC_API_BASE_URL!;
    const upstream = `${base}/chatbot/history`;
    const auth = req.headers.get("authorization") ?? undefined;

    const upstreamRes = await fetch(upstream, {
      method: "GET",
      headers: {
        ...(auth ? { Authorization: auth } : {}),
      },
    });

    const raw = await upstreamRes.text();
    if (!upstreamRes.ok) {
      return new Response(raw || JSON.stringify({ error: "Upstream Error" }), {
        status: upstreamRes.status,
        headers: {
          "Content-Type": upstreamRes.headers.get("Content-Type") ?? "application/json",
        },
      });
    }

    // 백이 배열/JSON을 준다고 가정하고 그대로 전달
    return new Response(raw, {
      status: 200,
      headers: { "Content-Type": upstreamRes.headers.get("Content-Type") ?? "application/json" },
    });
  } catch (e) {
    console.error("[/api/chatbot/history] error", e);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

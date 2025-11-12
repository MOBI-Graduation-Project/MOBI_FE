import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const url = new URL(req.url);

    // --- MOCK MODE ---
    if (url.searchParams.get("mock") === "1") {
      const body = await req.json().catch(() => ({}));
      const question = (body?.text as string) ?? "질문이 비어있어요.";

      const stream = new ReadableStream({
        async start(controller) {
          const chunks = [
            `MOCK 응답 시작: "${question}"\n`,
            "스프링 부트는 자바 기반의 애플리케이션을 빠르게 만들 수 있도록 돕는 프레임워크로, ",
            "의존성 관리, 내장 서버, 스타터 의존성 등을 제공합니다.",
          ];
          for (const c of chunks) {
            controller.enqueue(encode(`data: ${c}\n\n`)); // SSE 포맷
            await delay(200);
          }
          controller.enqueue(encode("event: done\ndata: [END]\n\n"));
          controller.close();
        },
      });

      return new Response(stream, sseHeaders());
    }

    // --- REAL UPSTREAM ---
    const base = process.env.NEXT_PUBLIC_API_BASE_URL!;
    const upstream = `${base}/chatbot/stream`;
    const auth = req.headers.get("authorization") ?? undefined;
    const body = await req.json().catch(() => ({}));

    const upstreamRes = await fetch(upstream, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(auth ? { Authorization: auth } : {}),
      },
      body: JSON.stringify(body),
    });

    const ct = upstreamRes.headers.get("Content-Type") || "";

    // 백이 SSE를 그대로 준다면 -> 그대로 파이프
    if (ct.includes("text/event-stream") && upstreamRes.body) {
      const { readable, writable } = new TransformStream();
      upstreamRes.body.pipeTo(writable);
      return new Response(readable, sseHeaders());
    }

    // 백이 JSON/배열(예: ["str","str2"])로 준다면 -> SSE로 변환해서 흘려주기
    const raw = await upstreamRes.text();
    if (!upstreamRes.ok) {
      return new Response(raw || JSON.stringify({ error: "Upstream Error" }), {
        status: upstreamRes.status,
        headers: { "Content-Type": ct || "application/json" },
      });
    }

    let arr: unknown;
    try {
      arr = JSON.parse(raw);
    } catch {
      // 그냥 문자열이라면 한 번에 data로 흘림
      return sseFromArray([raw]);
    }

    if (Array.isArray(arr)) {
      return sseFromArray(arr.map(String));
    }

    // 객체였다면 text 필드 있으면 그걸로, 없으면 통째로
    const text = (arr as any)?.text ?? JSON.stringify(arr);
    return sseFromArray([String(text)]);
  } catch (e) {
    console.error("[/api/chatbot/stream] error", e);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

function sseHeaders() {
  return {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  };
}
function encode(s: string) {
  return new TextEncoder().encode(s);
}
function delay(ms: number) {
  return new Promise(r => setTimeout(r, ms));
}
function sseFromArray(chunks: string[]) {
  const stream = new ReadableStream({
    async start(controller) {
      for (const c of chunks) {
        controller.enqueue(encode(`data: ${c}\n\n`));
        await delay(80);
      }
      controller.enqueue(encode("event: done\ndata: [END]\n\n"));
      controller.close();
    },
  });
  return new Response(stream, sseHeaders());
}

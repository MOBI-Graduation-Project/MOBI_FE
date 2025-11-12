export type ChatMessage = {
  content: string;
  isBot: boolean; // 챗봇 메시지 여부
  sentAt: string; // ISO 
};

//일반 챗봇: 한 번에 답변 받기 
export async function postChat(
  text: string,
  opts: { mock?: boolean; signal?: AbortSignal } = {},
) {
  const { mock = false, signal } = opts;
  const url = `/api/chatbot${mock ? "?mock=1" : ""}`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
    signal,
  });

  if (!res.ok) {
    // 서버에서 에러 메시지를 문자열로 보낼 수도 있으므로 text() 먼저
    throw new Error(await res.text());
  }

  // 표준화: { text: string } 형태로 받는다고 가정
  const data = (await res.json()) as { text: string };
  return data; // { text }
}

// 스트리밍 챗봇: 조각조각 들어오는 SSE를 generator로 제공
export async function* postChatStream(
  text: string,
  opts: { mock?: boolean; signal?: AbortSignal } = {},
) {
  const { mock = false, signal } = opts;
  const url = `/api/chatbot/stream${mock ? "?mock=1" : ""}`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
    signal,
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }

  const reader = res.body?.getReader();
  if (!reader) return;

  const decoder = new TextDecoder();
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });

      // SSE 포맷 파싱: 'data: ...' 라인만 꺼내서 yield
      for (const line of chunk.split("\n")) {
        const trimmed = line.trim();
        if (!trimmed || !trimmed.startsWith("data:")) continue;
        const payload = trimmed.slice("data:".length).trim();
        yield payload; // 조각 문자열 한 덩어리
      }
    }
  } finally {
    reader.releaseLock();
  }
}

//이전 대화 내역 조회 
export async function getChatHistory(
  opts: { mock?: boolean; signal?: AbortSignal } = {},
) {
  const { mock = false, signal } = opts;
  const url = `/api/chatbot/history${mock ? "?mock=1" : ""}`;

  const res = await fetch(url, { signal });
  if (!res.ok) {
    throw new Error(await res.text());
  }
  const data = (await res.json()) as ChatMessage[];
  return data;
}

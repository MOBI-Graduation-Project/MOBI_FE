import { apiClient } from "./apiClient";

export interface ChatbotRequest {
  userId: string;
  content: string;
  type: "USER";
}

// 챗봇 응답 일단 스트리밍 말고 통으로
export const sendChatbotMessage = async (
  content: string,
  userId: string,
): Promise<string> => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) throw new Error("로그인 필요");

  try {
    const res = await apiClient.post<string>(
      "/chatbot",
      {
        userId,
        content,
        type: "USER",
      } as ChatbotRequest,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        responseType: "text", // text/plain 받기
      },
    );

    return res.data; // 챗봇응답 (스트링)
  } catch (error) {
    console.error("sendChatbotMessage Error:", error);
    throw error;
  }
};

// 스트리밍용 헬퍼
interface ChatbotStreamOptions {
  userId: string;
  content: string;
  onChunk: (chunk: string) => void;
}

export const streamChatbotMessage = async ({
  userId,
  content,
  onChunk,
}: ChatbotStreamOptions): Promise<void> => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) throw new Error("로그인 필요");

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!baseUrl)
    throw new Error("NEXT_PUBLIC_API_BASE_URL이 설정되지 않았습니다.");

  const res = await fetch(`${baseUrl}/chatbot`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "text/event-stream", //  SSE 응답 받기
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      userId,
      content,
      type: "USER",
    } satisfies ChatbotRequest),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `챗봇 스트리밍 요청 실패 (status: ${res.status})${text ? ` - ${text}` : ""}`,
    );
  }

  // 혹시 백엔드가 아직 stream이 아니라 text로 줄 수도 있으니 fallback
  if (!res.body) {
    const full = await res.text();
    onChunk(full);
    return;
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder("utf-8");
  let buffer = "";

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value, { stream: true });
    buffer += chunk;

    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed.startsWith("data:")) continue;

      const dataText = trimmed.replace(/^data:\s?/, "");

      if (!dataText) continue;
      if (dataText === "[DONE]") return;
      onChunk(dataText);
    }
  }
};

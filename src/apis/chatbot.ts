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

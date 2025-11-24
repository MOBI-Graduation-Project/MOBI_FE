import { useUserStore } from "@/stores/userStore";

import { apiClient } from "./apiClient";

export interface ChatbotRequest {
  userId: string;
  content: string;
  type: "USER";
}

export const sendChatbotMessage = async (
  content: string,
  userId: string,
): Promise<string> => {
  const accessToken = useUserStore.getState().accessToken;
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
        responseType: "text",
      },
    );

    return res.data;
  } catch (error) {
    console.error("sendChatbotMessage Error:", error);
    throw error;
  }
};

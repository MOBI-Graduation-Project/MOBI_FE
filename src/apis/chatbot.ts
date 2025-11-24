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
  try {
    const res = await apiClient.post<string>(
      "/chatbot",
      {
        userId,
        content,
        type: "USER",
      } as ChatbotRequest,
      {
        responseType: "text",
      },
    );

    return res.data;
  } catch (error) {
    console.error("sendChatbotMessage Error:", error);
    throw error;
  }
};

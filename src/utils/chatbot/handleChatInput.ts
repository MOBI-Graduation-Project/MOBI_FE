import { Message } from "@/types/chatMessage";

const getCurrentTime = () => {
  return new Date().toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

export const createUserMessage = (input: string): Message => {
  return {
    isBot: false,
    content: `${input}`,
    sentAt: getCurrentTime(),
  };
};

export const createBotMessage = (content: string): Message => {
  return {
    isBot: true,
    content,
    sentAt: getCurrentTime(),
  };
};

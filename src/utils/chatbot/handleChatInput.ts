import { Message } from "@/types/chatMessage";

export const createUserMessage = (input: string): Message => {
  return {
    isBot: false,
    content: `${input}`,
    sentAt: Date(),
  };
};

export const createBotMessage = (content: string): Message => {
  return {
    isBot: true,
    content,
    sentAt: Date(),
  };
};

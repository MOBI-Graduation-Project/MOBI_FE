export type SenderType = "user" | "bot";

export interface ChatMessage {
  id: number;
  sender: SenderType;
  text: string;
  time: string;
}

const getCurrentTime = () => {
  return new Date().toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  });
};

export const createUserMessage = (input: string): ChatMessage => {
  return {
    id: Date.now(),
    sender: "user",
    text: `${input}`,
    time: getCurrentTime(),
  };
};

export const createBotMessage = (text: string): ChatMessage => {
  return {
    id: Date.now() + 1,
    sender: "bot",
    text,
    time: getCurrentTime(),
  };
};

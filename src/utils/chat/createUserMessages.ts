import { Message } from "@/types/chatMessage";

export const createUserMessage = (text: string, roomId: number): Message => ({
  roomId,
  senderId: 1,
  senderNickname: "사용자",
  content: text,
  sentAt: new Date().toISOString(),
  read: true,
});

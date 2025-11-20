import { useUserStore } from "@/stores/userStore";

import { Message } from "@/types/chatMessage";

const senderId = useUserStore.getState().memberId || undefined;
const senderNickname = useUserStore.getState().nickname || "사용자";

export const createUserMessage = (text: string, roomId: number): Message => ({
  roomId,
  senderId: senderId,
  senderNickname: senderNickname,
  content: text,
  sentAt: new Date().toISOString(),
  read: true,
});

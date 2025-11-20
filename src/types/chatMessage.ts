export interface Message {
  roomId?: number; // 채팅에서만 사용
  senderId?: number; // 채팅에서만 사용
  messageId?: number; // 채팅에서만사용
  senderNickname?: string; //채팅에서만 사용
  isBot?: boolean; //챗봇에서만 사용
  profileUrl?: string | null; //채팅에서만 사용
  content: string;
  sentAt: string;
  isRead?: boolean; //채팅에서만 사용
  type?: string;
  readerId?: number;
}

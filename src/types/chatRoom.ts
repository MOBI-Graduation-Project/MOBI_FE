export interface ChatRoom {
  roomId: number;
  roomName: string;
  lastMessage: string;
  lastMessageSentAt: string | null;
  unreadCount: number;
  otherMemberProfileImage: string;
}

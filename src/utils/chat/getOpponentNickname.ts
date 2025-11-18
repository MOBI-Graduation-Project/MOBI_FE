import { useUserStore } from "@/stores/userStore";

import chatData from "@/mock/chatting.json";

interface opponentNicknameProps {
  roomId: number;
}
export const getOpponentNickname = ({ roomId }: opponentNicknameProps) => {
  const myId = useUserStore.getState().memberId;
  return chatData.chatData.find(
    chat => chat.roomId === roomId && chat.senderId !== myId,
  )?.senderNickname;
};

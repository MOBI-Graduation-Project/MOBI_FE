import chatData from "@/mock/chatting.json";

interface opponentNicknameProps {
  roomId: number;
}
export const getOpponentNickname = ({ roomId }: opponentNicknameProps) => {
  const MY_ID = 1;
  return chatData.chatData.find(
    chat => chat.roomId === roomId && chat.senderId !== MY_ID,
  )?.senderNickname;
};

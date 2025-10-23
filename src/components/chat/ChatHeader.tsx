import { useParams, useRouter } from "next/navigation";

import Backbtn from "@/assets/chatbot/backbtn.svg";

import chattingData from "@/mock/chatting.json";

const ChatHeader = () => {
  const MY_ID = 1; // 내 mock Id값
  const router = useRouter();
  const params = useParams();
  const targetRoomId = Number(params.roomId);

  const opponentNickname = chattingData.chats.find(
    chat => chat.roomId === targetRoomId && chat.senderId !== MY_ID,
  )?.senderNickname;

  return (
    <div className="bg-yellow-10 fixed flex h-[100px] w-full flex-row items-center gap-5 pl-[30px]">
      <button onClick={() => router.back()} className="cursor-pointer">
        <Backbtn />
      </button>
      <div className="text-heading2 text-brown text-stroke-white font-[geekble]">
        {opponentNickname}
      </div>
    </div>
  );
};
export default ChatHeader;

import { useParams, useRouter } from "next/navigation";

import Backbtn from "@/assets/chatbot/backbtn.svg";

import { getOpponentNickname } from "@/utils/chat/getOpponentNickname";

const ChatHeader = () => {
  const router = useRouter();
  const params = useParams();
  const targetRoomId = Number(params.roomId);

  const opponentNickname = getOpponentNickname({
    roomId: targetRoomId,
  });

  return (
    <div className="bg-yellow-10 fixed flex h-[100px] w-full flex-row items-center gap-5 pl-[30px]">
      <button onClick={() => router.back()} className="cursor-pointer">
        <Backbtn />
      </button>
      <div className="text-heading2 text-brown text-stroke-white font-[geekble]">
        {opponentNickname ?? "주식 챗봇 모비"}
      </div>
    </div>
  );
};
export default ChatHeader;

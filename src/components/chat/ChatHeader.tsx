import { useParams, useRouter } from "next/navigation";

import Backbtn from "@/assets/chatbot/backbtn.svg";

import users from "@/mock/user.json";

import { getUserNickname } from "@/utils/chat/getUserNickname";

const ChatHeader = () => {
  const router = useRouter();
  const params = useParams();
  const senderId = Number(params.roomId);
  const senderNickname = getUserNickname(senderId, users);
  return (
    <div className="bg-yellow-10 fixed flex h-[100px] w-full flex-row items-center gap-5 pl-[30px]">
      <button onClick={() => router.back()} className="cursor-pointer">
        <Backbtn />
      </button>
      <div className="text-heading2 text-brown text-stroke-white font-[geekble]">
        {senderNickname}
      </div>
    </div>
  );
};
export default ChatHeader;

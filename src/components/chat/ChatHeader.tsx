import { useRouter } from "next/navigation";

import Backbtn from "@/assets/chatbot/backbtn.svg";

interface ChatHeaderProps {
  roomName?: string;
}
const ChatHeader = ({ roomName }: ChatHeaderProps) => {
  const router = useRouter();

  return (
    <div className="bg-yellow-10 fixed flex h-[60px] w-full flex-row items-center gap-5 pl-[15px] md:h-[100px] md:pl-[30px]">
      <button onClick={() => router.back()} className="cursor-pointer">
        <Backbtn className="h-[30px] w-[30px] md:h-[40px] md:w-[40px]" />
      </button>
      <div className="md:text-heading2 text-body text-brown text-stroke-white font-[geekble]">
        {roomName ?? "주식 챗봇 모비"}
      </div>
    </div>
  );
};
export default ChatHeader;

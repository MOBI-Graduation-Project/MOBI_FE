"use client";

import { useParams } from "next/navigation";

import ChatHeader from "@/components/chat/ChatHeader";
import ChatSection from "@/components/chat/ChatSection";

import chatData from "@/mock/chatting.json";

const ChattingRoom = () => {
  const params = useParams();
  const roomId = Number(params.roomId);
  const roomMessages = chatData.chatData.filter(
    message => message.roomId === roomId,
  );
  return (
    <div className="bg-yellow-10 h-screen w-full">
      <ChatHeader />
      <div className="px-[10px] pt-[110px]">
        <ChatSection messages={roomMessages} />
      </div>
      {/* <InputBottomBar /> */}
    </div>
  );
};
export default ChattingRoom;

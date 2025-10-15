"use client";

import { useParams } from "next/navigation";

import ChatHeader from "@/components/chat/ChatHeader";
import InputBottomBar from "@/components/chat/InputBottomBar";

const ChattingRoom = () => {
  const { roomId } = useParams();

  return (
    <div className="bg-yellow-10 h-screen w-full">
      <ChatHeader />
      ChattingRoom {roomId}
      <InputBottomBar />
    </div>
  );
};
export default ChattingRoom;

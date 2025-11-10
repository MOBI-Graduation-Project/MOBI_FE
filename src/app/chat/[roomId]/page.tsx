"use client";

import { useParams } from "next/navigation";

import { useState } from "react";

import ChatHeader from "@/components/chat/ChatHeader";
import ChatSection from "@/components/chat/ChatSection";
import InputBottomBar from "@/components/chat/InputBottomBar";

import chatData from "@/mock/chatting.json";

import { Message } from "@/types/chatMessage";

import { createUserMessage } from "@/utils/chat/createUserMessages";

const ChattingRoom = () => {
  const params = useParams();
  const roomId = Number(params.roomId);
  const [messages, setMessages] = useState<Message[]>(
    chatData.chatData.filter(message => message.roomId === roomId),
  );

  const handleSend = (text: string) => {
    const userMsg = createUserMessage(text, roomId);
    setMessages(prev => [...prev, userMsg]);
  };

  return (
    <div className="bg-yellow-10 h-screen w-full">
      <ChatHeader />
      <div className="bg-yellow-10 px-[10px] pt-[110px] pb-[150px]">
        <ChatSection messages={messages} />
      </div>
      <InputBottomBar onSend={handleSend} />
    </div>
  );
};
export default ChattingRoom;

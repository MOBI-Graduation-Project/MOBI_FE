"use client";

import { useParams } from "next/navigation";

import { useEffect, useState } from "react";

import { getChatRooms, getMessages } from "@/apis/chat";

import ChatHeader from "@/components/chat/ChatHeader";
import ChatSection from "@/components/chat/ChatSection";
import InputBottomBar from "@/components/chat/InputBottomBar";

import { Message } from "@/types/chatMessage";

import { createUserMessage } from "@/utils/chat/createUserMessages";

const ChattingRoom = () => {
  const params = useParams();
  const roomId = Number(params.roomId);
  const [messages, setMessages] = useState<Message[]>([]);
  const [roomName, setRoomName] = useState<string>("");
  const [, setLoading] = useState(true);

  const getRoomName = async () => {
    try {
      const chatRooms = await getChatRooms();
      const room = chatRooms.find(r => r.roomId === roomId);
      if (room) setRoomName(room.roomName);
    } catch (error) {
      console.error("roomName 불러오기 실패:", error);
    }
  };

  const fetchMessages = async () => {
    try {
      const result = await getMessages(roomId); // 서버 API 호출
      setMessages(result); // result: Message[]
    } catch (error) {
      console.error("메시지 불러오기 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRoomName();
    fetchMessages();
  }, [roomId]);

  const handleSend = (text: string) => {
    const userMsg = createUserMessage(text, roomId);
    setMessages(prev => [...prev, userMsg]);
  };

  return (
    <div className="bg-yellow-10 h-screen w-full">
      <ChatHeader roomName={roomName} />
      <div className="bg-yellow-10 px-[10px] pt-[110px] pb-[150px]">
        <ChatSection messages={messages} opponentNickname={roomName} />
      </div>
      <InputBottomBar onSend={handleSend} />
    </div>
  );
};
export default ChattingRoom;

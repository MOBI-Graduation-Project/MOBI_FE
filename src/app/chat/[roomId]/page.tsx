"use client";

import { useParams } from "next/navigation";

import { useEffect, useState } from "react";

import { getChatRooms, getMessages } from "@/apis/chat";

import ChatHeader from "@/components/chat/ChatHeader";
import ChatSection from "@/components/chat/ChatSection";
import InputBottomBar from "@/components/chat/InputBottomBar";

import { useChatSocket } from "@/hooks/useChatSocket";

import { Message } from "@/types/chatMessage";

const ChattingRoom = () => {
  const params = useParams();
  const roomId = Number(params.roomId);
  const [messages, setMessages] = useState<Message[]>([]);
  const [roomName, setRoomName] = useState<string>("");

  const { sendMessage } = useChatSocket(roomId, msg => {
    if (msg.type === "MESSAGES_READ") {
      setMessages(prev =>
        prev.map(m => {
          if (m.senderId !== msg.readerId) {
            return { ...m, isRead: true };
          }
          return m;
        }),
      );
      return;
    }

    // 일반 메시지 수신
    setMessages(prev => [...prev, msg]);
  });

  //  기존 메시지 불러오기
  useEffect(() => {
    const fetchData = async () => {
      const list = await getChatRooms();
      const room = list.find(r => r.roomId === roomId);
      setRoomName(room?.roomName ?? "");

      const history = await getMessages(roomId);
      setMessages(history);
    };
    fetchData();
  }, [roomId]);

  //  메시지 전송
  const handleSend = (text: string) => {
    sendMessage(text);
  };
  return (
    <div className="bg-yellow-10 h-screen w-full">
      <ChatHeader roomName={roomName} />
      <div className="bg-yellow-10 px-[10px] pt-[80px] pb-[70px] md:pt-[110px] md:pb-[150px]">
        <ChatSection messages={messages} opponentNickname={roomName} />
      </div>
      <InputBottomBar onSend={handleSend} />
    </div>
  );
};
export default ChattingRoom;

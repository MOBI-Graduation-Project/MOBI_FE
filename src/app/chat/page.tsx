"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

import { getChatRooms } from "@/apis/chat";

import BottomBar from "@/components/common/bottomBar";
import Header from "@/components/common/header";

import type { ChatRoom } from "@/types/chatRoom";

import { formatTime } from "@/utils/chat/formatTime";

const ChatList = () => {
  const router = useRouter();

  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  const [, setLoading] = useState(true);

  const handleRoomClick = (roomId: number) => {
    router.push(`/chat/${roomId}`);
  };

  const fetchChatRoomList = async () => {
    try {
      const res = await getChatRooms();
      setRooms(res);
      return rooms;
    } catch (error) {
      console.error("getChatRooms Error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChatRoomList();
  }, []);

  return (
    <div className="min-h-screen w-full">
      <Header />
      <div className="mt-[115px] mb-[99px]">
        <div className="flex flex-col gap-4 px-[10px] py-[4px]">
          {rooms.map(room => (
            <button
              key={room.roomId}
              onClick={() => handleRoomClick(room.roomId)}
              className="flex items-center justify-between rounded-2xl bg-white/90 px-[20px] py-5 shadow-md transition-all hover:bg-yellow-50"
            >
              <div className="flex flex-row items-center gap-4">
                <Image
                  src={room.otherMemberProfileImage}
                  alt={room.roomName}
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
                <div className="text-lab2 text-brown font-[geekble]">
                  {room.roomName}
                </div>
                <div className="text-cap1 font-[pretendard] text-gray-600">
                  {room.lastMessage}
                </div>
              </div>

              <div
                className={`flex w-[150px] flex-row items-center ${room.unreadCount > 0 ? "justify-between" : "justify-end"}`}
              >
                {room.unreadCount > 0 && (
                  <div className="bg-red-dark text-cap1 flex h-7 w-7 items-center justify-center rounded-full font-[pretendard] text-white">
                    {room.unreadCount}
                  </div>
                )}
                <div className="text-cap1 font-[pretendard] text-gray-500">
                  {formatTime(room.lastMessageSentAt)}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <BottomBar />
    </div>
  );
};
export default ChatList;

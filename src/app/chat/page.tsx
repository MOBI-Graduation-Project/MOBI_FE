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
      <div className="mt-[55px] mb-[72px] md:mt-[115px] md:mb-[99px]">
        <div className="flex flex-col gap-4 px-[7px] md:px-[10px]">
          {rooms.map(room => (
            <button
              key={room.roomId}
              onClick={() => handleRoomClick(room.roomId)}
              className="flex items-center justify-between rounded-2xl bg-white/90 p-[10px] shadow-md transition-all hover:bg-yellow-50 md:px-[20px]"
            >
              <div className="flex flex-row items-center gap-4">
                <div className="h-[35px] w-[35px] md:h-[40px] md:w-[40px]">
                  <Image
                    src={room.otherMemberProfileImage}
                    alt={room.roomName}
                    width={40}
                    height={40}
                    className="h-full w-full rounded-full object-cover"
                  />
                </div>
                <div className="text-lab2 text-brown font-[geekble] whitespace-nowrap">
                  {room.roomName}
                </div>
                <div className="text-cap1 overflow-hidden font-[pretendard] whitespace-nowrap text-gray-600">
                  {room.lastMessage}
                </div>
              </div>

              <div
                className={`flex w-[150px] flex-row items-center ${room.unreadCount > 0 ? "justify-between" : "justify-end gap-[5px] md:justify-between"}`}
              >
                {room.unreadCount > 0 && (
                  <div className="bg-red-dark md:text-cap1 text-cap3 flex h-5 w-5 items-center justify-center rounded-full font-[pretendard] text-white md:h-7 md:w-7">
                    {room.unreadCount}
                  </div>
                )}
                <div className="md:text-cap1 text-cap3 font-[pretendard] text-gray-500">
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

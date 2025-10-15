"use client";

import { useRouter } from "next/navigation";

import BottomBar from "@/components/common/bottomBar";
import Header from "@/components/common/header";

import rooms from "@/mock/chatRoomList.json";

import { formatTime } from "@/utils/chat/formatTime";

const ChatList = () => {
  const router = useRouter();
  const handleRoomClick = (roomId: number) => {
    router.push(`/chat/${roomId}`);
  };
  return (
    <div
      className="min-h-screen w-full overflow-y-auto bg-cover bg-center bg-repeat-y"
      style={{ backgroundImage: "url('/svgs/bgImage.jpg')" }}
    >
      <Header />
      <div className="mt-[129px] mb-[99px]">
        <div className="flex flex-col gap-4 px-[10px] py-[4px]">
          {rooms.map(room => (
            <button
              key={room.roomId}
              onClick={() => handleRoomClick(room.roomId)}
              className="flex items-center justify-between rounded-2xl bg-white/90 px-[20px] py-5 shadow-md transition-all hover:bg-yellow-50"
            >
              <div className="flex flex-row items-center gap-4">
                <img
                  src={room.otherMemberProfileImage}
                  alt={room.roomName}
                  className="h-14 w-14 rounded-full object-cover"
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

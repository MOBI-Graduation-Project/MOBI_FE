import Image from "next/image";

import { useEffect, useRef } from "react";

import { useUserStore } from "@/stores/userStore";

import { Message } from "@/types/chatMessage";

import { formatTime } from "@/utils/chat/formatTime";

interface ChatSectionProps {
  messages?: Message[];
  opponentNickname?: string; //채팅방에서만 사용
}
const ChatSection = ({ messages, opponentNickname }: ChatSectionProps) => {
  const myId = useUserStore(state => state.memberId);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 space-y-4 pr-2">
      {messages?.map(message => {
        const sendAt = formatTime(message.sentAt);
        const key = `${message.senderId}-${message.sentAt}`;

        return (
          <div
            key={key}
            className={`flex w-full ${message.senderId === myId || message.isBot === false ? "justify-end" : "justify-start"}`}
          >
            <div className="flex items-end gap-2">
              {/* 내가 보낸 채팅 */}
              {message.senderId === myId || message.isBot === false ? (
                <>
                  <div className="flex flex-row items-end justify-end gap-2">
                    <div className="text-cap1 font-[pretendard] whitespace-nowrap text-gray-500">
                      {sendAt}
                    </div>
                    <div className="text-cap1-med bg-yellow max-w-[80%] rounded-xl px-4 py-2 font-[pretendard] break-words">
                      {message.content}
                    </div>
                  </div>
                </>
              ) : message.isBot === true ? (
                <div className="flex items-start gap-2">
                  <div className="text-lab1 text-brown bg-gray-10 flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-full font-[geekble]">
                    모비
                  </div>
                  <div className="flex flex-row items-end gap-2">
                    <div className="text-cap1-med max-w-[80%] rounded-xl bg-white px-4 py-2 font-[pretendard] break-words">
                      {message.content}
                    </div>
                    <div className="text-cap1 font-[pretendard] whitespace-nowrap text-gray-500">
                      {sendAt}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-2">
                  <div className="flex shrink-0 items-center justify-center">
                    {message.profileUrl?.trim() ? (
                      <Image
                        src={message.profileUrl}
                        alt={opponentNickname as string}
                        width={50}
                        height={50}
                        className="rounded-full object-cover"
                      />
                    ) : (
                      <div className="bg-brown-dark h-[50px] w-[50px] rounded-full" />
                    )}
                  </div>
                  <div className="flex flex-row items-end gap-2">
                    <div className="text-cap1-med max-w-[80%] rounded-xl bg-white px-4 py-2 font-[pretendard] break-words">
                      {message.content}
                    </div>
                    <div className="text-cap1 font-[pretendard] whitespace-nowrap text-gray-500">
                      {sendAt}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
      <div ref={chatEndRef} />
    </div>
  );
};
export default ChatSection;

"use client";

import { useEffect, useState } from "react";

import EnterBtn from "@/assets/chatbot/enterbtn.svg";

import ChatHeader from "@/components/chat/ChatHeader";
import ChatbotButton from "@/components/chatbot/chatbotButton";

import { getButtonLog } from "@/utils/chatbot/getButtonLog";
import {
  ChatMessage,
  createBotMessage,
  createUserMessage,
} from "@/utils/chatbot/handleChatInput";

const Chatbot = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  useEffect(() => {
    // 첫 인사 메시지
    const welcome = createBotMessage("안녕하세요! 무엇을 도와드릴까요?");
    setMessages([welcome]);
  }, []);

  const handleSend = (text: string) => {
    const userMsg = createUserMessage(text);
    setMessages(prev => [...prev, userMsg]);
  };

  const handleInputSend = () => {
    if (!input.trim()) return;
    handleSend(input.trim());
    setInput("");
  };

  const handleButtonClick = (label: string) => {
    const userMsg = createUserMessage(label);
    const botMsg = createBotMessage(`현재 ${getButtonLog()} ${label}는`);
    setMessages(prev => [...prev, userMsg, botMsg]);
  };

  return (
    <div className="bg-yellow-10 h-screen w-full">
      {/*상단바*/}
      <ChatHeader />
      {/*채팅영역 */}
      <div className="flex flex-col px-[20px] pt-[100px] pb-[230px]">
        <div
          className="scrollbar-hide flex-1 space-y-3 overflow-y-auto pr-2"
          style={{ maxHeight: "calc(100vh - 110px - 230px)" }} // 100px 상단바 + 230px 하단바
        >
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className="flex max-w-[80%] items-end gap-2">
                {msg.sender === "user" ? (
                  <>
                    <div className="text-cap1-med whitespace-nowrap text-gray-500">
                      {msg.time}
                    </div>
                    <div className="text-cap1-sb bg-yellow rounded-xl px-4 py-2">
                      {msg.text}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-lab1 text-brown flex h-[50px] w-[50px] items-center justify-center rounded-full bg-[#D9D9D9] font-[geekble]">
                      모비
                    </div>
                    <div className="text-cap1-sb rounded-xl bg-white px-5 py-2">
                      {msg.text}
                    </div>
                    <div className="text-cap1-med whitespace-nowrap text-gray-500">
                      {msg.time}
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/*단축버튼 */}
      <div className="fixed bottom-[158px] left-1/2 -translate-x-1/2 transform">
        <ChatbotButton onButtonClick={handleButtonClick} />
      </div>
      {/*하단바*/}
      <div className="bg-brown fixed bottom-0 flex h-[116px] w-full items-center justify-center">
        <div className="font-pretendard bg-gray-10 flex h-[58px] w-full max-w-[1185px] items-center rounded-[30px] px-10">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleInputSend()}
            placeholder="궁금한 점을 물어보세요!"
            className="text-cap2/60 w-full font-[pretendard] outline-none"
          />
          {input.trim() && (
            <button className="cursor-pointer">
              <EnterBtn size={48} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default Chatbot;

"use client";

import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

import Backbtn from "@/assets/chatbot/backbtn.svg";
import EnterBtn from "@/assets/chatbot/enterbtn.svg";

import { getButtonLog } from "@/utils/chatbot/getButtonLog";
import {
  ChatMessage,
  createBotMessage,
  createUserMessage,
} from "@/utils/chatbot/handleChatInput";

import ChatbotButton from "@/components/chatbotButton";

const Chatbot = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const router = useRouter();
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
    const botMsg = createBotMessage(`현재 ${getButtonLog(label)} ${label}는`);
    setMessages(prev => [...prev, userMsg, botMsg]);
  };

  return (
    <div className="h-screen w-full bg-[#ffeebd]">
      {/*상단바*/}
      <div className="sticky flex h-[100px] flex-row items-center gap-5 pl-[30px]">
        <button onClick={() => router.back()} className="cursor-pointer">
          <Backbtn />
        </button>

        <div className="text-heading2 text-brown text-stroke-white font-[geekble]">
          주식 챗봇 모비
        </div>
      </div>

      {/*채팅영역 */}
      <div className="flex flex-col px-5 pt-[100px]">
        <div className="flex-1 space-y-3 overflow-y-auto">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className="flex max-w-[80%] items-end gap-2">
                {msg.sender === "user" ? (
                  <>
                    {/* 시간 왼쪽 */}
                    <div className="text-cap1-med whitespace-nowrap text-gray-500">
                      {msg.time}
                    </div>
                    {/* 말풍선 */}
                    <div
                      className="text-cap1-sb rounded-xl px-4 py-2"
                      style={{ backgroundColor: "#ffc414" }}
                    >
                      {msg.text}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-lab1 text-brown flex h-[50px] w-[50px] items-center justify-center rounded-full bg-[#D9D9D9] font-[geekble]">
                      모비
                    </div>
                    {/* 말풍선 */}
                    <div
                      className="text-cap1-sb rounded-xl px-5 py-2"
                      style={{ backgroundColor: "#ffffff" }}
                    >
                      {msg.text}
                    </div>
                    {/* 시간 오른쪽 */}
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
        <div className="font-pretendard flex h-[58px] w-full max-w-[1185px] items-center rounded-[30px] bg-[#EFEFEF] px-10">
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

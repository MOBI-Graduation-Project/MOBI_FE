"use client";

import { useEffect, useState } from "react";

import ChatHeader from "@/components/chat/ChatHeader";
import ChatSection from "@/components/chat/ChatSection";
import InputBottomBar from "@/components/chat/InputBottomBar";
import ChatbotButton from "@/components/chatbot/chatbotButton";

import { Message } from "@/types/chatMessage";

import { getButtonLog } from "@/utils/chatbot/getButtonLog";
import {
  createBotMessage,
  createUserMessage,
} from "@/utils/chatbot/handleChatInput";

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    // 첫 인사 메시지
    const welcome = createBotMessage("안녕하세요! 무엇을 도와드릴까요?");
    setMessages([welcome]);
  }, []);

  const handleSend = (text: string) => {
    const userMsg = createUserMessage(text);
    setMessages(prev => [...prev, userMsg]);
  };

  const handleButtonClick = (label: string) => {
    const userMsg = createUserMessage(label);
    const botMsg = createBotMessage(`현재 ${getButtonLog()} ${label}는`);
    setMessages(prev => [...prev, userMsg, botMsg]);
  };

  return (
    <div className="bg-yellow-10 scrollbar-hide h-screen w-full overflow-y-auto scroll-auto">
      {/*상단바*/}
      <ChatHeader />
      {/*채팅영역 */}
      <div className="pt-[110px] pb-[220px]">
        <ChatSection messages={messages} />
      </div>

      {/*단축버튼 */}
      <div className="fixed bottom-[158px] left-1/2 -translate-x-1/2 transform">
        <ChatbotButton onButtonClick={handleButtonClick} />
      </div>
      {/*하단바*/}
      <InputBottomBar onSend={handleSend} isChatBot />
    </div>
  );
};
export default Chatbot;

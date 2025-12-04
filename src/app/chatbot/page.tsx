"use client";

import { useEffect, useState } from "react";

import { useUserStore } from "@/stores/userStore";

import { sendChatbotMessage } from "@/apis/chatbot";

import ChatHeader from "@/components/chat/ChatHeader";
import ChatSection from "@/components/chat/ChatSection";
import InputBottomBar from "@/components/chat/InputBottomBar";
import ChatbotButton from "@/components/chatbot/chatbotButton";

import { Message } from "@/types/chatMessage";

import {
  createBotMessage,
  createUserMessage,
} from "@/utils/chatbot/handleChatInput";

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const memberId = useUserStore(state => state.memberId);

  useEffect(() => {
    // 첫 인사 메시지
    const welcome = createBotMessage("안녕하세요! 무엇을 도와드릴까요?");
    setMessages([welcome]);
  }, []);

  const sendToServer = async (text: string) => {
    if (!text.trim()) return;

    const userMsg = createUserMessage(text);
    setMessages(prev => [...prev, userMsg]);

    try {
      const userId = memberId ? String(memberId) : "anonymous";
      const botText = await sendChatbotMessage(text, userId);

      const botMsg = createBotMessage(botText);
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error("챗봇 API 호출 실패:", error);
      const errorMsg = createBotMessage(
        "죄송해요, 서버와 통신 중 오류가 발생했어요.\n잠시 후 다시 시도해 주세요.",
      );
      setMessages(prev => [...prev, errorMsg]);
    }
  };

  const handleSend = (text: string) => {
    void sendToServer(text);
  };

  const handleButtonClick = (label: string) => {
    void sendToServer(label);
  };

  return (
    <div className="bg-yellow-10 scrollbar-hide h-screen w-full overflow-y-auto scroll-auto">
      {/*상단바*/}
      <ChatHeader />
      {/*채팅영역 */}
      <div className="px-[10px] pt-[70px] pb-[130px] md:pt-[110px] md:pb-[220px]">
        <ChatSection messages={messages} />
      </div>

      {/*단축버튼 */}
      <div className="fixed bottom-[100px] left-1/2 -translate-x-1/2 transform md:bottom-[158px]">
        <ChatbotButton onButtonClick={handleButtonClick} />
      </div>
      {/*하단바*/}
      <InputBottomBar onSend={handleSend} isChatBot />
    </div>
  );
};
export default Chatbot;

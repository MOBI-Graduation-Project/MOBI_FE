"use client";

import { useEffect, useState, useRef } from "react"; // ★ useRef 추가

import ChatHeader from "@/components/chat/ChatHeader";
import ChatSection from "@/components/chat/ChatSection";
import InputBottomBar from "@/components/chat/InputBottomBar";
import ChatbotButton from "@/components/chatbot/chatbotButton";

//API 헬퍼 임포트
import { postChat, postChatStream } from "@/lib/api/chatbot";

import { Message } from "@/types/chatMessage";

import { getButtonLog } from "@/utils/chatbot/getButtonLog";
import {
  createBotMessage,
  createUserMessage,
} from "@/utils/chatbot/handleChatInput";

const USE_MOCK = true;     // 로그인 이전 테스트용 (실서버 붙일 땐 false)
const USE_STREAMING = false; // 스트리밍 모드 on/off

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);           // 로딩 상태
  const abortRef = useRef<AbortController | null>(null);   // 스트리밍 중지용

  useEffect(() => {
    // 첫 인사 메시지
    const welcome = createBotMessage("안녕하세요! 무엇을 도와드릴까요?");
    setMessages([welcome]);
  }, []);

  // 서버로 보내는 공통 함수 (일반/스트리밍 분기)
  const sendToServer = async (text: string) => {
    setLoading(true);
    abortRef.current = new AbortController();

    try {
      if (!USE_STREAMING) {
        // 일반 챗봇: 한 번에 응답 받기
        const res = await postChat(text, {
          mock: USE_MOCK,
          signal: abortRef.current.signal,
        });
        setMessages(prev => [...prev, createBotMessage(res.text)]);
      } else {
        // 스트리밍 챗봇: 조각조각 누적
        let acc = "";
        // 우선 빈 봇 메시지 하나 추가
        setMessages(prev => [...prev, createBotMessage("...")]);

        for await (const chunk of postChatStream(text, {
          mock: USE_MOCK,
          signal: abortRef.current.signal,
        })) {
          acc += chunk;
          // 마지막 봇 메시지를 누적 텍스트로 교체
          setMessages(prev => {
            if (prev.length === 0) return [createBotMessage(acc)];
            const copy = prev.slice();
            // 마지막이 봇 메시지라고 가정하고 교체
            copy[copy.length - 1] = createBotMessage(acc);
            return copy;
          });
        }
      }
    } catch (e) {
      console.error(e);
      setMessages(prev => [
        ...prev,
        createBotMessage("죄송해요. 응답 중 오류가 발생했어요."),
      ]);
    } finally {
      setLoading(false);
      abortRef.current = null;
    }
  };

  const handleSend = (text: string) => {
    const userMsg = createUserMessage(text);
    setMessages(prev => [...prev, userMsg]);
    void sendToServer(text); // 실제 서버 호출
  };

  const handleButtonClick = (label: string) => {
    const userMsg = createUserMessage(label);
    const botMsg = createBotMessage(`현재 ${getButtonLog()} ${label}는`); 
    setMessages(prev => [...prev, userMsg, botMsg]);
    void sendToServer(label); // 실제 서버 호출
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

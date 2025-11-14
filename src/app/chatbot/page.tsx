"use client";

import { useEffect, useState } from "react";

import ChatHeader from "@/components/chat/ChatHeader";
import ChatSection from "@/components/chat/ChatSection";
import InputBottomBar from "@/components/chat/InputBottomBar";
import ChatbotButton from "@/components/chatbot/chatbotButton";

import { Message } from "@/types/chatMessage";

//import { getButtonLog } from "@/utils/chatbot/getButtonLog";
import {
  createBotMessage,
  createUserMessage,
} from "@/utils/chatbot/handleChatInput";

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const botResponses: Record<string, string> = {
    "실시간 금융 데이터 조회":
      "현재 KST 2025년 11월 15일 오전 12:12 기준으로\n코스피 3,020.45 ▲0.55%, 코스닥 950.21 ▼0.12% 입니다. 주요 종목 정보도 확인 가능해요.",
    "투자 전략 및 정보":
      "2025년 11월 기준, IT·바이오 섹터가 상승세를 보이고 있습니다.\n단기 투자보다는 분산투자와 장기 관점의 포트폴리오 구성이 안전합니다.",
    "주식 투자 가이드":
      "초보 투자자라면 다음을 참고하세요:\n1. 투자 전 목표 설정\n2. 분산투자로 위험 관리\n3. 장기 관점 유지\n4. 뉴스·재무제표 확인 필수\n궁금한 종목이 있으면 알려주시면 분석해드릴게요.",
    "삼성전자 전망":
      "삼성전자는 최근 반도체 업황 회복으로 단기적으로 상승 가능성이 있어요. 장기 관점에서는 글로벌 수요와 기술 트렌드를 지속적으로 확인하는 것이 좋습니다.",
    "다른 종목 추천":
      "최근 상승세를 보이는 종목으로는 LG화학, 카카오, 셀트리온 등이 있습니다. 다만 투자 결정 전 재무제표와 뉴스 확인은 필수예요.",
  };

  useEffect(() => {
    // 첫 인사 메시지
    const welcome = createBotMessage("안녕하세요! 무엇을 도와드릴까요?");
    setMessages([welcome]);
  }, []);

  const handleSend = (text: string) => {
    const userMsg = createUserMessage(text);
    setMessages(prev => [...prev, userMsg]);

    setTimeout(() => {
      const responseText = botResponses[text];
      const botMsg = createBotMessage(responseText);
      setMessages(prev => [...prev, botMsg]);
    }, 500); // 0.5초 후 답장
  };

  const handleButtonClick = (label: string) => {
    const userMsg = createUserMessage(label);
    //const botMsg = createBotMessage(`현재 ${getButtonLog()} ${label}는`);
    const botMsg = createBotMessage(botResponses[label]);
    setMessages(prev => [...prev, userMsg, botMsg]);
  };

  return (
    <div className="bg-yellow-10 scrollbar-hide h-screen w-full overflow-y-auto scroll-auto">
      {/*상단바*/}
      <ChatHeader />
      {/*채팅영역 */}
      <div className="px-[10px] pt-[110px] pb-[220px]">
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

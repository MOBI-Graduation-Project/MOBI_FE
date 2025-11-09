// POST /chatbot 요청 바디 
export interface ChatbotRequest {
  //사용자가 보낸 메시지(추천 버튼 클릭 시 버튼 텍스트 그대로) 
  text: string;
}

// POST /chatbot 응답 형태(백엔드가 string만 주더라도 여기서 객체로 표준화할 예정) 
export interface ChatbotResponse {
  // 챗봇의 답변 텍스트 
  text: string;
}

// GET /chatbot/history 기본 아이템 (Swagger 보고 씀) 
export interface ChatbotHistoryItem {
  content: string;
  type: "USER" | "ASSISTANT";
  createdAt: string; // ISO 표준시간
}

export interface ChatMessage {
  content: string;
  isBot: boolean;
  sentAt: string;
}
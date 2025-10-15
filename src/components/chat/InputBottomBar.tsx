import { useState } from "react";

import EnterBtn from "@/assets/chatbot/enterbtn.svg";

import {
  ChatMessage,
  createUserMessage,
} from "@/utils/chatbot/handleChatInput";

interface InputBottomBarProps {
  isChatBot?: boolean;
}
const InputBottomBar = ({ isChatBot = false }: InputBottomBarProps) => {
  const [input, setInput] = useState("");
  const [, setMessages] = useState<ChatMessage[]>([]);

  const handleSend = (text: string) => {
    const userMsg = createUserMessage(text);
    setMessages(prev => [...prev, userMsg]);
  };

  const handleInputSend = () => {
    if (!input.trim()) return;
    handleSend(input.trim());
    setInput("");
  };
  return (
    <div className="bg-brown fixed bottom-0 flex h-[116px] w-full items-center justify-center">
      <div className="font-pretendard bg-gray-10 flex h-[58px] w-full max-w-[1185px] items-center rounded-[30px] px-10">
        {isChatBot ? (
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleInputSend()}
            placeholder="궁금한 점을 물어보세요!"
            className="text-cap2/60 w-full font-[pretendard] outline-none"
          />
        ) : (
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleInputSend()}
            placeholder="메시지를 입력하세요"
            className="text-cap2/60 w-full font-[pretendard] outline-none"
          />
        )}

        {input.trim() && (
          <button className="cursor-pointer">
            <EnterBtn size={48} />
          </button>
        )}
      </div>
    </div>
  );
};
export default InputBottomBar;

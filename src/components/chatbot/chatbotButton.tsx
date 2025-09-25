"use client";

import { buttonConfigs } from "@/utils/chatbot/buttonInfo";

interface ChatbotButtonProps {
  onButtonClick: (label: string) => void;
}

const ChatbotButton = ({ onButtonClick }: ChatbotButtonProps) => {
  return (
    <div className="flex flex-row gap-[70px]">
      {buttonConfigs.map(({ label, color }) => (
        <button
          key={label}
          onClick={() => onButtonClick(label)}
          className={`text-lab1 text-brown text-stroke-white cursor-pointer rounded-[20px] px-4 py-2 font-[geekble] ${color}`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};
export default ChatbotButton;

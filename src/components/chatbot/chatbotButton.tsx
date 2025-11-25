"use client";

import { buttonConfigs } from "@/utils/chatbot/buttonInfo";

interface ChatbotButtonProps {
  onButtonClick: (label: string) => void;
}

const ChatbotButton = ({ onButtonClick }: ChatbotButtonProps) => {
  return (
    <div className="flex flex-row gap-[5px] md:gap-[70px]">
      {buttonConfigs.map(({ label, color }) => (
        <button
          key={label}
          onClick={() => onButtonClick(label)}
          className={`md:text-lab1 text-cap1 text-brown cursor-pointer rounded-[20px] px-[3px] py-[5px] font-[geekble] whitespace-nowrap md:px-4 md:py-2 ${color}`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};
export default ChatbotButton;

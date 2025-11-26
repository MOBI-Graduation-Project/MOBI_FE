import { useState } from "react";

import EnterBtn from "@/assets/chatbot/enterbtn.svg";

interface InputBottomBarProps {
  onSend: (text: string) => void;
  isChatBot?: boolean;
}
const InputBottomBar = ({ onSend, isChatBot = false }: InputBottomBarProps) => {
  const [input, setInput] = useState("");

  const handleInputSend = () => {
    if (!input.trim()) return;
    onSend(input.trim());
    setInput("");
  };

  const sendEvent = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.nativeEvent.isComposing) {
      return;
    }
    if (event.key === "Enter") {
      event.preventDefault();
      handleInputSend();
    }
  };
  return (
    <div className="bg-brown fixed bottom-0 flex h-[70px] w-full items-center justify-center px-[10px] md:h-[116px]">
      <div className="font-pretendard bg-gray-10 flex h-[50px] w-full max-w-[1185px] items-center rounded-[30px] px-10 md:h-[58px]">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={sendEvent}
          placeholder={
            isChatBot ? "궁금한 점을 물어보세요!" : "메시지를 입력하세요"
          }
          className="md:text-cap2/60 text-lab1 w-full font-[pretendard] outline-none"
        />

        {input.trim() && (
          <button onClick={handleInputSend} className="cursor-pointer">
            <EnterBtn className="h-[38px] w-[38px]" />
          </button>
        )}
      </div>
    </div>
  );
};
export default InputBottomBar;

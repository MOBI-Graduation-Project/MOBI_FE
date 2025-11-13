"use client";

import { useState } from "react";

import SearchIcon from "@/assets/chatting/searchIcon.svg";

export const SearchField = () => {
  const [input, setInput] = useState("");

  return (
    <div className="bg-yellow-light flex items-center gap-2 rounded-[30px] px-4 py-2">
      <input
        className="text-brown text-lab2 flex-1 bg-transparent font-[pretendard] placeholder-gray-500 outline-none"
        type="text"
        placeholder="주식명을 입력하세요."
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      <SearchIcon className="text-brown-700 h-[24px] w-[24px] cursor-pointer transition-transform hover:scale-110" />
    </div>
  );
};

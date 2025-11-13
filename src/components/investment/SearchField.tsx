"use client";

import { useState } from "react";

import SearchIcon from "@/assets/chatting/searchIcon.svg";

export const SearchField = () => {
  const [input, setInput] = useState("");

  return (
    <div className="bg-yellow-light flex items-center gap-2 rounded-[30px] px-4 py-2">
      <input
        className="flex-1 bg-transparent text-gray-900 placeholder-gray-400 outline-none"
        type="text"
        placeholder="주식명을 입력하세요."
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      <SearchIcon className="text-brown-700 h-[24px] w-[24px] cursor-pointer transition-transform hover:scale-110" />
    </div>
  );
};

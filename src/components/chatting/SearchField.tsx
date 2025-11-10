"use client";

import { useState } from "react";

import SearchIcon from "@/assets/chatting/searchIcon.svg";

import friendList from "@/mock/friendList.json";

import { User } from "@/types/user";

import FilterResultByInput from "@/utils/profile/filterMemberByInput";

import RecommendDropdown from "./RecommendDropdown";

const SearchField = () => {
  const [input, setInput] = useState("");
  const [searchResult, setSearchResult] = useState<User[]>([]);
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    if (value.trim()) {
      const result = FilterResultByInput(
        value,
        friendList.friend[0].friendList,
      ) as User[];
      setSearchResult(result);
    } else {
      setSearchResult([]);
    }
  };
  return (
    <section className="bg-brown/80 relative flex h-[94px] w-full flex-row gap-[45px] px-10 py-[19px]">
      <input
        className="bg-yellow-light text-lab1 w-full rounded-[30px] px-[30px] text-[pretendard]"
        type="text"
        placeholder="친구 맺고 싶은 사람의 닉네임을 검색해보세요"
        value={input}
        onChange={handleChangeInput}
      />
      <button>
        <SearchIcon className="fill text-brown-10 absolute top-1/2 right-[90px] h-[40px] w-[40px] -translate-y-1/2 cursor-pointer hover:scale-110" />
      </button>
      {searchResult.length > 0 && (
        <ul className="divide-brown absolute top-[75px] left-10 z-10 flex w-[calc(100%-90px)] flex-col divide-y-1">
          {searchResult.map(user => (
            <li key={user.memberId}>
              <RecommendDropdown searchResult={user} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
export default SearchField;

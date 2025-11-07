"use client";

import { useRouter } from "next/navigation";

import { useEffect, useRef, useState } from "react";

import SearchIcon from "@/assets/chatting/searchIcon.svg";

import friendData from "@/mock/friendList.json";

import { User } from "@/types/user";

import FilterResultByInput from "@/utils/profile/filterMemberByInput";

import RecommendDropdown from "./RecommendDropdown";

const SearchField = () => {
  const router = useRouter();

  const [input, setInput] = useState("");
  const [searchResult, setSearchResult] = useState<User[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    if (value.trim()) {
      const allUsers = [
        ...(friendData.friend[0].friendList || []),
        ...(friendData.friend[0].friendRequestList || []),
      ];
      const result = FilterResultByInput(value, allUsers) as User[];
      setSearchResult(result);
    } else {
      setSearchResult([]);
    }
  };

  const handleSelect = (user: User) => {
    router.push(`/profile/${user.memberId}`);
    setSearchResult([]); // 드롭다운 닫기
    setInput(user.nickname);
  };

  // 컴포넌트 영역 밖 클릭 시 드롭다운 닫기
  useEffect(() => {
    const onMouseDown = (e: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) {
        setSearchResult([]);
      }
    };
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, []);

  return (
    <section
      className="bg-brown/80 relative flex h-[94px] w-full flex-row gap-[45px] px-10 py-[19px]"
      ref={containerRef}
    >
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
              <RecommendDropdown searchResult={user} onSelect={handleSelect} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
export default SearchField;

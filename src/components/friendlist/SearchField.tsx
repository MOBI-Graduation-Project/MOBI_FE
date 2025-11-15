"use client";

import { useRouter } from "next/navigation";

import { useEffect, useRef, useState } from "react";

import { searchUserByNickname } from "@/apis/friend";

import SearchIcon from "@/assets/chatting/searchIcon.svg";

import { SearchUser } from "@/types/user";

import RecommendDropdown from "./RecommendDropdown";

const SearchField = () => {
  const router = useRouter();

  const [input, setInput] = useState("");
  const [searchResult, setSearchResult] = useState<SearchUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const handleChangeInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);

    if (!value.trim()) {
      setSearchResult([]);
      return;
    }

    setIsLoading(true);

    try {
      const res = await searchUserByNickname(value);
      setSearchResult(res.result || []);
    } catch (err) {
      console.error("검색 실패:", err);
      setSearchResult([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelect = (user: SearchUser) => {
  const isSelf = user.relationStatus === "SELF";   

  router.push(isSelf ? "/profile" : `/profile/${user.memberId}`); 

  setSearchResult([]);
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

      {isLoading && ( 
        <div className="absolute top-[75px] left-10 z-10 bg-yellow-light rounded-[20px] px-4 py-2">
          검색 중...
        </div>
      )}

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

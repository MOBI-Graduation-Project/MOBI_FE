"use client";

import { usePathname, useRouter } from "next/navigation";

import { useEffect, useMemo, useState } from "react";

import DownArrow from "@/assets/downArrowIcon.svg";

import { STOCK_MENU_MAP } from "@/constants/STOCK_MENU_MAP";

const DropdownMenu = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedKey, setSelectedKey] = useState<string>("");

  // 현재 경로에서 key 추출
  const currentKey = useMemo(() => {
    const parts = pathname.split("/");
    return parts[2] ?? ""; // 기본값: ""
  }, [pathname]);

  // URL 변경될 때 selectedKey 동기화
  useEffect(() => {
    setSelectedKey(currentKey);
  }, [currentKey]);

  // 현재 페이지를 제외한 메뉴만 표시
  const dropdownOptions = useMemo(
    () => Object.entries(STOCK_MENU_MAP).filter(([key]) => key !== currentKey),
    [currentKey],
  );

  const handleSelect = (key: string) => {
    setIsOpen(false);
    router.push(`/investment/${key}`);
  };

  return (
    <div className="relative w-[268px]">
      {/* 선택된 메뉴 */}
      <div
        className="bg-yellow-10 border-brown-dark flex h-[65px] cursor-pointer items-center justify-between rounded-[12px] border-[2px] px-[20px] py-[10px]"
        onClick={() => setIsOpen(prev => !prev)}
      >
        <span className="text-brown font-[geekble] text-[24px]">
          {STOCK_MENU_MAP[selectedKey] ?? "관심 종목"}
        </span>
        <DownArrow
          className={`custom-shadow absolute top-1/2 right-[-10px] h-[65px] w-[65px] -translate-y-1/2 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>

      {/* 드롭다운 목록 */}
      {isOpen && (
        <div className="border-brown-dark absolute left-0 w-full overflow-hidden rounded-[12px] border-[2px] bg-white">
          {dropdownOptions.map(([key, label], index, arr) => (
            <div key={key}>
              <div
                onClick={() => handleSelect(key)}
                className="hover:bg-yellow-light text-brown cursor-pointer px-[20px] py-[12px] font-[geekble] text-[20px] transition-colors duration-150"
              >
                {label}
              </div>
              {index < arr.length - 1 && (
                <div className="bg-brown-10/10 h-[2px] w-full" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default DropdownMenu;

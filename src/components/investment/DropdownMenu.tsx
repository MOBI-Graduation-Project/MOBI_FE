"use client";

import { usePathname, useRouter } from "next/navigation";

import { useEffect, useState } from "react";

import DownArrow from "@/assets/downArrowIcon.svg";

import { STOCK_MENU_MAP } from "@/constants/STOCK_MENU_MAP";

const DropdownMenu = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedKey, setSelectedKey] = useState<string>("");

  useEffect(() => {
    if (!pathname) return;

    // ex) /investment/holdings/new → ["", "investment", "holdings", "new"]
    const parts = pathname.split("/").filter(Boolean);

    // investment 이후의 경로만 key로 사용
    const key = parts.slice(1).join("/"); // holdings/new 또는 holdings

    // holdings/new가 없으면 holdings로 fallback
    if (STOCK_MENU_MAP[key]) {
      setSelectedKey(key);
    } else {
      const fallbackKey = Object.keys(STOCK_MENU_MAP).find(k =>
        pathname.includes(k),
      );
      setSelectedKey(fallbackKey ?? "");
    }
  }, [pathname]);

  const dropdownOptions = Object.entries(STOCK_MENU_MAP).filter(
    ([key]) => key !== selectedKey,
  );

  const handleSelect = (key: string) => {
    setIsOpen(false);
    router.push(`/investment/${key}`);
  };

  return (
    <div className="relative w-[110px] md:w-[268px]">
      {/* 선택된 메뉴 */}
      <div
        className="bg-yellow-10 border-brown-dark flex h-[30px] cursor-pointer items-center justify-between rounded-[12px] border-[2px] px-[10px] py-[10px] md:h-[65px] md:px-[20px]"
        onClick={() => setIsOpen(prev => !prev)}
      >
        <span className="text-brown md:text-lab1 text-cap1 font-[geekble]">
          {STOCK_MENU_MAP[selectedKey] ?? "관심 종목"}
        </span>
        <DownArrow
          className={`custom-shadow absolute top-1/2 right-[-10px] h-[30px] w-[30px] -translate-y-1/2 md:h-[65px] md:w-[65px] ${
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
                className="hover:bg-yellow-light text-brown md:text-lab1 text-cap1 cursor-pointer px-[10px] py-[12px] font-[geekble] transition-colors duration-150 md:px-[20px]"
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

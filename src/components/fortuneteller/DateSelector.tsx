"use client";

import { useState } from "react";

import DownArrowIcon from "@/assets/downArrowIcon.svg";

interface DateSelectorProps {
  label: string;
  value: number;
  options: number[];
  width?: string;
  onChange: (value: number) => void;
}

const DateSelector = ({
  label,
  value,
  options,
  width = "w-[150px]",
  onChange,
}: DateSelectorProps) => {
  const [open, setOpen] = useState(false);
  const dateIsEmpty = value === null || value === 0;
  return (
    <div className="flex items-center gap-[5px] md:gap-[15px]">
      <div className="relative">
        {/* 선택 박스 */}
        <div
          className={`${width} border-brown-dark bg-yellow-10 flex h-[45px] cursor-pointer items-center justify-end gap-[10px] rounded-[18px] border-[3px] pr-[20px] md:h-[80px]`}
          onClick={() => setOpen(!open)}
        >
          <DownArrowIcon
            className={`custom-shadow absolute top-1/2 left-[-10px] h-[45px] w-[45px] -translate-y-1/2 md:left-[-40px] md:h-[80px] md:w-[80px] ${open ? "rotate-180" : "rotate-0"}`}
          />
          <span
            className={` ${dateIsEmpty ? "text-gray-50" : "text-brown"} md:text-heading1 text-lab1 font-[geekble]`}
          >
            {String(value).padStart(2, "0")}
          </span>
        </div>

        {/* 드롭다운 목록 */}
        {open && (
          <div className="border-brown-dark bg-yellow-10 absolute top-[40px] left-0 z-50 max-h-[200px] w-full overflow-y-auto rounded-[18px] border-[3px] py-[10px] shadow-lg md:top-[70px]">
            {options.map(opt => (
              <div
                key={opt}
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                className="hover:bg-yellow-60 text-brown-dark text-lab1 cursor-pointer px-4 py-2 text-center font-[geekble]"
              >
                {String(opt).padStart(2, "0")}
              </div>
            ))}
          </div>
        )}
      </div>

      <span className="text-brown md:text-heading1 text-lab1 font-[geekble]">
        {label}
      </span>
    </div>
  );
};

export default DateSelector;

"use client";

import { useState } from "react";

import DownArrowIcon from "@/assets/fortuneteller/downArrowIcon.svg";

interface DateSelectorProps {
  label: string;
  value: number;
  options: number[];
  width?: number;
  onChange: (value: number) => void;
}

const DateSelector = ({
  label,
  value,
  options,
  width = 150,
  onChange,
}: DateSelectorProps) => {
  const [open, setOpen] = useState(false);
  const dateIsEmpty = value === null || value === 0;
  return (
    <div className="flex items-center gap-[15px]">
      <div className="relative">
        {/* 선택 박스 */}
        <div
          className={`border-brown-dark bg-yellow-10 flex h-[80px] cursor-pointer items-center justify-end gap-[10px] rounded-[18px] border-[3px] pr-[20px]`}
          style={{ width }}
          onClick={() => setOpen(!open)}
        >
          <DownArrowIcon className="custom-shadow absolute top-1/2 left-[-40px] -translate-y-1/2" />
          <span
            className={` ${dateIsEmpty ? "text-gray-50" : "text-brown"} font-[geekble] text-[48px]`}
          >
            {String(value).padStart(2, "0")}
          </span>
        </div>

        {/* 드롭다운 목록 */}
        {open && (
          <div className="border-brown-dark bg-yellow-10 absolute top-[70px] left-0 z-50 max-h-[200px] w-full overflow-y-auto rounded-[18px] border-[3px] shadow-lg">
            {options.map(opt => (
              <div
                key={opt}
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                className="hover:bg-yellow-60 text-brown-dark cursor-pointer px-4 py-2 text-center font-[geekble] text-[24px]"
              >
                {String(opt).padStart(2, "0")}
              </div>
            ))}
          </div>
        )}
      </div>

      <span className="text-brown font-[geekble] text-[48px]">{label}</span>
    </div>
  );
};

export default DateSelector;

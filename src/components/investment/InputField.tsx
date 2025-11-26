"use client";

import React from "react";

interface InputFieldProps {
  type?: "text" | "number";
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  unit?: string;
  disabled?: boolean;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const InputField = ({
  type = "text",
  value,
  onChange,
  placeholder,
  unit,
  disabled = false,
}: InputFieldProps) => {
  return (
    <div className="bg-yellow-light flex items-center rounded-[30px] px-4 py-2 md:flex-1 md:gap-2">
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        className="text-brown md:text-lab2 text-cap1 bg-transparent font-[pretendard] placeholder-gray-500 outline-none md:flex-1"
      />
      {unit && (
        <span className="text-brown md:text-lab2 text-cap1 font-[geekble]">
          {unit}
        </span>
      )}
    </div>
  );
};

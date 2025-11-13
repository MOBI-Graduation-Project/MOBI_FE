"use client";

import React from "react";

interface InputFieldProps {
  type?: "text" | "number";
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  unit?: string;
  disabled?: boolean;
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
    <div className="bg-yellow-light flex items-center gap-2 rounded-[30px] px-4 py-2">
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        className="text-brown text-lab2 flex-1 bg-transparent font-[pretendard] placeholder-gray-500 outline-none"
      />
      {unit && (
        <span className="text-brown text-lab2 font-[geekble]">{unit}</span>
      )}
    </div>
  );
};

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
        className="w-[80px] bg-transparent text-center text-gray-900 placeholder-gray-400 outline-none"
      />
      {unit && <span className="font-[geekble] text-gray-700">{unit}</span>}
    </div>
  );
};

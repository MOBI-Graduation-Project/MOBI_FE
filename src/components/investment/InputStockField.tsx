"use client";

import { useState } from "react";

import EnterBtn from "@/assets/chatbot/enterbtn.svg";

import { InputField } from "./InputField";
import { SearchField } from "./SearchField";

export const InputStockField = () => {
  const [purchaseAmount, setPurchaseAmount] = useState("");
  const [avgPrice, setAvgPrice] = useState("");

  return (
    <section className="bg-brown/80 flex w-full items-center gap-4 rounded-[20px] px-8 py-5">
      <div className="flex-1">
        <SearchField />
      </div>

      <InputField
        type="number"
        placeholder="수량"
        value={purchaseAmount}
        unit="주"
        onChange={e => setPurchaseAmount(e.target.value)}
      />

      <InputField
        type="number"
        placeholder="평균가"
        value={avgPrice}
        unit="원"
        onChange={e => setAvgPrice(e.target.value)}
      />

      {/* 🚀 전송 버튼 */}
      <button
        type="button"
        className="bg-yellow-light flex items-center justify-center rounded-full p-2 transition-transform hover:scale-105"
      >
        <EnterBtn className="h-[32px] w-[32px]" />
      </button>
    </section>
  );
};

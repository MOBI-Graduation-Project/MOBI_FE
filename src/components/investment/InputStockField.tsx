"use client";

import { useState } from "react";

import { postMyData } from "@/apis/investment";

import EnterBtn from "@/assets/chatbot/enterbtn.svg";

import { ToastMessage } from "@/components/common/ToastMessage";

import { MyDataRegister } from "@/types/investment/stockTypes";

import { InputField } from "./InputField";
import { SearchField } from "./SearchField";

export const InputStockField = () => {
  const [stockName, setStockName] = useState("");
  const [purchaseAmount, setPurchaseAmount] = useState("");
  const [avgPrice, setAvgPrice] = useState("");
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const handleEnter = async () => {
    if (!stockName || !purchaseAmount || !avgPrice) {
      setToastMsg("모든 값을 입력해주세요.");
      setTimeout(() => setToastMsg(""), 1000);
      return;
    }
    const myDataRegister: MyDataRegister = {
      stockName,
      purchaseAmount: Number(purchaseAmount),
      avgPrice: Number(avgPrice),
    };

    try {
      await postMyData(myDataRegister);
      setToastMsg("데이터가 정상적으로 등록되었습니다");
      setStockName("");
      setPurchaseAmount("");
      setAvgPrice("");
    } catch (error) {
      console.error(error);
      setToastMsg("데이터 등록에 실패했습니다.");
    } finally {
      setTimeout(() => setToastMsg(""), 1000);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.nativeEvent.isComposing) return;
    if (event.key === "Enter") {
      event.preventDefault();
      handleEnter();
    }
  };

  return (
    <div className="flex w-full items-center justify-center gap-[5px]">
      <section className="grid grid-cols-2 gap-4 bg-gray-50/50 px-[5px] py-5 md:flex md:w-full md:flex-row md:items-center md:gap-4 md:px-8">
        <div className="flex-2">
          <SearchField
            value={stockName}
            onChange={e => setStockName(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <InputField
          type="number"
          placeholder="수량"
          value={purchaseAmount}
          unit="주"
          onChange={e => setPurchaseAmount(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <InputField
          type="number"
          placeholder="평균가"
          value={avgPrice}
          unit="원"
          onChange={e => setAvgPrice(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button type="button" onClick={handleEnter}>
          <EnterBtn className="h-[32px] w-[32px]" />
        </button>
      </section>
      {toastMsg && <ToastMessage message={toastMsg} />}
    </div>
  );
};
